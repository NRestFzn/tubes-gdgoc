import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/config';
import { User } from '@/utils/types'; 

export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUser: User) => {
      const docRef = await addDoc(collection(db, 'users'), newUser);
      return { id: docRef.id, ...newUser };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllUsers'] });
    },
  });
};