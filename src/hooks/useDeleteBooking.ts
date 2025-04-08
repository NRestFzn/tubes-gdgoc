import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, deleteDoc} from 'firebase/firestore';
import {db} from '@/config';

const deleteBooking = async (id: string): Promise<void> => {
  const docRef = doc(db, 'bookings', id);
  await deleteDoc(docRef);
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAllBookings']});
    },
    onError: (error) => {
      console.error('Failed to delete booking:', error);
    },
  });
};
