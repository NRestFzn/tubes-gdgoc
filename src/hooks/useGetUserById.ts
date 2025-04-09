import {useQuery} from '@tanstack/react-query';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '@/firebase';
import {User as UserInterface} from '@/utils/types';

const fetchUserById = async (id: string): Promise<UserInterface> => {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('User not found');
  }
  return {id: docSnap.id, ...docSnap.data()} as UserInterface;
};

export const useGetUserById = (id: string) => {
  return useQuery<UserInterface>({
    queryKey: ['getUserById', id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });
};
