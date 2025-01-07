'use client'

import { getConfig, updateConfig } from '@api/settings'
import { ToastMessage } from '@components/toast'
import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import dynamic from 'next/dynamic'
import { FC, useState } from 'react'
import * as Yup from 'yup'

const FormMain = dynamic(() => import('./_form/main'))

export interface FormValues {
  about_title?: string
  about_description?: string
}

const validationSchema = Yup.object().shape({
  about_title: Yup.string().required('Title is required'),
  about_description: Yup.string().required('Description is required'),
})

const Index: FC<any> = () => {
  const [submitBtnIsLoading, setSubmitBtnIsLoading] = useState<boolean>(false)

  const detailConfigQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getConfig'],
    queryFn: async () => {
      const api = await getConfig()
      const newData = api?.data
      return newData
    },
  })

  const detailConfig = detailConfigQuery?.data || {}

  const initialValues = {
    about_title: detailConfig?.about_title || '',
    about_description: detailConfig?.about_description || '',
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (val: any) => {
      setSubmitBtnIsLoading(true)

      const params: FormValues = {
        about_title: val?.about_title,
        about_description: val?.about_description,
      }

      updateConfig(params)
        .then(({ data }: any) => {
          if (data?.status === 'success') {
            ToastMessage({ type: 'success', message: data?.message })
          }
        })
        .catch((err: any) => {
          let message = err?.response?.data?.message || err?.message
          if (typeof message === 'object') {
            message = Object.values(message)?.[0]
          }
          ToastMessage({ type: 'error', message })
        })
        .finally(() => setSubmitBtnIsLoading(false))
    },
  })

  return (
    <div className='content'>
      <form action='' onSubmit={formik.handleSubmit}>
        <div className='bg-white shadow-xs radius-15'>
          <div className='border-bottom border-gray-300 py-10px px-20px m-0 d-flex align-items-center'>
            <div className='fas fa-info-circle me-10px' />
            <div className='fw-bold fs-14px'>About</div>
          </div>
          <div className='px-20px py-10px'>
            <div className='row'>
              <div className='col'>
                <FormMain formik={formik} />
              </div>
            </div>
          </div>
        </div>
        <div
          className='my-30px text-end position-sticky bottom-0 border bg-white radius-10 p-16px'
          style={{ zIndex: 1 }}>
          <div className='d-flex align-items-center justify-content-end gap-10px'>
            <button type='submit' disabled={submitBtnIsLoading} className='btn btn-primary'>
              {!submitBtnIsLoading ? (
                'Submit'
              ) : (
                <span className='indicator-progress d-block'>
                  Waiting...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Index
