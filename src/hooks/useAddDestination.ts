import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '@/config';
import {Destination} from '@/utils/types';
import {v4} from 'uuid';

export const useAddDestination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: Destination) => {
      const id = v4();
      const docRef = await setDoc(doc(db, 'destinations', id), {
        ...formData,
        id: id,
      });
      return docRef;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAllDestinations']});
    },
  });
};
