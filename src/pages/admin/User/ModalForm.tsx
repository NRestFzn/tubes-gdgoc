import React, {useState} from 'react';
import {User as UserInterface} from '@/utils/types';
import {Modal, Input, notification, Spin} from 'antd';
import {Button} from '@/components/ui/button';
import {useAddUser} from '@/hooks/useAddUser';
import {useUpdateUser} from '@/hooks/useUpdateUser';
import {useGetUserById} from '@/hooks/useGetUserById';

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

  const [addUser, setAddUser] = useState<UserInterface>({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setAddUser((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const {data, isLoading, isError} = useGetUserById(id as string);

  const showModal = () => {
    setIsModalOpen(true);

    if (mode === 'edit') {
      setAddUser({
        name: data?.name || '',
        phone: data?.phone || '',
        email: data?.email || '',
        password: data?.password || '',
      });
    }
  };

  const handleOk = () => {
    if (mode === 'add') {
      mutateAddUser.mutate(
        {...addUser},
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setAddUser({
              name: '',
              phone: '',
              email: '',
              password: '',
            });
            notification.success({
              message: 'Added!',
              description: 'User added successfully',
            });
          },
        }
      );
    } else if (mode === 'edit') {
      mutateUpdateUser.mutate(
        {id: id as string, formData: addUser},
        {
          onSuccess: () => {
            setIsModalOpen(false);
            notification.success({
              message: 'Updated!',
              description: 'User updated successfully',
            });
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setAddUser({
      name: '',
      phone: '',
      email: '',
      password: '',
    });
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
        onCancel={handleCancel}
        confirmLoading={mutateAddUser.isPending}
      >
        <div className="flex flex-col gap-4">
          <Input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={addUser.name}
          />
          <Input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            value={addUser.phone}
          />
          <Input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={addUser.email}
          />
          <Input.Password
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={addUser.password}
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalForm;
