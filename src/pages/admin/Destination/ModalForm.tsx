import React, {useState} from 'react';
import {Modal, notification, Select, Form, InputNumber} from 'antd';
import {Button} from '@/components/ui/button';
import {useAddDestination} from '@/hooks/useAddDestination';
import {useUpdateDestination} from '@/hooks/useUpdateDestination';
import {fetchDestinationById} from '@/hooks/useGetDestinationById';
import countryCity from '../../../utils/countryCity';
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

  const mutateAddDestination = useAddDestination();
  const mutateUpdateDestination = useUpdateDestination();

  const [form] = Form.useForm();
  const isSubmitAble = useModalForm(form);
  const selectedCountry = Form.useWatch(['country'], form);

  const showModal = async () => {
    setIsModalOpen(true);

    if (mode === 'edit') {
      const data = await fetchDestinationById(id as string);
      form.setFieldsValue({...data});
    }
  };

  const handleSuccess = (message: string): void => {
    setIsModalOpen(false);
    form.resetFields();
    notification.success({
      message: message,
      description: `Destination ${message.toLowerCase()} successfully`,
    });
  };

  const handleOk = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    if (mode === 'add') {
      mutateAddDestination.mutate(
        {...values},
        {onSuccess: () => handleSuccess('Added')}
      );
    } else if (mode === 'edit') {
      mutateUpdateDestination.mutate(
        {id: id as string, formData: values},
        {onSuccess: () => handleSuccess('Updated')}
      );
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
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        confirmLoading={
          mutateAddDestination.isPending || mutateUpdateDestination.isPending
        }
        okButtonProps={{disabled: !isSubmitAble}}
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item
            name="country"
            label="Country"
            rules={[{required: true, message: 'Please select a city'}]}
            hasFeedback
          >
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
          <Form.Item
            name="city"
            label="City"
            rules={[{required: true}]}
            hasFeedback
          >
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

          <Form.Item
            name="price"
            label="Price"
            rules={[
              {required: true, message: 'Price is required'},
              {pattern: /^\d+$/, message: 'Price must be digits'},
              {
                type: 'number',
                min: 1,
                message: 'Price must be greater than 0',
              },
            ]}
            hasFeedback
          >
            <InputNumber style={{width: '100%'}} placeholder="Price" />
          </Form.Item>

          <Form.Item
            name="discount"
            label="Discount"
            rules={[
              {required: false},
              {
                type: 'number',
                min: 0,
                max: 100,
              },
            ]}
            hasFeedback
          >
            <InputNumber style={{width: '100%'}} placeholder="Discount" />
          </Form.Item>

          <Form.Item
            name="quota"
            label="Quota"
            rules={[
              {required: true, message: 'Quota is required'},
              {
                type: 'number',
                min: 1,
                message: 'Price must be greater than 0',
              },
            ]}
            hasFeedback
          >
            <InputNumber style={{width: '100%'}} placeholder="Quota" />
          </Form.Item>

          <Form.Item
            name="rating"
            label="Rating"
            rules={[
              {required: true, message: 'Rating is required'},
              {
                type: 'number',
                min: 0,
                message: 'Rating must be greater than 0',
              },
              {
                type: 'number',
                max: 5,
                message: 'Rating must be less than 5',
              },
            ]}
            hasFeedback
          >
            <InputNumber style={{width: '100%'}} placeholder="Rating" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalForm;
