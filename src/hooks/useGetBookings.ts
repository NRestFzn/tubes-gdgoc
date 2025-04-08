import {useQuery} from '@tanstack/react-query';
import {getDocs, collection} from 'firebase/firestore';
import {db} from '@/config';
import {Booking as BookingInterface} from '@/utils/types';

const fetchBookings = async () => {
  const querySnapshot = await getDocs(collection(db, 'bookings'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<BookingInterface, 'id'>),
  }));
};

export const useGetBookings = () => {
  return useQuery<BookingInterface[]>({
    queryKey: ['getAllBookings'],
    queryFn: fetchBookings,
  });
};
