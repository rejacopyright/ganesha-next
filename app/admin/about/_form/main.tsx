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
        <div className={configClass?.label}>Title</div>
        <input
          type='text'
          placeholder='Enter Title'
          // autoComplete='off'
          name='about_title'
          className={configClass?.form}
          onChange={formik.handleChange}
          value={formik.values?.about_title}
        />
        {formik?.errors?.about_title && (
          <div className={configClass.formError}>{formik?.errors?.about_title}</div>
        )}
      </div>
      <div className='col-12 my-10px'>
        <div className={configClass?.label}>Description</div>
        <TextEditor
          id='editor'
          options={{ minHeight: '300px' }}
          placeholder='Enter description here...'
          defaultData={formik?.values?.about_description || ''}
          onChange={(e: any) => {
            formik.setFieldValue('about_description', e)
          }}
          loading={false}
        />
        {formik?.errors?.about_description && (
          <div className={configClass.formError}>{formik?.errors?.about_description}</div>
        )}
      </div>
    </div>
  )
}

export default Index
