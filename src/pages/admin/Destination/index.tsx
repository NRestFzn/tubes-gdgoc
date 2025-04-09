import {Card, CardContent} from '@/components/ui/card';
import AdminLayout from '../layout/AdminLayout';
import {useGetDestinations} from '@/hooks/useGetDestinations';
import {Space, Table, Spin, Modal, Input, notification} from 'antd';
import {Button} from '@/components/ui/button';
import type {TableColumnsType} from 'antd';
import React from 'react';
import ModalForm from './ModalForm';
import {Destination as DestinationInterface} from '@/utils/types';
import {useDeleteDestination} from '@/hooks/useDeleteDestination';

const Destination: React.FC = (): React.ReactElement => {
  const {data, isLoading, isError} = useGetDestinations();

  const deleteDestinationMutation = useDeleteDestination();

  const columns: TableColumnsType = [
    {
      title: 'No',
      dataIndex: 'no',
    },
    {
      title: 'City',
      dataIndex: 'city',
    },
    {
      title: 'Country',
      dataIndex: 'country',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
    },
    {
      title: 'Quota',
      dataIndex: 'quota',
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
                title: 'Are you sure you want to delete this destination?',
                content: 'This action cannot be undone.',
                onOk: async () => {
                  await deleteDestinationMutation.mutateAsync(
                    record.key as string
                  );
                  notification.success({
                    message: 'Deleted!',
                    description: 'Destination deleted successfully',
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

  if (isError) return <div>Error fetching destinations</div>;

  const dataSource = data?.map((e: DestinationInterface, index: number) => {
    return {
      key: e.id,
      no: index + 1,
      city: e.city,
      country: e.country,
      price: e.price,
      discount: e.discount,
      rating: e.rating,
      quota: e.quota,
    };
  });

  return (
    <AdminLayout headerTitle="Manage Destination">
      <div className="bg-muted/50 flex md:min-h-min p-4">
        <div className=" flex w-full max-w-3xl items-center space-x-2 gap-2">
          <Input type="Search" placeholder="Search" />
          <ModalForm mode="add" />
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

export default Destination;
