import React, {useState} from 'react';
import {Destination as DestinationInterface} from '@/utils/types';
import {Modal, Input, notification, Select} from 'antd';
import {Button} from '@/components/ui/button';
import {useAddDestination} from '@/hooks/useAddDestination';
import {useUpdateDestination} from '@/hooks/useUpdateDestination';
import {useGetDestinationById} from '@/hooks/useGetDestinationById';
import countryCity from '../../../utils/countryCity';
import countryData from '../../../lib/countries-cities.json';

type ModalFormProps = {
  mode: 'add' | 'edit';
  id?: string;
};

const ModalForm: React.FC<ModalFormProps> = ({
  mode,
  id,
}): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [setCountry, isSetCountry] = useState<string | undefined>(undefined);
  const [setCity, isSetCity] = useState<string | undefined>(undefined);
  const [setDisableCity, isSetDisableCity] = useState(true);

  const mutateAddDestination = useAddDestination();
  const mutateUpdateDestination = useUpdateDestination();

  const [addDestination, setAddDestination] = useState<DestinationInterface>({
    city: '',
    country: '',
    price: 0,
    quota: 0,
    discount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setAddDestination((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const {data} = useGetDestinationById(id as string);

  const showModal = () => {
    setIsModalOpen(true);

    if (mode === 'edit') {
      isSetCity(data?.city || '');
      isSetCountry(data?.country || '');
      isSetDisableCity(false);
      setAddDestination({
        city: setCity as string,
        country: setCountry as string,
        price: data?.price || 0,
        quota: data?.quota || 0,
        discount: data?.discount || 0,
      });
    }
  };

  const handleOk = () => {
    if (mode === 'add') {
      mutateAddDestination.mutate(
        {...addDestination},
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setAddDestination({
              city: '',
              country: '',
              price: 0,
              quota: 0,
              discount: 0,
            });
            notification.success({
              message: 'Added!',
              description: 'Destination added successfully',
            });
          },
        }
      );
    } else if (mode === 'edit') {
      mutateUpdateDestination.mutate(
        {id: id as string, formData: addDestination},
        {
          onSuccess: () => {
            setIsModalOpen(false);
            notification.success({
              message: 'Updated!',
              description: 'Destination updated successfully',
            });
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setAddDestination({
      city: '',
      country: '',
      price: 0,
      quota: 0,
      discount: 0,
    });
  };

  const onChangeSelect = (name: string, value: string) => {
    setAddDestination((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (name === 'country') {
      isSetCountry(value);
      isSetDisableCity(false);
      isSetCity(undefined);
    } else if (name === 'city') {
      isSetCity(value);
    }
  };

  return (
    <>
      <Button variant="outline" onClick={showModal}>
        {mode === 'add' ? '+ Add Destination' : 'Edit'}
      </Button>

      <Modal
        title={mode === 'add' ? 'Add Destination' : 'Edit Destination'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={
          mutateAddDestination.isPending || mutateUpdateDestination.isPending
        }
      >
        <div className="flex flex-col gap-4">
          <Select
            showSearch
            placeholder="Select destination country"
            optionFilterProp="label"
            onChange={(value: string) => onChangeSelect('country', value)}
            onSearch={() => {}}
            options={countryCity.getCountries().map((e: string) => {
              return {value: e, label: e};
            })}
            allowClear
            value={setCountry}
          />
          <Select
            showSearch
            placeholder="Select destination city"
            optionFilterProp="label"
            onChange={(value: string) => onChangeSelect('city', value)}
            onSearch={() => {}}
            options={countryCity
              .getCities(setCountry as keyof (typeof countryData)['countries'])
              .map((e: string) => {
                return {value: e, label: e};
              })}
            allowClear
            disabled={setDisableCity}
            value={setCity}
          />
          <Input
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={addDestination.price}
            type="number"
          />
          <Input
            name="discount"
            placeholder="Discount"
            onChange={handleChange}
            value={addDestination.discount}
            type="number"
          />
          <Input
            name="quota"
            placeholder="Quota"
            onChange={handleChange}
            value={addDestination.quota}
            type="number"
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalForm;
