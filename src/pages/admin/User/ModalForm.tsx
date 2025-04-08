import React, {useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, setDoc} from 'firebase/firestore';
import {User as UserInterface} from '@/utils/types';
import {db} from '@/config';
import {Modal, Input} from 'antd';
import {Button} from '@/components/ui/button';

const ModalForm: React.FC = (): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addUser, setAddUser] = useState<UserInterface>({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const createUser = async (data: UserInterface) => {
    const id = Date.now().toString();
    const userRef = doc(db, 'users', id);
    await setDoc(userRef, {...data, id: id});
    return {id, ...data};
  };

  const queryClient = useQueryClient();

  const useAddUser = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['addUser']});
      console.log('User added successfully');
    },
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
    useAddUser.mutate({id: Date.now().toString(), ...addUser});
    setIsModalOpen(false);
    setAddUser({name: '', phone: '', email: '', password: ''});
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
