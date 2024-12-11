'use client'

import { API_SERVER } from '@api/axios'
import { createTeam, getDetailTeam, updateTeam } from '@api/team'
import { ToastMessage } from '@components/toast'
import { APP_ADMIN_PATH, blobToBase64, urlToBase64 } from '@helpers'
import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC, useEffect, useState } from 'react'
import * as Yup from 'yup'

const FormImage = dynamic(() => import('./_form/ImageUpload'))
const FormSocial = dynamic(() => import('./_form/Social'))
const FormMain = dynamic(() => import('./_form/main'))

export interface FormValues {
  image: any
  full_name?: string
  gender?: number
  category?: string
  title?: string
  email?: string
  phone?: string
  social?: any
  isImageChanged?: boolean
}

const validationSchema = Yup.object().shape({
  full_name: Yup.string().required('Full Name is required'),
  title: Yup.string().required('Title is required'),
  phone: Yup.string().required('Phone is required'),
  email: Yup.string()
    .matches(new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i), 'Enter correct email format')
    .required('Email is required'),
})

const Index: FC<any> = () => {
  const searchParams: any = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const team_id = queryParams?.id
  const isEdit: boolean = searchParams?.has('id') && Boolean(team_id)
  const router = useRouter()

  const [submitBtnIsLoading, setSubmitBtnIsLoading] = useState<boolean>(false)

  const initialValues = {
    full_name: '',
    title: '',
    email: '',
    phone: '',
    image: '',
    gender: 1,
    category: 'R&D',
    social: {},
  }

  const detailTeamQuery: any = useQuery({
    // initialData: {data: []},
    enabled: isEdit,
    queryKey: ['getDetailTeam', { id: team_id }],
    queryFn: async () => {
      const api = await getDetailTeam(team_id as string)
      const newData = api?.data
      newData.image = await urlToBase64(`${API_SERVER}/static/images/team/${api?.data?.avatar}`)
      return newData
    },
  })

  const detailTeam = detailTeamQuery?.data || {}

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (val: any) => {
      // setSubmitBtnIsLoading(true)

      let base64image = formik.values?.image
      if (typeof formik.values?.image !== 'string') {
        base64image = await blobToBase64(formik.values?.image)
      }

      // Check If Image is changed
      const imagefromAPI = detailTeam?.image
      const imagefromFormik = base64image
      const isImageChanged = imagefromFormik !== imagefromAPI

      const params: FormValues = {
        full_name: val?.full_name,
        title: val?.title,
        email: val?.email,
        phone: val?.phone,
        gender: val?.gender || '',
        category: val?.category || '',
        social: val?.social,
        image: base64image,
        isImageChanged,
      }

      const apiInstance =
        isEdit && team_id ? updateTeam(team_id as string, params) : createTeam(params)
      apiInstance
        .then(({ data }: any) => {
          if (data?.status === 'success') {
            ToastMessage({ type: 'success', message: data?.message })
            router.push(`${APP_ADMIN_PATH}/team`)
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

  useEffect(() => {
    if (isEdit) {
      formik.setValues({
        image: detailTeam?.image || '',
        name: detailTeam?.name || '',
        default_fee: detailTeam?.default_fee || '',
        province_id: detailTeam?.province?.id
          ? {
              value: detailTeam?.province?.id,
              label: `${detailTeam?.province?.first_name} ${detailTeam?.province?.last_name}`,
            }
          : {},
        gender: detailTeam?.gender || 3,
        description: detailTeam?.description || '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailTeam, isEdit])
  return (
    <div className='content'>
      <form action='' onSubmit={formik.handleSubmit}>
        <div className='bg-white shadow-xs radius-15'>
          <div className='border-bottom border-gray-300 py-10px px-20px m-0 d-flex align-items-center'>
            <div className='fas fa-info-circle me-10px' />
            <div className='fw-bold fs-14px'>Add New Team</div>
          </div>
          <div className='px-20px py-10px'>
            <div className='row'>
              <div className='col-auto'>
                <FormImage formik={formik} />
              </div>
              <div className='col'>
                <FormMain formik={formik} />
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white shadow-xs radius-15 mt-25px'>
          <div className='border-bottom border-gray-300 py-10px px-20px m-0 d-flex align-items-center'>
            <div className='fas fa-info-circle me-10px' />
            <div className='fw-bold fs-14px'>Social</div>
          </div>
          <div className='px-20px py-10px'>
            <FormSocial formik={formik} />
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
