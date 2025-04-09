import React, {useState} from 'react';
import {Modal, Input, notification, Form} from 'antd';
import {Button} from '@/components/ui/button';
import {useAddUser} from '@/hooks/useAddUser';
import {useUpdateUser} from '@/hooks/useUpdateUser';
import {fetchUserById} from '@/hooks/useGetUserById';
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

  const mutateAddUser = useAddUser();
  const mutateUpdateUser = useUpdateUser();

  const [form] = Form.useForm();
  const isSubmitAble = useModalForm(form);

  const showModal = async () => {
    setIsModalOpen(true);
    const data = await fetchUserById(id as string);

    if (mode === 'edit') {
      form.setFieldsValue({...data});
    }
  };

  const handleSuccess = (message: string): void => {
    setIsModalOpen(false);
    form.resetFields();
    notification.success({
      message: message,
      description: `User ${message.toLowerCase()} successfully`,
    });
  };

  const handleOk = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    if (mode === 'add') {
      mutateAddUser.mutate(
        {...values},
        {onSuccess: () => handleSuccess('Added')}
      );
    } else if (mode === 'edit') {
      mutateUpdateUser.mutate(
        {id: id as string, formData: values},
        {onSuccess: () => handleSuccess('Updated')}
      );
    }
  };

  return (
    <>
      <Button variant="outline" onClick={showModal}>
        {mode === 'add' ? '+ Add User' : 'Edit'}
      </Button>

      <Modal
        title={mode === 'add' ? 'Add User' : 'Edit User'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        confirmLoading={mutateAddUser.isPending || mutateUpdateUser.isPending}
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
            name="email"
            label="Email"
            rules={[{min: 1, required: true}]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{min: 1, required: true}]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalForm;
