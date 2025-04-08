import React, {useState} from 'react';
import {Booking as BookingInterface} from '@/utils/types';
import {Modal, Input, notification} from 'antd';
import {Button} from '@/components/ui/button';
import {useAddBooking} from '@/hooks/useAddBooking';
import {useUpdateBooking} from '@/hooks/useUpdateBooking';
import {useGetBookingById} from '@/hooks/useGetBookingById';

type ModalFormProps = {
  mode: 'add' | 'edit';
  id?: string;
};

const ModalForm: React.FC<ModalFormProps> = ({
  mode,
  id,
}): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutateAddBooking = useAddBooking();
  const mutateUpdateBooking = useUpdateBooking();

  const [addBooking, setAddBooking] = useState<BookingInterface>({
    name: '',
    phone: '',
    destination: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setAddBooking((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const {data, isLoading, isError} = useGetBookingById(id as string);

  const showModal = () => {
    setIsModalOpen(true);

    if (mode === 'edit') {
      setAddBooking({
        name: data?.name || '',
        phone: data?.phone || '',
        destination: data?.destination || '',
      });
    }
  };

  const handleOk = () => {
    if (mode === 'add') {
      mutateAddBooking.mutate(
        {...addBooking},
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setAddBooking({
              name: '',
              phone: '',
              destination: '',
            });
            notification.success({
              message: 'Added!',
              description: 'Booking added successfully',
            });
          },
        }
      );
    } else if (mode === 'edit') {
      mutateUpdateBooking.mutate(
        {id: id as string, formData: addBooking},
        {
          onSuccess: () => {
            setIsModalOpen(false);
            notification.success({
              message: 'Updated!',
              description: 'Booking updated successfully',
            });
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setAddBooking({
      name: '',
      phone: '',
      destination: '',
    });
  };

  return (
    <>
      <Button variant="outline" onClick={showModal}>
        {mode === 'add' ? '+ Add Booking' : 'Edit'}
      </Button>

      <Modal
        title={mode === 'add' ? 'Add Booking' : 'Edit Booking'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={mutateAddBooking.isPending}
      >
        <div className="flex flex-col gap-4">
          <Input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={addBooking.name}
          />
          <Input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            value={addBooking.phone}
          />
          <Input
            name="destination"
            placeholder="Destination"
            onChange={handleChange}
            value={addBooking.destination}
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalForm;
