import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '@/firebase';
import {Booking} from '@/utils/types';
import {fetchDestinationById} from './useGetDestinationById';
import {fetchUserById} from './useGetUserById';

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({id, formData}: {id: string; formData: Booking}) => {
      const docRef = doc(db, 'bookings', id);

      const destination = await fetchDestinationById(
        formData.destinationId as string
      );

      const user = await fetchUserById(formData.userId as string);

      await updateDoc(docRef, {
        id: id,
        name: user.name,
        phone: user.phone,
        destination: {
          city: destination.city,
          country: destination.country,
        },
        updatedAt: new Date(),
      });

      return docRef;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAllBookings']});
    },
  });
};
