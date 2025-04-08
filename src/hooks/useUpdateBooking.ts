import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '@/config';
import {Booking} from '@/utils/types';

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({id, formData}: {id: string; formData: Booking}) => {
      const docRef = doc(db, 'bookings', id);

      await updateDoc(docRef, {
        ...formData,
      });

      return docRef;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAllBookings']});
    },
  });
};
