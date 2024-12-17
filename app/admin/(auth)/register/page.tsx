'use client'
import { register } from '@api/auth'
import { ToastMessage } from '@components/toast'
import { APP_ADMIN_PATH, APP_NAME, configClass } from '@helpers'
import clsx from 'clsx'
import { Field, Form, Formik, FormikProps } from 'formik'
import omit from 'lodash/omit'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useState } from 'react'
import * as Yup from 'yup'

// import LoginError from './_modals/LoginError'

interface FieldProps {
  email: string
  username: string
  first_name: string
  last_name: string
  password: string
  password_confirm: string
}

const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/
const lowerCaseRegex = /[a-z]/
const upperCaseRegex = /[A-Z]/
const numberRegex = /[0-9]/
const minCharRegex = /[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}/

const loginSchema: any = Yup.object().shape({
  email: Yup.string()
    .matches(new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i), 'Wrong email format')
    .required('Email is required'),
  username: Yup.string().required('Username is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  password: Yup.string()
    .matches(lowerCaseRegex, 'Minimal 1 huruf kecil')
    .matches(upperCaseRegex, 'Minimal 1 huruf besar')
    .matches(numberRegex, 'Minimal 1 angka')
    .matches(specialCharRegex, 'Minimal 1 simbol')
    .matches(minCharRegex, 'Minimal 8 karakter')
    .required('Password is required'),
  password_confirm: Yup.string()
    .oneOf([Yup.ref('password'), null as any], "Confirmation password doesn't match")
    .required('Confirmation password is required'),
})

const passMessage = [
  { id: 1, regex: lowerCaseRegex, message: `Minimal 1 huruf kecil`, status: false },
  { id: 2, regex: upperCaseRegex, message: `Minimal 1 huruf besar`, status: false },
  { id: 3, regex: numberRegex, message: `Minimal 1 angka`, status: false },
  { id: 4, regex: specialCharRegex, message: `Minimal 1 simbol`, status: false },
  { id: 5, regex: minCharRegex, message: `Minimal 8 karakter`, status: false },
]

