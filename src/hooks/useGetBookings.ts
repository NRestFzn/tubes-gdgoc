import {useQuery} from '@tanstack/react-query';
import {getDocs, collection, query, where} from 'firebase/firestore';
import {db} from '@/firebase';
import {Booking as BookingInterface, fireStoreWhere} from '@/utils/types';

const fetchBookings = async (querySearch?: fireStoreWhere) => {
  const ref = collection(db, 'bookings');

  const q =
    querySearch &&
    querySearch.value !== '' &&
    querySearch &&
    querySearch.value !== null &&
    querySearch &&
    querySearch.value !== undefined
      ? query(
          ref,
          where(querySearch.field, querySearch.operator, querySearch.value)
        )
      : ref;

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<BookingInterface, 'id'>),
  }));
};

export const useGetBookings = (querySearch?: fireStoreWhere) => {
  return useQuery<BookingInterface[]>({
    queryKey: ['getAllBookings', querySearch],
    queryFn: () => fetchBookings(querySearch),
  });
};
