import React, {useState} from 'react';
import {Modal, Input, notification, Form} from 'antd';
import {Button} from '@/components/ui/button';
import {useAddBooking} from '@/hooks/useAddBooking';
import {useUpdateBooking} from '@/hooks/useUpdateBooking';
import {fetchBookingById} from '@/hooks/useGetBookingById';
import {useModalForm} from '@/hooks/useModalForm';

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
      form.setFieldsValue({...data});
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
            name="name"
            label="Name"
            rules={[{min: 1, required: true}]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[{min: 1, required: true}]}
          >
            <Input placeholder="Phone" />
          </Form.Item>

          <Form.Item
            name="destination"
            label="Destination"
            rules={[{min: 1, required: true}]}
          >
            <Input placeholder="Destination" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalForm;
