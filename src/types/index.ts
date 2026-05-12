export type UserRole = 'customer' | 'admin' | 'stylist';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  preferredStylistId?: string;
  preferredPaymentMethod?: string;
  language: 'en' | 'ar';
  notificationsEnabled: boolean;
  createdAt: Date;
}

export interface Stylist {
  id: string;
  name: string;
  title: string;
  bio: string;
  rating: number;
  reviewCount: number;
  gender: 'male' | 'female';
  specialties: string[];
  imageUrl?: string;
  isAvailable: boolean;
  status: 'available' | 'break' | 'leave';
  schedule: WeeklySchedule;
}

export interface WeeklySchedule {
  sat: DaySchedule;
  sun: DaySchedule;
  mon: DaySchedule;
  tue: DaySchedule;
  wed: DaySchedule;
  thu: DaySchedule;
  fri: DaySchedule;
}

export interface DaySchedule {
  isOff: boolean;
  breaks?: TimeRange[];
  slots: TimeSlot[];
}

export interface TimeRange {
  start: string;
  end: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  stylistId?: string;
}

export interface Service {
  id: string;
  name: string;
  nameAr?: string;
  description: string;
  durationMinutes: number;
  price: number;
  category: ServiceCategory;
  imageUrl?: string;
  isActive: boolean;
  addons?: ServiceAddon[];
}

export type ServiceCategory = 'hair' | 'nails' | 'facial' | 'massage' | 'mens' | 'addon';

export interface ServiceAddon {
  id: string;
  name: string;
  nameAr?: string;
  price: number;
  durationMinutes: number;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName?: string;
  stylistId: string;
  stylistName?: string;
  serviceId: string;
  serviceName?: string;
  addonIds: string[];
  date: string;
  time: string;
  endTime: string;
  status: BookingStatus;
  amount: number;
  depositAmount: number;
  depositPaid: boolean;
  notes?: string;
  createdAt: Date;
  paymentMethod: PaymentMethod;
  location: string;
  // WhatsApp tracking
  whatsappConfirmationSent?: boolean;
  whatsappConfirmationSentAt?: Date;
  whatsappReminderSent?: boolean;
  whatsappReminderSentAt?: Date;
  whatsappFollowUpSent?: boolean;
  whatsappFollowUpSentAt?: Date;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type PaymentMethod = 'card' | 'apple_pay' | 'tabby' | 'tamara';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalVisits: number;
  lifetimeSpend: number;
  lastVisit: Date;
  preferredStylistId?: string;
  createdAt: Date;
}

export interface AnalyticsData {
  weeklyRevenue: number;
  avgBookingValue: number;
  bookingVolume: number;
  cancellationRate: number;
  topService: string;
  topStylist: string;
  topCustomer: { name: string; spend: number };
  busiestDay: string;
  peakTime: string;
  bnplUsage: number;
}

export interface BusinessSettings {
  salonName: string;
  salonNameAr: string;
  location: string;
  locationAr: string;
  address: string;
  contactPhone: string;
  adminPhone: string;
  businessHours: BusinessHours;
  depositPercentage: number;
  allowBNPL: boolean;
  acceptApplePay: boolean;
  smsReminders: boolean;
  adminLanguage: 'en' | 'ar';
}

export interface BusinessHours {
  sat_thu: { open: string; close: string };
  fri: { open: string; close: string; breakStart?: string; breakEnd?: string };
}
