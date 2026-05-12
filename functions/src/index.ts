import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

// ===================== TWILIO CONFIG =====================
const twilioAccountSid = functions.config().twilio?.account_sid || process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = functions.config().twilio?.auth_token || process.env.TWILIO_AUTH_TOKEN;
const twilioWhatsAppNumber = functions.config().twilio?.whatsapp_number || process.env.TWILIO_WHATSAPP_NUMBER;
const salonName = functions.config().salon?.name || 'Gilded Salon — Dubai Marina';

let twilioClient: any = null;
function getTwilio() {
  if (!twilioClient && twilioAccountSid && twilioAuthToken) {
    const twilio = require('twilio');
    twilioClient = twilio(twilioAccountSid, twilioAuthToken);
  }
  return twilioClient;
}

// ===================== SEND WHATSAPP =====================
async function sendWhatsApp(to: string, body: string) {
  const client = getTwilio();
  if (!client) {
    functions.logger.warn('Twilio not configured. Skipping WhatsApp to', to);
    return null;
  }
  try {
    const msg = await client.messages.create({
      from: `whatsapp:${twilioWhatsAppNumber}`,
      to: `whatsapp:${to}`,
      body,
    });
    functions.logger.info('WhatsApp sent:', msg.sid);
    return msg;
  } catch (err) {
    functions.logger.error('WhatsApp send failed:', err);
    throw err;
  }
}

// ===================== BOOKING CONFIRMATION + INVOICE =====================
async function sendBookingConfirmation(booking: any, customer: any) {
  const date = booking.date || 'Today';
  const time = booking.time || '';
  const serviceName = booking.serviceName || 'your appointment';
  const stylistName = booking.stylistName || 'your stylist';
  const location = booking.location || 'Dubai Marina';
  const amount = booking.amount || 0;
  const depositAmt = booking.depositAmount || 0;
  const remaining = amount - depositAmt;
  const svcPrice = booking.servicePrice || amount;
  const addonTotal = booking.addonTotal || 0;
  const vat = booking.vatAmount || Math.round((svcPrice + addonTotal) * 0.05 * 100) / 100;
  const bookingId = booking.id || booking.bookingId || 'G-2847';

  const separator = '─'.repeat(30);

  const message = [
    `✨ *BOOKING CONFIRMED*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `${salonName}`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    '',
    `Hi ${customer.name || 'there'}!`,
    '',
    `*📋 INVOICE #${bookingId}*`,
    separator,
    serviceName ? `Service        AED ${svcPrice}` : '',
    booking.serviceFee ? `Service fee    AED ${booking.serviceFee}` : '',
    addonTotal > 0 ? `Add-ons        AED ${addonTotal}` : '',
    `VAT (5%)       AED ${vat}`,
    separator,
    `*Total         AED ${amount}*`,
    '',
    depositAmt > 0 ? [
      `*💳 Payment Summary*`,
      separator,
      `Deposit paid   AED ${depositAmt}`,
      `Due at visit   AED ${remaining}`,
      '',
    ].join('\n') : `*✅ Paid in full*`,
    '',
    `*📅 Appointment Details*`,
    separator,
    `Service:  ${serviceName}`,
    `Stylist:  ${stylistName}`,
    `Date:     ${date}`,
    `Time:     ${time}`,
    `Where:    ${location}`,
    '',
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Need to reschedule or cancel?`,
    `Reply "CANCEL" and we'll handle it.`,
    '',
    `See you soon! 💇‍♀️✨`,
  ].filter(Boolean).join('\n');

  return sendWhatsApp(customer.phone, message);
}

// ===================== REMINDER =====================
async function sendReminder(booking: any, customer: any) {
  const message = [
    `⏰ *Reminder — ${salonName}*`,
    '',
    `Hi ${customer.name || 'there'}!`,
    '',
    `You have an appointment *tomorrow*:`,
    `• *Service:* ${booking.serviceName}`,
    `• *Stylist:* ${booking.stylistName}`,
    `• *Time:* ${booking.time}`,
    `• *Location:* ${booking.location || 'Dubai Marina'}`,
    '',
    `We can't wait to see you! 🎉`,
    '',
    `To reschedule or cancel, reply to this message.`,
  ].join('\n');

  return sendWhatsApp(customer.phone, message);
}

// ===================== POST-APPOINTMENT FOLLOW-UP =====================
async function sendFollowUp(booking: any, customer: any) {
  const message = [
    `👋 *How was your visit?*`,
    '',
    `Hi ${customer.name || 'there'}!`,
    '',
    `We hope you loved your experience at ${salonName}!`,
    '',
    `Could you take 10 seconds to leave a review?`,
    `Your feedback helps us serve you better.`,
    '',
    `⭐ *Rate your experience:*`,
    `Reply with a number 1-5, or just tell us how it went!`,
    '',
    `Also, want to book your next appointment?`,
    `→ Reply "BOOK" and we'll help you out 💛`,
  ].join('\n');

  return sendWhatsApp(customer.phone, message);
}

