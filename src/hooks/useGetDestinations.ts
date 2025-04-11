import {useQuery} from '@tanstack/react-query';
import {getDocs, collection, query, where} from 'firebase/firestore';
import {db} from '@/firebase';
import {
  Destination as DestinationInterface,
  fireStoreWhere,
} from '@/utils/types';

const fetchDestinations = async (querySearch?: fireStoreWhere) => {
  const ref = collection(db, 'destinations');

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
    ...(doc.data() as Omit<DestinationInterface, 'id'>),
  }));
};

export const useGetDestinations = (querySearch?: fireStoreWhere) => {
  return useQuery<DestinationInterface[]>({
    queryKey: ['getAllDestinations', querySearch],
    queryFn: () => fetchDestinations(querySearch),
  });
};

// const fetchAvailableDestinations = async () => {
//   const q = query(c, where('quota', '>', 0));
//   const querySnapshot = await getDocs(q);
//   return querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...(doc.data() as Omit<DestinationInterface, 'id'>),
//   }));
// };

// export const useGetAvailableDestination = () => {
//   return useQuery<DestinationInterface[]>({
//     queryKey: ['getAllAvailableDestination'],
//     queryFn: fetchAvailableDestinations,
//   });
// };

// const fetchUnAvailableDestinations = async () => {
//   const q = query(c, where('quota', '==', 0));
//   const querySnapshot = await getDocs(q);
//   return querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...(doc.data() as Omit<DestinationInterface, 'id'>),
//   }));
// };

// export const useGetUnAvailableDestination = () => {
//   return useQuery<DestinationInterface[]>({
//     queryKey: ['getAllAvailableDestination'],
//     queryFn: fetchUnAvailableDestinations,
//   });
// };
