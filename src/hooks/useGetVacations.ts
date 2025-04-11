import {useQuery} from '@tanstack/react-query';
import {getDocs, collection, query, where} from 'firebase/firestore';
import {db} from '@/firebase';
import {fireStoreWhere, Vacation as VacationInterface} from '@/utils/types';

const fetchVacations = async (querySearch?: fireStoreWhere) => {
  const ref = collection(db, 'vacations');

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
    ...(doc.data() as Omit<VacationInterface, 'id'>),
  }));
};

export const useGetVacations = (querySearch?: fireStoreWhere) => {
  return useQuery<VacationInterface[]>({
    queryKey: ['getAllVacations', querySearch],
    queryFn: () => fetchVacations(querySearch),
  });
};
