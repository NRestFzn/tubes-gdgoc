import React, {useState} from 'react';
import {Modal, notification, Form, Select} from 'antd';
import {Button} from '@/components/ui/button';
import {useAddBooking} from '@/hooks/useAddBooking';
import {useUpdateBooking} from '@/hooks/useUpdateBooking';
import {fetchBookingById} from '@/hooks/useGetBookingById';
import {useModalForm} from '@/hooks/useModalForm';
import {useGetUsers} from '@/hooks/useGetUser';
import {
  Destination as DestinationInterface,
  User as UserInterface,
} from '@/utils/types';
import {useGetDestinations} from '@/hooks/useGetDestinations';

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

  const [form] = Form.useForm();
  const isSubmitAble = useModalForm(form);

  const showModal = async () => {
    setIsModalOpen(true);

    if (mode === 'edit') {
      const data = await fetchBookingById(id as string);
      form.setFieldsValue({
        userId: data.name,
        destinationId: `${data.destination.city}, ${data.destination.country}`,
      });
    }
  };

  const handleSuccess = (message: string): void => {
    setIsModalOpen(false);
    form.resetFields();
    notification.success({
      message: message,
      description: `Booking ${message.toLowerCase()} successfully`,
    });
  };

  const handleOk = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    if (mode === 'add') {
      mutateAddBooking.mutate(
        {...values},
        {onSuccess: () => handleSuccess('Added')}
      );
    } else if (mode === 'edit') {
      mutateUpdateBooking.mutate(
        {id: id as string, formData: values},
        {onSuccess: () => handleSuccess('Updated')}
      );
    }
  };

  const userOptions = useGetUsers().data?.map((e: UserInterface) => ({
    value: e.id,
    label: e.name,
  }));

  const availableDestinationOptions = useGetDestinations({
    field: 'quota',
    operator: '>',
    value: 0,
  }).data?.map((e: DestinationInterface) => ({
    value: e.id,
    label: `${e.city}, ${e.country}`,
  }));

  const unAvailableDestinationOptions = useGetDestinations({
    field: 'quota',
    operator: '<=',
    value: 0,
  }).data?.map((e: DestinationInterface) => ({
    value: e.id,
    label: `${e.city}, ${e.country}`,
    disabled: true,
  }));

  return (
    <>
      <Button variant="outline" onClick={showModal}>
        {mode === 'add' ? '+ Add Booking' : 'Edit'}
      </Button>

      <Modal
        title={mode === 'add' ? 'Add Booking' : 'Edit Booking'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        confirmLoading={
          mutateAddBooking.isPending || mutateUpdateBooking.isPending
        }
        okButtonProps={{disabled: !isSubmitAble}}
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item
            name="userId"
            label="User"
            rules={[{min: 1, required: true}]}
          >
            <Select
              showSearch
              placeholder="Select user"
              options={userOptions}
            />
          </Form.Item>

          <Form.Item
            name="destinationId"
            label="Destination"
            rules={[{min: 1, required: true}]}
          >
            <Select
              showSearch
              placeholder="Select destination"
              options={[
                {
                  label: 'Available destination',
                  title: 'Available destination',
                  options: availableDestinationOptions,
                },
                {
                  label: (
                    <span className="text-gray-600">
                      Unavailable destination
                    </span>
                  ),
                  title: 'Unavailable destination',
                  options: unAvailableDestinationOptions,
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalForm;
