import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '@/config';
import {Booking} from '@/utils/types';
import {v4} from 'uuid';

export const useAddBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: Booking) => {
      const id = v4();
      const docRef = await setDoc(doc(db, 'bookings', id), {
        ...formData,
        id: id,
      });
      return docRef;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAllBookings']});
    },
  });
};
