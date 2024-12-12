import { Select as SelectData } from '@components/select/select'
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
      <div className='col-lg-8 my-10px'>
        <div className={configClass?.label}>Full Name</div>
        <input
          type='text'
          placeholder='Enter Full Name'
          // autoComplete='off'
          name='full_name'
          className={configClass?.form}
          onChange={formik.handleChange}
          value={formik.values?.full_name}
        />
        {formik?.errors?.full_name && (
          <div className={configClass.formError}>{formik?.errors?.full_name}</div>
        )}
      </div>
      <div className='col-lg-4 my-10px'>
        <div className={configClass?.label}>Gender</div>
        <SelectData
          sm={true}
          name='gender'
          className='p-0 text-start'
          data={[
            { value: 1, label: 'Male' },
            { value: 2, label: 'Female' },
            { value: 3, label: 'Other' },
          ]}
          isClearable={false}
          placeholder='Choose Gender'
          defaultValue={formik?.values?.gender}
          styleOption={{
            control: {
              border: '1px solid #eee',
              borderRadius: '5px',
              // width: 150,
              height: 42,
            },
            placeholder: { color: '#000' },
          }}
          onChange={(e: any) => {
            formik.setFieldValue('gender', e?.value)
          }}
        />
      </div>
      <div className='col-lg-6 my-10px'>
        <div className={configClass?.label}>Email</div>
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
      <div className='col-lg-6 my-10px'>
        <div className={configClass?.label}>Phone</div>
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
        <div className={configClass?.label}>Title</div>
        <input
          type='text'
          placeholder='e.g. C++ Developer'
          // autoComplete='off'
          name='title'
          className={configClass?.form}
          onChange={formik.handleChange}
          value={formik.values?.title}
        />
        {formik?.errors?.title && (
          <div className={configClass.formError}>{formik?.errors?.title}</div>
        )}
      </div>
      <div className='col-lg-6 my-10px'>
        <div className={configClass?.label}>Category</div>
        <SelectData
          sm={true}
          name='category'
          className='p-0 text-start'
          data={[
            { value: 'R&D', label: 'R&D' },
            { value: 'Developer', label: 'Developer' },
          ]}
          isClearable={false}
          placeholder='Choose Category'
          defaultValue={formik?.values?.category}
          styleOption={{
            control: {
              border: '1px solid #eee',
              borderRadius: '5px',
              // width: 150,
              height: 42,
            },
            placeholder: { color: '#000' },
          }}
          onChange={(e: any) => {
            formik.setFieldValue('category', e?.value)
          }}
        />
      </div>
    </div>
  )
}

export default Index
