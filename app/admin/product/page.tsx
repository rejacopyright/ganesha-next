'use client'
import { API_SERVER } from '@api/axios'
import Table from '@components/table'
import Tooltip from '@components/tooltip'
import { APP_ADMIN_PATH, isDev, toCapitalize } from '@helpers'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC, use, useState } from 'react'

import { Filter } from './_parts/Filter'
import ModalDelete from './_parts/ModalDelete'
import ModalView from './_parts/ModalView'

const ClickableComponent: FC<{
  align?: 'center' | 'start' | 'end'
  content?: string
  icon?: string
  onClick?: (e?: any) => void
}> = ({ align = 'center', content = '-', icon = 'eye', onClick = () => '' }) => {
  const [isHover, setIsHover] = useState<boolean>(false)
  return (
    <div
      className={`d-flex align-items-center justify-content-${align} py-8px ps-12px radius-50 user-select-none position-relative ${isHover ? 'text-primary cursor-pointer' : 'text-dark'}`}
      style={{ backgroundColor: isHover ? '#f26d2610' : 'unset' }}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <div className='pe-15px'>{content}</div>
      <div className={`position-absolute end-0 pe-5px ${isHover ? 'd-block' : 'd-none'}`}>
        <div className='w-25px h-25px radius-50 bg-light-primary d-flex flex-center shadow-xs'>
          <i className={`fas fa-${icon} text-primary fs-14px`} />
        </div>
      </div>
    </div>
  )
}

const Index: FC<any> = ({ params }) => {
  const router = useRouter()
  const thisParams: any = use(params)
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const { page = 1, limit = 5 } = queryParams
  const classType = thisParams?.class

  const [tmpDetail, setTmpDetail] = useState<any>()
  // MODALS
  const [showModalView, setShowModalView] = useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

  const dataClassQueryParams: any = {
    service_id: classType,
    q: queryParams?.q || '',
    page,
    limit,
  }

  const dataClass: any = ['Ransomware', 'E-Certificate', 'Data Protection', 'Smart Security']
  const pageIsLoading: any = false

  return (
    <div className='content'>
      <title>{`Kelas ${toCapitalize(classType === 'studio' ? 'Studio' : classType === 'functional' ? 'Fungsional' : 'Studio')}`}</title>
      <Filter />
      <div className='d-flex align-items-center gap-8px fs-16px fw-500 my-10px'>
        {isDev && (
          <div
            className='btn btn-sm btn-dark m-0 py-1 px-3 ms-auto'
            onClick={() => {
              queryClient.resetQueries({ queryKey: ['getClass'] })
            }}>
            Clear Cache
          </div>
        )}
      </div>
      <div className='row m-0'>
        {dataClass?.map((title, index: number) => (
          <div key={index} className='col-xl-4 col-md-3 col'>
            <div className='card-2 py-10px px-15px radius-15 user-select-none my-10px bg-white'>
              <div className='fw-bolder fs-20px mb-5px'>{title}</div>
              <div className='fs-14px text-truncate-3'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </div>
              <div className='d-flex align-items-center justify-content-end gap-10px mt-10px'>
                <Tooltip placement='top' title='Lihat kelas'>
                  <div
                    className='btn btn-light-primary btn-flex flex-center p-0 w-30px h-30px radius-50'
                    onClick={(e) => {
                      e.stopPropagation()
                      setTmpDetail({})
                      setShowModalView(true)
                    }}>
                    <div className='fas fa-eye' />
                  </div>
                </Tooltip>
                <Tooltip placement='top' title='Edit kelas'>
                  <div
                    className='btn btn-light-warning btn-flex flex-center p-0 w-30px h-30px radius-50'
                    onClick={(e) => {
                      router.push(`${APP_ADMIN_PATH}/product/xxx/detail`)
                    }}>
                    <div className='fas fa-pen-alt' />
                  </div>
                </Tooltip>
                <Tooltip placement='auto' title='Hapus kelas'>
                  <div
                    className='btn btn-light-danger btn-flex flex-center p-0 w-30px h-30px radius-50'
                    onClick={(e) => {
                      e.stopPropagation()
                      setTmpDetail({})
                      setShowModalDelete(true)
                    }}>
                    <div className='fas fa-trash-alt' />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal View Class */}
      <ModalView show={showModalView} setShow={setShowModalView} detail={tmpDetail} />

      {/* Modal Delete Class */}
      <ModalDelete
        show={showModalDelete}
        setShow={setShowModalDelete}
        detail={tmpDetail}
        queryKey={['getClass', { dataClassQueryParams }]}
      />
    </div>
  )
}

export default Index
