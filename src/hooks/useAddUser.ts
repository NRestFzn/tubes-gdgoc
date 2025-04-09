import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '@/firebase';
import {User} from '@/utils/types';
import {v4} from 'uuid';

export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: User) => {
      const id = v4();
      const docRef = await setDoc(doc(db, 'users', id), {
        ...formData,
        id: id,
      });
      return docRef;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAllUsers']});
    },
  });
};
