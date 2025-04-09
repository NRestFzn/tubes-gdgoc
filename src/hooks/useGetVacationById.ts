import {useQuery} from '@tanstack/react-query';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '@/firebase';
import {Vacation as VacationInterface} from '@/utils/types';

const fetchVacationById = async (id: string): Promise<VacationInterface> => {
  const docRef = doc(db, 'vacations', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('Vacation not found');
  }
  return {id: docSnap.id, ...docSnap.data()} as VacationInterface;
};

export const useGetVacationById = (id: string) => {
  return useQuery<VacationInterface>({
    queryKey: ['getVacationById', id],
    queryFn: () => fetchVacationById(id),
    enabled: !!id,
  });
};
