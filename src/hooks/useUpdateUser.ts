import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '@/firebase';
import {User} from '@/utils/types';
import bcrypt from 'bcryptjs';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({id, formData}: {id: string; formData: User}) => {
      const docRef = doc(db, 'users', id);

      await updateDoc(docRef, {
        ...formData,
        password: bcrypt.hashSync(formData.password, 7),
        updatedAt: new Date(),
      });

      return docRef;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAllUsers']});
    },
  });
};
