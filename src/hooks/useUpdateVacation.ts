import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '@/firebase';
import {Vacation} from '@/utils/types';

export const useUpdateVacation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({id, formData}: {id: string; formData: Vacation}) => {
      const docRef = doc(db, 'vacations', id);

      await updateDoc(docRef, {
        ...formData,
        updatedAt: new Date(),
      });

      return docRef;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAllVacations']});
    },
  });
};
