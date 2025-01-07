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
        <div className={configClass?.label}>Company Phone</div>
        <input
          type='text'
          placeholder='Enter Phone'
          // autoComplete='off'
          name='phone'
          className={configClass?.form}
          onChange={formik.handleChange}
          value={formik.values?.phone}
        />
        {formik?.errors?.phone && (
          <div className={configClass.formError}>{formik?.errors?.phone}</div>
        )}
      </div>
      <div className='col-lg-6 my-10px'>
        <div className={configClass?.label}>Company Email</div>
        <input
          type='text'
          placeholder='Enter Email'
          // autoComplete='off'
          name='email'
          className={configClass?.form}
          onChange={formik.handleChange}
          value={formik.values?.email}
        />
        {formik?.errors?.email && (
          <div className={configClass.formError}>{formik?.errors?.email}</div>
        )}
      </div>
      <div className='col-12 my-10px'>
        <div className={configClass?.label}>Company Address</div>
        <input
          type='text'
          placeholder='Enter Address'
          // autoComplete='off'
          name='address'
          className={configClass?.form}
          onChange={formik.handleChange}
          value={formik.values?.address}
        />
        {formik?.errors?.address && (
          <div className={configClass.formError}>{formik?.errors?.address}</div>
        )}
      </div>
    </div>
  )
}

export default Index
