import {useQuery} from '@tanstack/react-query';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '@/firebase';
import {Booking as BookingInterface} from '@/utils/types';

const fetchBookingById = async (id: string): Promise<BookingInterface> => {
  const docRef = doc(db, 'bookings', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('Booking not found');
  }
  return {id: docSnap.id, ...docSnap.data()} as BookingInterface;
};

export const useGetBookingById = (id: string) => {
  return useQuery<BookingInterface>({
    queryKey: ['getBookingById', id],
    queryFn: () => fetchBookingById(id),
    enabled: !!id,
  });
};
