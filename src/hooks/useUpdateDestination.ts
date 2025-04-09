import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '@/firebase';
import {Destination} from '@/utils/types';

export const useUpdateDestination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({id, formData}: {id: string; formData: Destination}) => {
      const docRef = doc(db, 'destinations', id);

      await updateDoc(docRef, {
        ...formData,
      });

      return docRef;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAllDestinations']});
    },
  });
};
