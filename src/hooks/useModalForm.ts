import {useEffect, useState} from 'react';
import {Form, FormInstance} from 'antd';

export function useModalForm(form: FormInstance) {
  const [isSubmitAble, setIsSubmitAble] = useState(false);
  const watchValues = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({validateOnly: true})
      .then(() => setIsSubmitAble(true))
      .catch(() => setIsSubmitAble(false));
  }, [watchValues, form]);

  return isSubmitAble;
}
