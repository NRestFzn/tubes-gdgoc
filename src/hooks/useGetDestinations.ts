import {useQuery} from '@tanstack/react-query';
import {getDocs, collection} from 'firebase/firestore';
import {db} from '@/firebase';
import {Destination as DestinationInterface} from '@/utils/types';

const fetchDestinations = async () => {
  const querySnapshot = await getDocs(collection(db, 'destinations'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<DestinationInterface, 'id'>),
  }));
};

export const useGetDestinations = () => {
  return useQuery<DestinationInterface[]>({
    queryKey: ['getAllDestinations'],
    queryFn: fetchDestinations,
  });
};
