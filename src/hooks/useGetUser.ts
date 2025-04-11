import {useQuery} from '@tanstack/react-query';
import {getDocs, collection, query, where} from 'firebase/firestore';
import {db} from '@/firebase';
import {User as UserInterface} from '@/utils/types';

const fetchUsers = async (querySearch?: string) => {
  const ref = collection(db, 'users');

  const q = querySearch ? query(ref, where('name', '==', querySearch)) : ref;

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<UserInterface, 'id'>),
  }));
};

export const useGetUsers = (querySearch?: string) => {
  return useQuery<UserInterface[]>({
    queryKey: ['getAllUsers', querySearch],
    queryFn: () => fetchUsers(querySearch),
  });
};
