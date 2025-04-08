import React, {useState} from 'react';
import {User as UserInterface} from '@/utils/types';
import {Modal, Input} from 'antd';
import {Button} from '@/components/ui/button';
import {useAddUser} from '@/hooks/useAddUser';

const ModalForm: React.FC = (): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {mutate: mutateAddUser, isPending} = useAddUser();

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    mutateAddUser(
      {id: Date.now().toString(), ...addUser},
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setAddUser({name: '', phone: '', email: '', password: ''});
        },
      }
    );
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
        + Add user
      </Button>
      <Modal
        title="Add User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isPending}
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
