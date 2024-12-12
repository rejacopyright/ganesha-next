import { createTag, updateTag } from '@api/settings'
import { ToastMessage } from '@components/toast'
import { configClass } from '@helpers'
import { useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { FC, useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tag Name is required'),
})

const Index: FC<{
  show: boolean
  setShow: (e: boolean) => void
  detail: any
  queryKey: any[]
}> = ({ show, setShow, detail, queryKey }) => {
  const queryClient = useQueryClient()
  const inputRef: any = useRef([])

  const [btnLoading, setBtnLoading] = useState<boolean>(false)

  useEffect(() => {
    if (show) {
      inputRef?.current?.name?.focus?.()
    }
  }, [show])

  const formik = useFormik({
    initialValues: { name: detail?.name || '' },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (val: any) => {
      setBtnLoading(true)
      const params = { name: val?.name }
      const apiInstance = detail?.id ? updateTag(detail?.id as string, params) : createTag(params)
      apiInstance
        .then(({ data }: any) => {
          if (data?.status === 'success') {
            ToastMessage({ type: 'success', message: data?.message })
            setShow(false)
            queryClient.resetQueries({ queryKey })
          }
        })
        .catch((err: any) => {
          let message = err?.response?.data?.message || err?.message
          if (typeof message === 'object') {
            message = Object.values(message)?.[0]
          }
          ToastMessage({ type: 'error', message })
        })
        .finally(() => setBtnLoading(false))
    },
  })

  // useEffect(() => {
  //   if (show && detail?.name) {
  //     formik.setValues((prev) => ({ ...prev, name: detail?.name || '' }))
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [show, detail])

  return (
    <Modal
      centered
      dialogClassName='modal-sm'
      contentClassName='radius-15'
      show={show}
      onHide={() => {
        formik.resetForm()
        setShow(false)
      }}>
      <Modal.Body className='p-0'>
        <form action='' onSubmit={formik.handleSubmit}>
          <div className='p-15px d-flex flex-center h-100px'>
            <div className='w-100'>
              <input
                ref={(el: any) => (inputRef.current['name'] = el)}
                type='text'
                placeholder='Enter Tag Name'
                // autoComplete='off'
                name='name'
                className={configClass?.form}
                onChange={formik.handleChange}
                value={formik.values?.name}
              />
              {formik?.errors?.name && (
                <div className={configClass.formError}>{formik?.errors?.name?.toString?.()}</div>
              )}
            </div>
          </div>
          <div className='border-top border-2 p-15px d-flex align-items-center justify-content-end gap-10px'>
            <div onClick={() => setShow(false)} className='btn btn-sm btn-light px-15px'>
              <div className='fs-14px'>Dismiss</div>
            </div>
            <button
              type='submit'
              disabled={btnLoading}
              className='btn btn-sm btn-primary btn-flex flex-center px-15px gap-10px'>
              {btnLoading ? (
                <span className='indicator-progress d-block fs-14px'>
                  Waiting...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <>
                  <i className='fas fa-check p-0 text-white fs-14px mb-1px' />
                  <div className='fs-14px me-5px'>{detail?.id ? 'Update' : 'Create'}</div>
                </>
              )}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default Index
