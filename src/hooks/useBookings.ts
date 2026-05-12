import { useState, useEffect } from 'react';
import { Booking } from '@types/index';
import { subscribeBookings } from '@firebase/firestore';

export function useBookings(customerId?: string) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeBookings(setBookings, customerId);
    setLoading(false);
    return unsubscribe;
  }, [customerId]);

  return { bookings, loading };
}
