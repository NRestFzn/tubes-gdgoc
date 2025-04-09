import {Card, CardContent} from '@/components/ui/card';
import AdminLayout from '../layout/AdminLayout';
import {useGetVacations} from '@/hooks/useGetVacations';
import {Space, Table, Spin, Modal, Input, notification} from 'antd';
import {Button} from '@/components/ui/button';
import type {TableColumnsType} from 'antd';
import React from 'react';
import ModalForm from './ModalForm';
import {Vacation as VacationInterface} from '@/utils/types';
import {useDeleteVacation} from '@/hooks/useDeleteVacation';

const Vacation: React.FC = (): React.ReactElement => {
  const {data, isLoading, isError} = useGetVacations();

  const deleteVacationMutation = useDeleteVacation();

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
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Day Trip',
      dataIndex: 'dayTrip',
    },
    {
      title: 'Country',
      dataIndex: 'country',
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
                title: 'Are you sure you want to delete this Vacation?',
                content: 'This action cannot be undone.',
                onOk: async () => {
                  await deleteVacationMutation.mutateAsync(
                    record.key as string
                  );
                  notification.success({
                    message: 'Deleted!',
                    description: 'Vacation deleted successfully',
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

  if (isError) return <div>Error fetching vacations</div>;

  const dataSource = data?.map((e: VacationInterface, index: number) => {
    return {
      key: e.id,
      no: index + 1,
      city: e.city,
      country: e.country,
      price: e.price,
      rating: e.rating,
      quota: e.quota,
      dayTrip: e.dayTrip,
    };
  });

  return (
    <AdminLayout headerTitle="Manage Vacation">
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

export default Vacation;
