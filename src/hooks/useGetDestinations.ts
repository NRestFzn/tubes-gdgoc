import {useQuery} from '@tanstack/react-query';
import {getDocs, collection, query, where} from 'firebase/firestore';
import {db} from '@/firebase';
import {Destination as DestinationInterface} from '@/utils/types';

const c = collection(db, 'destinations');

const fetchDestinations = async () => {
  const querySnapshot = await getDocs(c);
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

const fetchAvailableDestinations = async () => {
  const q = query(c, where('quota', '>', 0));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<DestinationInterface, 'id'>),
  }));
};

export const useGetAvailableDestination = () => {
  return useQuery<DestinationInterface[]>({
    queryKey: ['getAllAvailableDestination'],
    queryFn: fetchAvailableDestinations,
  });
};
