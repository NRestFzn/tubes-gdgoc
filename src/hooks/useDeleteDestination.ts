import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, deleteDoc} from 'firebase/firestore';
import {db} from '@/firebase';

const deleteDestination = async (id: string): Promise<void> => {
  const docRef = doc(db, 'destinations', id);
  await deleteDoc(docRef);
};

export const useDeleteDestination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDestination,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAllDestinations']});
    },
    onError: (error) => {
      console.error('Failed to delete destination:', error);
    },
  });
};
