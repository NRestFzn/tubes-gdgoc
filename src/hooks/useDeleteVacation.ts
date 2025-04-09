import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, deleteDoc} from 'firebase/firestore';
import {db} from '@/firebase';

const deleteVacation = async (id: string): Promise<void> => {
  const docRef = doc(db, 'vacations', id);
  await deleteDoc(docRef);
};

export const useDeleteVacation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVacation,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAllVacations']});
    },
    onError: (error) => {
      console.error('Failed to delete vacation:', error);
    },
  });
};
