import {useQuery} from '@tanstack/react-query';
import {getDocs, collection} from 'firebase/firestore';
import {db} from '@/firebase';
import {Vacation as VacationInterface} from '@/utils/types';

const fetchVacations = async () => {
  const querySnapshot = await getDocs(collection(db, 'vacations'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<VacationInterface, 'id'>),
  }));
};

export const useGetVacations = () => {
  return useQuery<VacationInterface[]>({
    queryKey: ['getAllVacations'],
    queryFn: fetchVacations,
  });
};
