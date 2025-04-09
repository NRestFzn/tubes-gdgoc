import {useQuery} from '@tanstack/react-query';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '@/firebase';
import {Destination as DestinationInterface} from '@/utils/types';

export const fetchDestinationById = async (
  id: string
): Promise<DestinationInterface> => {
  const docRef = doc(db, 'destinations', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('Destination not found');
  }
  return {id: docSnap.id, ...docSnap.data()} as DestinationInterface;
};

export const useGetDestinationById = (id: string) => {
  return useQuery<DestinationInterface>({
    queryKey: ['getDestinationById', id],
    queryFn: () => fetchDestinationById(id),
    enabled: !!id,
  });
};
