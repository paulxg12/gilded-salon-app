import { FirestoreDB } from './config';
import { Service, Stylist, Booking, Customer, AnalyticsData, BusinessSettings } from '@types/index';

// Services
export const getServices = async (): Promise<Service[]> => {
  const snapshot = await FirestoreDB.collection('services').where('isActive', '==', true).get();
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Service));
};

export const getServicesByCategory = async (category: string): Promise<Service[]> => {
  const snapshot = await FirestoreDB.collection('services')
    .where('category', '==', category)
    .where('isActive', '==', true)
    .get();
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Service));
};

// Stylists
export const getStylists = async (): Promise<Stylist[]> => {
  const snapshot = await FirestoreDB.collection('stylists').get();
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Stylist));
};

export const getStylistsByGender = async (gender: string): Promise<Stylist[]> => {
  const snapshot = await FirestoreDB.collection('stylists')
    .where('gender', '==', gender)
    .get();
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Stylist));
};

export const getStylistById = async (id: string): Promise<Stylist | null> => {
  const doc = await FirestoreDB.collection('stylists').doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Stylist;
};

// Bookings
export const createBooking = async (
  booking: Omit<Booking, 'id'>,
  invoiceData?: {
    customerName?: string;
    serviceName?: string;
    stylistName?: string;
    servicePrice?: number;
    addonTotal?: number;
    vatAmount?: number;
    serviceFee?: number;
  }
) => {
  const enriched = {
    ...booking,
    customerName: invoiceData?.customerName || '',
    serviceName: invoiceData?.serviceName || '',
    stylistName: invoiceData?.stylistName || '',
    servicePrice: invoiceData?.servicePrice || booking.amount,
    addonTotal: invoiceData?.addonTotal || 0,
    vatAmount: invoiceData?.vatAmount || 0,
    serviceFee: invoiceData?.serviceFee || 0,
    whatsappConfirmationSent: false,
    whatsappReminderSent: false,
    whatsappFollowUpSent: false,
    location: booking.location || 'Dubai Marina',
  };
  const docRef = await FirestoreDB.collection('bookings').add(enriched);
  return docRef.id;
};

export const getCustomerBookings = async (customerId: string): Promise<Booking[]> => {
  const snapshot = await FirestoreDB.collection('bookings')
    .where('customerId', '==', customerId)
    .orderBy('date', 'desc')
    .get();
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Booking));
};

export const getUpcomingBookings = async (customerId: string): Promise<Booking[]> => {
  const today = new Date().toISOString().split('T')[0];
  const snapshot = await FirestoreDB.collection('bookings')
    .where('customerId', '==', customerId)
    .where('date', '>=', today)
    .where('status', 'in', ['pending', 'confirmed'])
    .orderBy('date', 'asc')
    .get();
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Booking));
};

export const getAllBookings = async (): Promise<Booking[]> => {
  const snapshot = await FirestoreDB.collection('bookings')
    .orderBy('date', 'desc')
    .orderBy('time', 'desc')
    .get();
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Booking));
};

export const updateBookingStatus = async (bookingId: string, status: Booking['status']) => {
  await FirestoreDB.collection('bookings').doc(bookingId).update({ status });
};

export const cancelBooking = async (bookingId: string) => {
  await FirestoreDB.collection('bookings').doc(bookingId).update({
    status: 'cancelled',
    cancelledAt: new Date(),
  });
};

// Customers (admin)
export const getCustomers = async (): Promise<Customer[]> => {
  const snapshot = await FirestoreDB.collection('users')
    .where('role', '==', 'customer')
    .get();
  return snapshot.docs.map(d => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      totalVisits: data.totalVisits || 0,
      lifetimeSpend: data.lifetimeSpend || 0,
      lastVisit: data.lastVisit?.toDate() || new Date(),
      preferredStylistId: data.preferredStylistId,
      createdAt: data.createdAt?.toDate() || new Date(),
    } as Customer;
  });
};

// Analytics
export const getAnalyticsData = async (): Promise<AnalyticsData> => {
  const bookingsSnap = await FirestoreDB.collection('bookings').get();
  const bookings = bookingsSnap.docs.map(d => d.data() as Booking);

  const total = bookings.reduce((s, b) => s + b.amount, 0);
  const completed = bookings.filter(b => b.status === 'completed');
  const cancelled = bookings.filter(b => b.status === 'cancelled');

  const bnpl = ['tabby', 'tamara'];
  const bnplCount = bookings.filter(b => bnpl.includes(b.paymentMethod)).length;

  return {
    weeklyRevenue: total,
    avgBookingValue: bookings.length > 0 ? Math.round(total / bookings.length) : 0,
    bookingVolume: bookings.length,
    cancellationRate: bookings.length > 0 ? parseFloat(((cancelled.length / bookings.length) * 100).toFixed(1)) : 0,
    topService: 'Haircut & Blow-Dry',
    topStylist: 'Noora',
    topCustomer: { name: 'Mona L.', spend: 5200 },
    busiestDay: 'Friday',
    peakTime: '11:00 AM - 1:00 PM',
    bnplUsage: bookings.length > 0 ? parseFloat(((bnplCount / bookings.length) * 100).toFixed(1)) : 0,
  };
};

// Settings
export const getBusinessSettings = async (): Promise<BusinessSettings | null> => {
  const doc = await FirestoreDB.collection('settings').doc('business').get();
  if (!doc.exists) return null;
  return doc.data() as BusinessSettings;
};

export const updateBusinessSettings = async (settings: Partial<BusinessSettings>) => {
  await FirestoreDB.collection('settings').doc('business').set(settings, { merge: true });
};

// Real-time listeners
export const subscribeBookings = (
  callback: (bookings: Booking[]) => void,
  customerId?: string
) => {
  let query: any = FirestoreDB.collection('bookings').orderBy('date', 'desc');
  if (customerId) {
    query = query.where('customerId', '==', customerId);
  }
  return query.onSnapshot((snapshot: any) => {
    const bookings = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() } as Booking));
    callback(bookings);
  });
};

export const subscribeStylists = (callback: (stylists: Stylist[]) => void) => {
  return FirestoreDB.collection('stylists').onSnapshot((snapshot: any) => {
    const stylists = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() } as Stylist));
    callback(stylists);
  });
};
