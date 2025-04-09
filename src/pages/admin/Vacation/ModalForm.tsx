import React, {useState} from 'react';
import {Modal, notification, Select, Form, InputNumber} from 'antd';
import {Button} from '@/components/ui/button';
import {useAddVacation} from '@/hooks/useAddVacation';
import {useUpdateVacation} from '@/hooks/useUpdateVacation';
import {fetchVacationById} from '@/hooks/useGetVacationById';
import countryCity from '@/utils/countryCity';
import {useModalForm} from '@/hooks/useModalForm';

type ModalFormProps = {
  mode: 'add' | 'edit';
  id?: string;
};

const ModalForm: React.FC<ModalFormProps> = ({
  mode,
  id,
}): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutateAddVacation = useAddVacation();
  const mutateUpdateVacation = useUpdateVacation();

  const [form] = Form.useForm();
  const isSubmitAble = useModalForm(form);
  const selectedCountry = Form.useWatch(['country'], form);

  const showModal = async () => {
    setIsModalOpen(true);
    const data = await fetchVacationById(id as string);

    if (mode === 'edit') {
      form.setFieldsValue({...data});
    }
  };

  const handleSuccess = (message: string): void => {
    setIsModalOpen(false);
    form.resetFields();
    notification.success({
      message: message,
      description: `Vacation ${message.toLowerCase()} successfully`,
    });
  };

  const handleOk = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    if (mode === 'add') {
      mutateAddVacation.mutate(
        {...values},
        {onSuccess: () => handleSuccess('Added')}
      );
    } else if (mode === 'edit') {
      mutateUpdateVacation.mutate(
        {id: id as string, formData: values},
        {onSuccess: () => handleSuccess('Updated')}
      );
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
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        confirmLoading={
          mutateAddVacation.isPending || mutateUpdateVacation.isPending
        }
        okButtonProps={{disabled: !isSubmitAble}}
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item name="country" label="Country" rules={[{required: true}]}>
            <Select
              showSearch
              placeholder="Select destination country"
              optionFilterProp="label"
              options={countryCity.getCountries().map((e: string) => {
                return {value: e, label: e};
              })}
              allowClear
              onChange={() => {
                form.setFieldValue('city', undefined);
              }}
            />
          </Form.Item>
          <Form.Item name="city" label="City" rules={[{required: true}]}>
            <Select
              showSearch
              placeholder="Select destination city"
              optionFilterProp="label"
              disabled={!selectedCountry}
              options={countryCity
                .getCities(selectedCountry)
                .map((e: string) => {
                  return {value: e, label: e};
                })}
              allowClear
            />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{required: true}]}>
            <InputNumber style={{width: '100%'}} placeholder="Price" />
          </Form.Item>

          <Form.Item name="dayTrip" label="Day Trip" rules={[{required: true}]}>
            <InputNumber style={{width: '100%'}} placeholder="Day Trip" />
          </Form.Item>

          <Form.Item name="quota" label="Quota" rules={[{required: true}]}>
            <InputNumber style={{width: '100%'}} placeholder="Quota" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalForm;
