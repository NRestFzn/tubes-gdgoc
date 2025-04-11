import {useQuery} from '@tanstack/react-query';
import {getDocs, collection, query, where} from 'firebase/firestore';
import {db} from '@/firebase';
import {Vacation as VacationInterface} from '@/utils/types';

const fetchVacations = async (querySearch?: string) => {
  const ref = collection(db, 'vacations');
  const q = querySearch ? query(ref, where('city', '==', querySearch)) : ref;

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<VacationInterface, 'id'>),
  }));
};

export const useGetVacations = (querySearch?: string) => {
  return useQuery<VacationInterface[]>({
    queryKey: ['getAllVacations', querySearch],
    queryFn: () => fetchVacations(querySearch),
  });
};
