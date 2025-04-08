import { useQuery } from '@tanstack/react-query';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/config';
import { User as UserInterface } from '@/utils/types';

const fetchUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<UserInterface, 'id'>),
  }));
};

export const useGetUsers = () => {
  return useQuery<UserInterface[]>({
    queryKey: ['getAllUsers'],
    queryFn: fetchUsers,
  });
};