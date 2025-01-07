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
        <div className={configClass?.label}>Home Banner Title</div>
        <input
          type='text'
          placeholder='Enter Title'
          // autoComplete='off'
          name='home_title'
          className={configClass?.form}
          onChange={formik.handleChange}
          value={formik.values?.home_title}
        />
        {formik?.errors?.home_title && (
          <div className={configClass.formError}>{formik?.errors?.home_title}</div>
        )}
      </div>
      <div className='col-12 my-10px'>
        <div className={configClass?.label}>Home Banner Description</div>
        <input
          type='text'
          placeholder='Enter Description'
          // autoComplete='off'
          name='home_description'
          className={configClass?.form}
          onChange={formik.handleChange}
          value={formik.values?.home_description}
        />
        {formik?.errors?.home_description && (
          <div className={configClass.formError}>{formik?.errors?.home_description}</div>
        )}
      </div>
    </div>
  )
}

export default Index
