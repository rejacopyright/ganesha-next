'use client'

import {
  createProductCategory,
  getDetailProductCategory,
  updateProductCategory,
} from '@api/product'
import { ToastMessage } from '@components/toast'
import { APP_ADMIN_PATH } from '@helpers'
import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC, useState } from 'react'
import * as Yup from 'yup'

const FormMain = dynamic(() => import('./_form/main'))

export interface FormValues {
  name?: string
  description?: string
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
})

const Index: FC<any> = () => {
  const searchParams: any = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const id = queryParams?.id
  const isEdit: boolean = searchParams?.has('id') && Boolean(id)
  const router = useRouter()

  const [submitBtnIsLoading, setSubmitBtnIsLoading] = useState<boolean>(false)

  const detailProductCategoryQuery: any = useQuery({
    // initialData: {data: []},
    enabled: isEdit,
    queryKey: ['getDetailProductCategory', { id: id }],
    queryFn: async () => {
      const api = await getDetailProductCategory(id as string)
      const data = api?.data
      return data
    },
  })

  const detailProductCategory = detailProductCategoryQuery?.data || {}

  const initialValues = {
    name: detailProductCategory?.name || '',
    description: detailProductCategory?.description || '',
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (val: any) => {
      setSubmitBtnIsLoading(true)

      const params: FormValues = {
        name: val?.name,
        description: val?.description || '',
      }

      const apiInstance =
        isEdit && id ? updateProductCategory(id as string, params) : createProductCategory(params)
      apiInstance
        .then(({ data }: any) => {
          if (data?.status === 'success') {
            ToastMessage({ type: 'success', message: data?.message })
            router.push(`${APP_ADMIN_PATH}/product/category`)
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
            <div className='fw-bold fs-14px'>{isEdit ? 'Update' : 'Add New'} Product Category</div>
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
            <button
              type='button'
              disabled={submitBtnIsLoading}
              className='btn btn-light'
              onClick={() => router.back()}>
              Kembali
            </button>
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
