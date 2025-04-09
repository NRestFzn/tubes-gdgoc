import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';

const deleteUser = async (id: string): Promise<void> => {
  const docRef = doc(db, 'users', id);
  await deleteDoc(docRef);
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllUsers'] });
    },
    onError: (error) => {
      console.error('Failed to delete user:', error);
    },
  });
};