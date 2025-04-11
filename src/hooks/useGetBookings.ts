import {useQuery} from '@tanstack/react-query';
import {getDocs, collection, query, where} from 'firebase/firestore';
import {db} from '@/firebase';
import {Booking as BookingInterface} from '@/utils/types';

const fetchBookings = async (querySearch?: string) => {
  const ref = collection(db, 'bookings');

  const q = querySearch ? query(ref, where('name', '==', querySearch)) : ref;

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<BookingInterface, 'id'>),
  }));
};

export const useGetBookings = (querySearch?: string) => {
  return useQuery<BookingInterface[]>({
    queryKey: ['getAllBookings', querySearch],
    queryFn: () => fetchBookings(querySearch),
  });
};