// ===================== ADMIN NOTIFICATION =====================
async function notifyAdminNewBooking(booking: any, adminPhone: string) {
  const message = [
    `🆕 *New Booking — ${salonName}*`,
    '',
    `• *Customer:* ${booking.customerName || 'Unknown'}`,
    `• *Service:* ${booking.serviceName}`,
    `• *Stylist:* ${booking.stylistName}`,
    `• *Date:* ${booking.date}`,
    `• *Time:* ${booking.time}`,
    `• *Amount:* AED ${booking.amount}`,
    `• *Deposit:* ${booking.depositPaid ? '✅ Paid' : '❌ Not paid'}`,
    '',
    `Check the admin dashboard for details.`,
  ].join('\n');

  return sendWhatsApp(adminPhone, message);
}

// ===================== EXPORTED FUNCTIONS =====================

/**
 * Triggered when a new booking is created in Firestore.
 * Sends WhatsApp confirmation to customer + notification to admin.
 */
export const onBookingCreated = functions.firestore
  .document('bookings/{bookingId}')
  .onCreate(async (snap, context) => {
    const booking = snap.data();

    // Get customer profile
    const customerDoc = await db.collection('users').doc(booking.customerId).get();
    const customer = customerDoc.data();

    if (customer?.phone) {
      await sendBookingConfirmation(booking, customer);
    }

    // Notify admin
    const settingsDoc = await db.collection('settings').doc('business').get();
    const settings = settingsDoc.data();
    if (settings?.adminPhone) {
      await notifyAdminNewBooking(booking, settings.adminPhone);
    }

    // Mark WhatsApp sent
    await snap.ref.update({
      whatsappConfirmationSent: true,
      whatsappConfirmationSentAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

/**
 * Scheduled function that runs every hour to send reminders
 * for bookings happening the next day.
 */
export const sendBookingReminders = functions.pubsub
  .schedule('0 * * * *')
  .timeZone('Asia/Dubai')
  .onRun(async (context) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const snapshot = await db.collection('bookings')
      .where('date', '==', tomorrowStr)
      .where('status', 'in', ['pending', 'confirmed'])
      .where('whatsappReminderSent', '==', false)
      .get();

    if (snapshot.empty) {
      functions.logger.info('No bookings needing reminders');
      return;
    }

    const promises = snapshot.docs.map(async (doc) => {
      const booking = doc.data();

      try {
        const customerDoc = await db.collection('users').doc(booking.customerId).get();
        const customer = customerDoc.data();

        if (customer?.phone) {
          await sendReminder(booking, customer);
          await doc.ref.update({
            whatsappReminderSent: true,
            whatsappReminderSentAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        }
      } catch (err) {
        functions.logger.error(`Reminder failed for booking ${doc.id}:`, err);
      }
    });

    await Promise.all(promises);
  });

/**
 * Scheduled function that runs daily to send follow-ups
 * for appointments that were completed yesterday.
 */
export const sendFollowUps = functions.pubsub
  .schedule('0 18 * * *')
  .timeZone('Asia/Dubai')
  .onRun(async (context) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const snapshot = await db.collection('bookings')
      .where('date', '==', yesterdayStr)
      .where('status', '==', 'completed')
      .where('whatsappFollowUpSent', '==', false)
      .get();

    if (snapshot.empty) {
      functions.logger.info('No follow-ups needed');
      return;
    }

    const promises = snapshot.docs.map(async (doc) => {
      const booking = doc.data();

      try {
        const customerDoc = await db.collection('users').doc(booking.customerId).get();
        const customer = customerDoc.data();

        if (customer?.phone) {
          await sendFollowUp(booking, customer);
          await doc.ref.update({
            whatsappFollowUpSent: true,
            whatsappFollowUpSentAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        }
      } catch (err) {
        functions.logger.error(`Follow-up failed for booking ${doc.id}:`, err);
      }
    });

    await Promise.all(promises);
  });

/**
 * Callable function for testing WhatsApp from the app.
 * Usage: firebase.functions().httpsCallable('testWhatsApp')({ phone: '+971501234567' })
 */
export const testWhatsApp = functions.https.onCall(async (data, context) => {
  const phone = data.phone;
  if (!phone) {
    throw new functions.https.HttpsError('invalid-argument', 'Phone number required');
  }

  const message = [
    `✅ *WhatsApp is working!*`,
    '',
    `You're all set to receive booking confirmations`,
    `and reminders from ${salonName}.`,
    '',
    `💛 Thank you for choosing us!`,
  ].join('\n');

  await sendWhatsApp(phone, message);
  return { success: true };
});

/**
 * Callable function to manually send a follow-up message
 */
export const requestFollowUp = functions.https.onCall(async (data, context) => {
  const { bookingId } = data;
  if (!bookingId) {
    throw new functions.https.HttpsError('invalid-argument', 'Booking ID required');
  }

  const bookingDoc = await db.collection('bookings').doc(bookingId).get();
  if (!bookingDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'Booking not found');
  }

  const booking = bookingDoc.data()!;
  const customerDoc = await db.collection('users').doc(booking.customerId).get();
  const customer = customerDoc.data();

  if (!customer?.phone) {
    throw new functions.https.HttpsError('failed-precondition', 'Customer has no phone');
  }

  await sendFollowUp(booking, customer);
  return { success: true };
});

/**
 * Webhook endpoint for incoming WhatsApp messages.
 * Customers can reply to cancel/reschedule or rate their experience.
 */
export const whatsappWebhook = functions.https.onRequest(async (req, res) => {
  if (req.method === 'GET') {
    // Twilio webhook verification
    res.status(200).send('OK');
    return;
  }

  const { Body, From } = req.body;
  const customerPhone = From?.replace('whatsapp:', '');

  if (!Body || !customerPhone) {
    res.status(400).send('Invalid');
    return;
  }

  const reply = Body.trim().toLowerCase();

  // Find the customer
  const usersSnap = await db.collection('users')
    .where('phone', '==', customerPhone)
    .limit(1)
    .get();

  if (usersSnap.empty) {
    await sendWhatsApp(customerPhone, [
      `Hi there! 👋`,
      '',
      `We couldn't find your account.`,
      `Please contact the salon directly at +971 4 123 4567`,
    ].join('\n'));
    res.status(200).send('OK');
    return;
  }

  const customerId = usersSnap.docs[0].id;
  const customer = usersSnap.docs[0].data();

  // Handle different reply types
  if (reply === 'book') {
    await sendWhatsApp(customerPhone, [
      `Great, let's book your next appointment! 📅`,
      '',
      `Please open the Gilded app or visit our booking page to schedule.`,
      `Or call us at +971 4 123 4567 and we'll help you right away.`,
    ].join('\n'));
  } else if (reply === 'cancel' || reply.includes('cancel')) {
    // Find their upcoming booking and cancel it
    const today = new Date().toISOString().split('T')[0];
    const bookingSnap = await db.collection('bookings')
      .where('customerId', '==', customerId)
      .where('date', '>=', today)
      .where('status', 'in', ['pending', 'confirmed'])
      .limit(1)
      .get();

    if (!bookingSnap.empty) {
      const booking = bookingSnap.docs[0];
      await booking.ref.update({ status: 'cancelled', cancelledAt: new Date() });

      await sendWhatsApp(customerPhone, [
        `✅ *Booking Cancelled*`,
        '',
        `Your appointment has been cancelled as requested.`,
        `We hope to see you again soon! 💛`,
      ].join('\n'));
    } else {
      await sendWhatsApp(customerPhone, [
        `We couldn't find any upcoming bookings to cancel.`,
        `Contact us at +971 4 123 4567 for assistance.`,
      ].join('\n'));
    }
  } else if (['1','2','3','4','5'].includes(reply)) {
    // Save the rating
    const stars = parseInt(reply);
    await db.collection('feedback').add({
      customerId,
      rating: stars,
      phone: customerPhone,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const thankYou = stars >= 4
      ? `Thank you so much for the ${'⭐'.repeat(stars)}! We're thrilled you had a great experience! 🎉`
      : `Thank you for your honest feedback. We'll use it to improve! 💛`;

    await sendWhatsApp(customerPhone, [
      thankYou,
      '',
      `Can't wait to serve you again at ${salonName}! ✨`,
    ].join('\n'));
  } else {
    // Unknown reply — forward to salon
    await sendWhatsApp(customerPhone, [
      `Thanks for your message! 👋`,
      '',
      `We've received it and will get back to you shortly.`,
      `For urgent matters, call us at +971 4 123 4567.`,
    ].join('\n'));

    // Notify salon owner
    const settingsDoc = await db.collection('settings').doc('business').get();
    const settings = settingsDoc.data();
    if (settings?.adminPhone) {
      await sendWhatsApp(settings.adminPhone, [
        `📩 *New WhatsApp from ${customer.name || customerPhone}*`,
        '',
        `Message: "${Body}"`,
      ].join('\n'));
    }
  }

  res.status(200).send('OK');
});
