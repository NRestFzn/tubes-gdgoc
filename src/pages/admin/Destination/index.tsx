import {Card, CardContent} from '@/components/ui/card';
import {useGetDestinations} from '@/hooks/useGetDestinations';
import {Space, Table, Spin, Modal, Input, notification} from 'antd';
import {Button} from '@/components/ui/button';
import type {TableColumnsType} from 'antd';
import React, {useState} from 'react';
import ModalForm from './ModalForm';
import {Destination as DestinationInterface} from '@/utils/types';
import {useDeleteDestination} from '@/hooks/useDeleteDestination';
import {LoadingOutlined} from '@ant-design/icons';
import {useDebounce} from '@/hooks/useDebounce';

const Destination: React.FC = (): React.ReactElement => {
  const [country, setCountry] = useState<string>('');

  const debounce = useDebounce(country, 300);

  const {data, isLoading, isError} = useGetDestinations({
    field: 'country',
    operator: '==',
    value: debounce,
  });

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

  if (isError)
    return (
      <Card>
        <CardContent>Error fetching data...</CardContent>
      </Card>
    );

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
    <div>
      <div className="bg-muted/50 flex md:min-h-min p-4">
        <div className=" flex w-full max-w-3xl items-center space-x-2 gap-2">
          <Input
            type="Search"
            placeholder="Search by country"
            onChange={(e) => setCountry(e.target.value)}
          />
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

export default Destination;
