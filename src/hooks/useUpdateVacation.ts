import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '@/config';
import {Vacation} from '@/utils/types';

export const useUpdateVacation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({id, formData}: {id: string; formData: Vacation}) => {
      const docRef = doc(db, 'vacations', id);

      await updateDoc(docRef, {
        ...formData,
      });

      return docRef;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAllVacations']});
    },
  });
};
