import {Card, CardContent} from '@/components/ui/card';
import AdminLayout from '../layout/AdminLayout';
import {useGetUsers} from '@/hooks/useGetUser';
import {Space, Table, Spin, Modal, Input} from 'antd';
import {Button} from '@/components/ui/button';
import type {TableColumnsType} from 'antd';
import React from 'react';
import ModalForm from './ModalForm';
import {User as UserInterface} from '@/utils/types';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, deleteDoc} from 'firebase/firestore';
import {db} from '@/config';

const User: React.FC = (): React.ReactElement => {
  const {data, isLoading, isError} = useGetUsers();

  const deleteUser = async (id: string): Promise<void> => {
    const docRef = doc(db, 'users', id);
    await deleteDoc(docRef);
  };

  const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: deleteUser,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['getAllUsers']});
      },
      onError: (error) => {
        console.error('Failed to delete user:', error);
      },
    });
  };

  const deleteUserMutation = useDeleteUser();

  const columns: TableColumnsType = [
    {
      title: 'No',
      dataIndex: 'no',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button variant="outline">Edit</Button>

          <Button
            variant="destructive"
            onClick={() => deleteUserMutation.mutate(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (isError) return <div>Error fetching users</div>;

  const dataSource = data?.map((e: UserInterface, index: number) => {
    return {
      key: e.id,
      no: index + 1,
      name: e.name,
      phone: e.phone,
      email: e.email,
    };
  });

  return (
    <AdminLayout headerTitle="Manage User" toolBarPlaceholder="+ Add User">
      <div className="bg-muted/50 flex md:min-h-min p-4">
        <div className=" flex w-full max-w-3xl items-center space-x-2 gap-2">
          <Input type="Search" placeholder="Search" />
          <ModalForm />
        </div>
      </div>

      <div className="bg-muted/50 min-h-[100vh] flex-1 md:min-h-min p-4 pt-0">
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Card>
            <CardContent>
              <Table dataSource={dataSource} columns={columns} />
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default User;
