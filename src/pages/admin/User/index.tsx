import {Card, CardContent} from '@/components/ui/card';
import {useGetUsers} from '@/hooks/useGetUser';
import {Space, Table, Spin, Modal, Input, notification} from 'antd';
import {Button} from '@/components/ui/button';
import type {TableColumnsType} from 'antd';
import React, {useState} from 'react';
import ModalForm from './ModalForm';
import {User as UserInterface} from '@/utils/types';
import {useDeleteUser} from '@/hooks/useDeleteUser';
import {LoadingOutlined} from '@ant-design/icons';
import {useDebounce} from '@/hooks/useDebounce';

const User: React.FC = (): React.ReactElement => {
  const [city, setCity] = useState<string>('');

  const debounce = useDebounce(city, 300);

  const {data, isLoading, isError} = useGetUsers({
    field: 'name',
    operator: '==',
    value: debounce,
  });

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
          <ModalForm mode="edit" id={record.key} />
          <Button
            variant="destructive"
            onClick={() => {
              Modal.confirm({
                title: 'Are you sure you want to delete this user?',
                content: 'This action cannot be undone.',
                onOk: async () => {
                  await deleteUserMutation.mutateAsync(record.key as string);
                  notification.success({
                    message: 'Deleted!',
                    description: 'User deleted successfully',
                  });
                },
              });
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (isError)
    return (
      <Card>
        <CardContent>Error fetching data...</CardContent>
      </Card>
    );

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
    <>
      <div className="bg-muted/50 flex md:min-h-min p-4">
        <div className=" flex w-full max-w-3xl items-center space-x-2 gap-2">
          <Input
            type="Search"
            placeholder="Search by name"
            onChange={(e) => setCity(e.target.value)}
          />
          <ModalForm mode="add" />
        </div>
      </div>

      <div className="bg-muted/50 min-h-[100vh] flex-1 md:min-h-min p-4 pt-0">
        <Card>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Spin indicator={<LoadingOutlined spin />} size="large" />
              </div>
            ) : (
              <Table dataSource={dataSource} columns={columns} />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default User;
