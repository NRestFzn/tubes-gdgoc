import React, {useState} from 'react';
import {Modal, Input, notification, Form, InputNumber} from 'antd';
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

    if (mode === 'edit') {
      const data = await fetchUserById(id as string);
      const {password, ...restField} = data;
      form.setFieldsValue({...restField});
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
            rules={[
              {required: true, message: 'Name is required'},
              {min: 4, message: 'Name must be more than 3 characters'},
              {whitespace: true},
            ]}
            hasFeedback
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {required: true, message: 'Phone number is required'},
              {
                pattern: /^\d+$/,
                message: 'Phone number must contain digits only',
              },
              {
                validator: (_, value) => {
                  if (!value || value.replace(/\D/g, '').length >= 9) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Phone number must contain at least 9 digits')
                  );
                },
              },
            ]}
            hasFeedback
          >
            <Input addonBefore="+62" style={{width: '100%'}} />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {min: 1, required: true, message: 'Email is required'},
              {type: 'email'},
            ]}
            hasFeedback
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Password is required',
              },
              {
                min: 8,
                message: 'Password must be at least 8 characters long',
              },
              {
                pattern: /[a-z]/,
                message: 'Password must contain at least one lowercase letter',
              },
              {
                pattern: /[A-Z]/,
                message: 'Password must contain at least one uppercase letter',
              },
              {
                pattern: /\d/,
                message: 'Password must contain at least one number',
              },
              {
                pattern: /[!@#$%^&*]/,
                message:
                  'Password must contain at least one special character (!@#$%^&*)',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalForm;