const Login = ({ searchParams }) => {
  const router = useRouter()
  const params: any = use(searchParams)
  const { email = '' } = params || {}

  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const [showValidation, setShowValidation] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState<any[]>([])

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  const onPasswordChange = (e: any) => {
    setShowValidation(Boolean(e))
    const pass = passMessage?.map((item: any) => {
      const regex = item.regex
      if (regex.test(e)) {
        item.status = true
      } else {
        item.status = false
      }
      return item
    })
    setPasswordValidation(pass)
  }

  const handleOnSubmit = (values) => {
    setLoading(true)
    const params = { role_id: 2, ...omit(values, ['password_confirm']) }
    register(params)
      .then(({ data }: any) => {
        if (data?.status === 'success') {
          ToastMessage({ type: 'success', message: data?.message })
          router.push(APP_ADMIN_PATH)
        }
      })
      .catch((err: any) => {
        const message: any = err?.response?.data?.message || err?.message || ''
        setStatus(message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className='d-flex flex-center' style={{ height: '75vh', overflowY: 'scroll' }}>
      <Formik
        initialValues={{
          email,
          username: '',
          first_name: '',
          last_name: '',
          password: '',
          password_confirm: '',
        }}
        validationSchema={loginSchema}
        enableReinitialize
        validateOnChange
        validateOnMount
        onSubmit={handleOnSubmit}>
        {(formik: FormikProps<FieldProps>) => {
          const { touched, errors, isValid } = formik || {}
          return (
            <div className='row m-0'>
              <div className='col-12'>
                <div className='d-flex flex-center gap-10px mb-20px'>
                  <Image
                    alt='Logo'
                    src='/logo/logo-circle.png'
                    width={35}
                    height={35}
                    // className='mb-8px'
                    priority
                  />
                  <div className='fw-600 fs-14px'>{APP_NAME} | Registration</div>
                </div>
                <div
                  className='w-md-600px px-md-0 px-5 mx-auto'
                  style={{ backgroundColor: 'rgba(255,255,255,.85)' }}>
                  <Form className='justify-content-center' noValidate id='form-auth'>
                    <div className='row mb-24px'>
                      {status !== null && (
                        <div className='col-12 mb-20px'>
                          <div className='d-flex bg-light-danger gap-10px p-10px radius-5'>
                            <i className='fas fa-info-circle text-danger fs-16px mt-2px' />
                            <div className='text-danger fw-bold'>{status || ''}</div>
                          </div>
                        </div>
                      )}
                      <div className='col'>
                        <div className={configClass?.label}>Email</div>
                        <Field
                          className={clsx('bg-white', configClass?.form, {
                            'border-gray-300': !touched?.email,
                            'is-invalid': touched?.email && errors?.email,
                            'is-valid': touched?.email && !errors?.email,
                          })}
                          type='email'
                          name='email'
                          placeholder='Enter Email'
                          autoComplete='off'
                        />
                        {touched?.email && errors?.email && (
                          <div className='form-error'>{errors?.email || ''}</div>
                        )}
                      </div>
                      <div className='col'>
                        <div className={configClass?.label}>Username</div>
                        <Field
                          className={clsx('bg-white', configClass?.form, {
                            'border-gray-300': !touched?.username,
                            'is-invalid': touched?.username && errors?.username,
                            'is-valid': touched?.username && !errors?.username,
                          })}
                          type='text'
                          name='username'
                          placeholder='Enter Username'
                          autoComplete='off'
                        />
                        {touched?.username && errors?.username && (
                          <div className='form-error'>{errors?.username || ''}</div>
                        )}
                      </div>
                    </div>

                    <div className='row mb-24px'>
                      <div className='col'>
                        <div className={configClass?.label}>First Name</div>
                        <Field
                          className={clsx('bg-white', configClass?.form, {
                            'border-gray-300': !touched?.first_name,
                            'is-invalid': touched?.first_name && errors?.first_name,
                            'is-valid': touched?.first_name && !errors?.first_name,
                          })}
                          type='text'
                          name='first_name'
                          placeholder='Enter First Name'
                          autoComplete='off'
                        />
                        {touched?.first_name && errors?.first_name && (
                          <div className='form-error'>{errors?.first_name || ''}</div>
                        )}
                      </div>
                      <div className='col'>
                        <div className={configClass?.label}>Last Name</div>
                        <Field
                          className={clsx('bg-white', configClass?.form, {
                            'border-gray-300': !touched?.last_name,
                            'is-invalid': touched?.last_name && errors?.last_name,
                            'is-valid': touched?.last_name && !errors?.last_name,
                          })}
                          type='text'
                          name='last_name'
                          placeholder='Enter Last Name'
                          autoComplete='off'
                        />
                        {touched?.last_name && errors?.last_name && (
                          <div className='form-error'>{errors?.last_name || ''}</div>
                        )}
                      </div>
                    </div>

                    <div className='row mb-24px'>
                      <div className='col'>
                        <div className={configClass?.label}>Password</div>
                        <div className='input-group input-group-solid d-flex align-items-center bg-white border border-gray-300 overflow-hidden h-40px'>
                          <Field
                            type={passwordShown ? 'text' : 'password'}
                            // placeholder='Password'
                            autoComplete='off'
                            name='password'
                            placeholder='Kata Sandi'
                            // className={`bg-white border-0 ${configClass?.form}`}
                            className={clsx('bg-white border-0', configClass?.form, {
                              'is-invalid': touched?.password && errors?.password,
                              'is-valid': touched?.password && !errors?.password,
                            })}
                            onChangeCapture={({ target }: any) => {
                              const { value } = target
                              const passwd = `${value}`
                              onPasswordChange(passwd)
                            }}
                          />
                          <div className='px-3 d-flex h-100 flex-center' onClick={togglePassword}>
                            {passwordShown && <i className='las la-eye fs-2' />}
                            {!passwordShown && <i className='las la-eye-slash fs-2' />}
                          </div>
                        </div>
                        {touched?.password && showValidation ? (
                          <div className='mt-5px'>
                            {passwordValidation?.map((item, key: number) => (
                              <div key={key} className='d-flex align-items-center gap-5px'>
                                {item?.status ? (
                                  <>
                                    <div className='fas fa-check-circle text-success' />
                                    <div className='fw-bold text-success'>{item?.message}</div>
                                  </>
                                ) : (
                                  <>
                                    <div className='fas fa-check-circle text-gray-300' />
                                    <div className='fw-bold text-gray-400'>{item?.message}</div>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          touched?.password &&
                          errors?.password && (
                            <div className='form-error'>{errors?.password || ''}</div>
                          )
                        )}
                      </div>
                      <div className='col'>
                        <div className={configClass?.label}>Repeat Password</div>
                        <div className='input-group input-group-solid d-flex align-items-center bg-white border border-gray-300 overflow-hidden h-40px'>
                          <Field
                            type={passwordShown ? 'text' : 'password'}
                            // placeholder='Password'
                            autoComplete='off'
                            name='password_confirm'
                            placeholder='Repeat Password'
                            className={clsx('bg-white border-0', configClass?.form, {
                              'is-invalid': touched?.password_confirm && errors?.password_confirm,
                              'is-valid': touched?.password_confirm && !errors?.password_confirm,
                            })}
                          />
                          <div className='px-3 d-flex h-100 flex-center' onClick={togglePassword}>
                            {passwordShown && <i className='las la-eye fs-2' />}
                            {!passwordShown && <i className='las la-eye-slash fs-2' />}
                          </div>
                        </div>
                        {touched?.password_confirm && errors?.password_confirm && (
                          <div className='form-error'>{errors?.password_confirm || ''}</div>
                        )}
                      </div>
                    </div>

                    <div className='text-center'>
                      <button
                        type={isValid ? 'submit' : 'button'}
                        className={clsx('btn w-100 fw-600 fs-6 h-40px mb-24px', {
                          'btn-primary': isValid,
                          'bg-secondary text-gray-600 cursor-na': !isValid,
                        })}
                        // disabled={!isValid}
                      >
                        {!loading && <span className='indicator-label'>Register</span>}
                        {loading && (
                          <span className='indicator-progress d-block'>
                            Waiting...
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                          </span>
                        )}
                      </button>
                      <div className='d-flex flex-center'>
                        <Link href={`${APP_ADMIN_PATH}/login`} className='text-primary fw-bolder'>
                          Login
                        </Link>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          )
        }}
      </Formik>
      {/* <LoginError
        show={showModalNoAccount}
        setShow={setShowModalNoAccount}
        message={status}
        code={statusCode}
      /> */}
    </div>
  )
}

export default Login
