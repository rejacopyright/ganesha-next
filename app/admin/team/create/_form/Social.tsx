import { InputGroup } from '@components/form/InputGroup'
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
        <div className={configClass?.label}>LinkedIn</div>
        <InputGroup
          defaultValue={formik?.values?.social?.linkedin || ''}
          icon={<i className='fab fa-linkedin fs-25px text-dark' />}
          onChange={(e: any) => {
            formik.setFieldValue('social', {
              ...(formik.values.social || {}),
              linkedin: e?.target?.value,
            })
          }}
        />
      </div>
      <div className='col-lg-6 my-10px'>
        <div className={configClass?.label}>Twitter</div>
        <InputGroup
          defaultValue={formik?.values?.social?.twitter || ''}
          icon={<i className='fab fa-twitter fs-25px text-dark' />}
          onChange={(e: any) => {
            formik.setFieldValue('social', {
              ...(formik.values.social || {}),
              twitter: e?.target?.value,
            })
          }}
        />
      </div>
      <div className='col-lg-6 my-10px'>
        <div className={configClass?.label}>Youtube</div>
        <InputGroup
          defaultValue={formik?.values?.social?.youtube || ''}
          icon={<i className='fab fa-youtube fs-25px text-dark' />}
          onChange={(e: any) => {
            formik.setFieldValue('social', {
              ...(formik.values.social || {}),
              youtube: e?.target?.value,
            })
          }}
        />
      </div>
      <div className='col-lg-6 my-10px'>
        <div className={configClass?.label}>Instagram</div>
        <InputGroup
          defaultValue={formik?.values?.social?.instagram || ''}
          icon={<i className='fab fa-instagram fs-25px text-dark' />}
          onChange={(e: any) => {
            formik.setFieldValue('social', {
              ...(formik.values.social || {}),
              instagram: e?.target?.value,
            })
          }}
        />
      </div>
    </div>
  )
}

export default Index
