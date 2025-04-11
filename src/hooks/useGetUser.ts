import {useQuery} from '@tanstack/react-query';
import {getDocs, collection, query, where} from 'firebase/firestore';
import {db} from '@/firebase';
import {fireStoreWhere, User as UserInterface} from '@/utils/types';

const fetchUsers = async (querySearch?: fireStoreWhere) => {
  const ref = collection(db, 'users');

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
    ...(doc.data() as Omit<UserInterface, 'id'>),
  }));
};

export const useGetUsers = (querySearch?: fireStoreWhere) => {
  return useQuery<UserInterface[]>({
    queryKey: ['getAllUsers', querySearch],
    queryFn: () => fetchUsers(querySearch),
  });
};
