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
      <div className='col-lg-6 my-10px'>
        <div className={configClass?.label}>Title</div>
        <input
          type='text'
          placeholder='Enter Blog Title'
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
          data={[{ value: 'all', label: 'All' }]}
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
