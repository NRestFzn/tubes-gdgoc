import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '@/firebase';
import {Vacation} from '@/utils/types';
import {v4} from 'uuid';

export const useAddVacation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: Vacation) => {
      const id = v4();
      const docRef = await setDoc(doc(db, 'vacations', id), {
        id: id,
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAllVacations']});
    },
  });
};
