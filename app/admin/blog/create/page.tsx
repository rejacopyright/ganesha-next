'use client'

import { createBlog, getDetailBlog, updateBlog } from '@api/blog'
import { ToastMessage } from '@components/toast'
import { APP_ADMIN_PATH, blobToBase64, urlToBase64 } from '@helpers'
import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC, useState } from 'react'
import * as Yup from 'yup'

const FormImage = dynamic(() => import('./_form/ImageUpload'))
const FormMain = dynamic(() => import('./_form/main'))

export interface FormValues {
  image: any
  isImageChanged?: boolean
  title?: string
  product_id?: string
  description?: string
  tags?: string[]
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
})

const Index: FC<any> = () => {
  const searchParams: any = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const blog_id = queryParams?.id
  const isEdit: boolean = searchParams?.has('id') && Boolean(blog_id)
  const router = useRouter()

  const [submitBtnIsLoading, setSubmitBtnIsLoading] = useState<boolean>(false)

  const detailBlogQuery: any = useQuery({
    // initialData: {data: []},
    enabled: isEdit,
    queryKey: ['getDetailBlog', { id: blog_id }],
    queryFn: async () => {
      const api = await getDetailBlog(blog_id as string)
      const newData = api?.data
      if (api?.data?.image) {
        newData.image = await urlToBase64(api?.data?.image)
      }
      return newData
    },
  })

  const detailBlog = detailBlogQuery?.data || {}

  const initialValues = {
    title: detailBlog?.title || '',
    description: detailBlog?.description || '',
    image: detailBlog?.image || '',
    product_id: detailBlog?.product_id || '',
    tags: detailBlog?.tags || [],
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (val: any) => {
      // setSubmitBtnIsLoading(true)

      let base64image = formik.values?.image
      if (typeof formik.values?.image !== 'string') {
        base64image = await blobToBase64(formik.values?.image)
      }

      // Check If Image is changed
      const imagefromAPI = detailBlog?.image
      const imagefromFormik = base64image
      const isImageChanged = imagefromFormik !== imagefromAPI

      const params: FormValues = {
        product_id: val?.product_id || '',
        title: val?.title,
        description: val?.description,
        tags: val?.tags || [],
        image: base64image,
        isImageChanged,
      }

      const apiInstance =
        isEdit && blog_id ? updateBlog(blog_id as string, params) : createBlog(params)
      apiInstance
        .then(({ data }: any) => {
          if (data?.status === 'success') {
            ToastMessage({ type: 'success', message: data?.message })
            router.push(`${APP_ADMIN_PATH}/blog`)
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
        <div className='bg-white shadow-xs radius-15 mb-20px'>
          <div className='border-bottom border-gray-300 py-10px px-20px m-0 d-flex align-items-center'>
            <div className='fas fa-info-circle me-10px' />
            <div className='fw-bold fs-14px'>Blog Image</div>
          </div>
          <div className='px-20px py-10px'>
            <FormImage formik={formik} />
          </div>
        </div>
        <div className='bg-white shadow-xs radius-15'>
          <div className='border-bottom border-gray-300 py-10px px-20px m-0 d-flex align-items-center'>
            <div className='fas fa-info-circle me-10px' />
            <div className='fw-bold fs-14px'>Blog Detail</div>
          </div>
          <div className='px-20px py-10px'>
            <FormMain formik={formik} />
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
