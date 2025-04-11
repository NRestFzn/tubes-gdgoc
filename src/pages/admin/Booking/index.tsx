import { Card, CardContent } from '@/components/ui/card';
import { useGetBookings } from '@/hooks/useGetBookings';
import { Space, Table, Spin, Modal, Input, notification } from 'antd';
import { Button } from '@/components/ui/button';
import type { TableColumnsType } from 'antd';
import React from 'react';
import ModalForm from './ModalForm';
import { Booking as BookingInterface } from '@/utils/types';
import { useDeleteBooking } from '@/hooks/useDeleteBooking';
import { LoadingOutlined } from '@ant-design/icons';
const Booking: React.FC = (): React.ReactElement => {
  const { data, isLoading, isError } = useGetBookings();

  const deleteBookingMutation = useDeleteBooking();

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
      title: 'Destination',
      dataIndex: 'destination',
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
                title: 'Are you sure you want to delete this booking?',
                content: 'This action cannot be undone.',
                onOk: async () => {
                  await deleteBookingMutation.mutateAsync(record.key as string);
                  notification.success({
                    message: 'Deleted!',
                    description: 'Booking deleted successfully',
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

  if (isError) return <div>Error fetching bookings</div>;

  const dataSource = data?.map((e: BookingInterface, index: number) => {
    return {
      key: e.id,
      no: index + 1,
      name: e.name,
      phone: e.phone,
      destination: `${e.destination.city}, ${e.destination.country}`,
    };
  });

  return (
    <div>
      <div className="bg-muted/50 flex md:min-h-min p-4">
        <div className=" flex w-full max-w-3xl items-center space-x-2 gap-2">
          <Input type="Search" placeholder="Search" />
          <ModalForm mode="add" />
        </div>
      </div>

      <div className="bg-muted/50 min-h-[100vh] flex-1 md:min-h-min p-4 pt-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </div>
        ) : (
          <Card>
            <CardContent>
              <Table dataSource={dataSource} columns={columns} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Booking;
