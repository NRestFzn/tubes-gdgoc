import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '@/firebase';
import {User} from '@/utils/types';
import {v4} from 'uuid';
import bcrypt from 'bcryptjs';

export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: User) => {
      const id = v4();
      const docRef = await setDoc(doc(db, 'users', id), {
        id: id,
        ...formData,
        password: bcrypt.hashSync(formData.password, 7),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAllUsers']});
    },
  });
};
