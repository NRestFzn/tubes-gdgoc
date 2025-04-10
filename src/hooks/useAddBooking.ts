import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '@/firebase';
import {Booking} from '@/utils/types';
import {v4} from 'uuid';
import {fetchUserById} from './useGetUserById';
import {fetchDestinationById} from './useGetDestinationById';

export const useAddBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: Booking) => {
      const id = v4();

      const destination = await fetchDestinationById(
        formData.destinationId as string
      );

      const user = await fetchUserById(formData.userId as string);

      const docRef = await setDoc(doc(db, 'bookings', id), {
        id: id,
        name: user.name,
        phone: user.phone,
        destination: {
          city: destination.city,
          country: destination.country,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAllBookings']});
    },
  });
};
