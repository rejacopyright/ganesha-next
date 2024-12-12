import TextEditor from '@components/form/TextEditor'
import { configClass } from '@helpers'
import { FormikProps } from 'formik'
import { FC } from 'react'

import { FormValues } from '../page'

interface FormProps {
  formik: FormikProps<FormValues>
}

const Index: FC<FormProps> = ({ formik }) => {
  return (
    <div className='row'>
      <div className='col-lg-6 my-10px'>
        <div className={configClass?.label}>Product Name</div>
        <input
          type='text'
          placeholder='Enter Product Name'
          // autoComplete='off'
          name='name'
          className={configClass?.form}
          onChange={formik.handleChange}
          value={formik.values?.name}
        />
        {formik?.errors?.name && (
          <div className={configClass.formError}>{formik?.errors?.name}</div>
        )}
      </div>
      <div className='col-12 my-10px'>
        <div className={configClass?.label}>Description</div>
        <TextEditor
          id='editor'
          options={{ minHeight: '300px' }}
          placeholder='Enter description here...'
          defaultData={formik?.values?.description || ''}
          onChange={(e: any) => {
            formik.setFieldValue('description', e)
          }}
          loading={false}
        />
        {formik?.errors?.description && (
          <div className={configClass.formError}>{formik?.errors?.description}</div>
        )}
      </div>
    </div>
  )
}

export default Index
