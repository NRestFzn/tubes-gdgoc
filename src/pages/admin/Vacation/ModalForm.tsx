import React, {useState} from 'react';
import {Vacation as VacationInterface} from '@/utils/types';
import {Modal, Input, notification, Select} from 'antd';
import {Button} from '@/components/ui/button';
import {useAddVacation} from '@/hooks/useAddVacation';
import {useUpdateVacation} from '@/hooks/useUpdateVacation';
import {useGetVacationById} from '@/hooks/useGetVacationById';
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

  const mutateAddVacation = useAddVacation();
  const mutateUpdateVacation = useUpdateVacation();

  const [addVacation, setAddVacation] = useState<VacationInterface>({
    city: '',
    country: '',
    price: 0,
    quota: 0,
    dayTrip: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setAddVacation((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const {data} = useGetVacationById(id as string);

  const showModal = () => {
    setIsModalOpen(true);

    if (mode === 'edit') {
      isSetCity(data?.city || '');
      isSetCountry(data?.country || '');
      isSetDisableCity(false);
      setAddVacation({
        city: setCity as string,
        country: setCountry as string,
        price: data?.price || 0,
        quota: data?.quota || 0,
        dayTrip: data?.dayTrip || 0,
      });
    }
  };

  const handleOk = () => {
    if (mode === 'add') {
      mutateAddVacation.mutate(
        {...addVacation},
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setAddVacation({
              city: '',
              country: '',
              price: 0,
              quota: 0,
              dayTrip: 0,
            });
            notification.success({
              message: 'Added!',
              description: 'Vacation added successfully',
            });
          },
        }
      );
    } else if (mode === 'edit') {
      mutateUpdateVacation.mutate(
        {id: id as string, formData: addVacation},
        {
          onSuccess: () => {
            setIsModalOpen(false);
            notification.success({
              message: 'Updated!',
              description: 'Vacation updated successfully',
            });
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setAddVacation({
      city: '',
      country: '',
      price: 0,
      quota: 0,
      dayTrip: 0,
    });
  };

  const onChangeSelect = (name: string, value: string) => {
    setAddVacation((prevForm) => ({
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
        {mode === 'add' ? '+ Add Vacation' : 'Edit'}
      </Button>

      <Modal
        title={mode === 'add' ? 'Add Vacation' : 'Edit Vacation'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={
          mutateAddVacation.isPending || mutateUpdateVacation.isPending
        }
      >
        <div className="flex flex-col gap-4">
          <Select
            showSearch
            placeholder="Select vacation country"
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
            placeholder="Select vacation city"
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
            value={addVacation.price}
            type="number"
          />
          <Input
            name="dayTrip"
            placeholder="Day Trip"
            onChange={handleChange}
            value={addVacation.dayTrip}
            type="number"
          />
          <Input
            name="quota"
            placeholder="Quota"
            onChange={handleChange}
            value={addVacation.quota}
            type="number"
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalForm;
