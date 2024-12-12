'use client'
import { getTag } from '@api/settings'
import Table from '@components/table'
import Tooltip from '@components/tooltip'
import { isDev } from '@helpers'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC, useState } from 'react'

import { Filter } from './_parts/Filter'
import ModalCreate from './_parts/ModalCreate'
import ModalDelete from './_parts/ModalDelete'

const Index: FC<any> = () => {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const { page = 1, limit = 5 } = queryParams

  const [tmpDetail, setTmpDetail] = useState<any>()
  // MODALS
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

  const dataTagQueryParams: any = {
    q: queryParams?.q || '',
    page,
    limit,
  }

  const dataTagQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getTag', { dataTagQueryParams }],
    queryFn: () => getTag(dataTagQueryParams),
    select: ({ data }: any) => {
      const res: any = data || {}
      return res
    },
  })
  const dataTag: any = dataTagQuery?.data?.data || []
  const dataTagTotal = dataTagQuery?.data?.total || 0
  const pageIsLoading: any = !dataTagQuery?.isFetched

  return (
    <div className='content'>
      <title>Tags</title>
      <Filter
        onClickAdd={() => {
          setTmpDetail(undefined)
          setShowModalCreate(true)
        }}
      />
      <div className='row'>
        <div className='col-lg-6 offset-lg-3'>
          <div className='d-flex align-items-center gap-8px fs-16px fw-500 my-10px'>
            <div className='fs-12px'>Total</div>
            <div className='fs-12px'>:</div>
            <div className='fw-700 text-primary'>{dataTagTotal}</div>
            {isDev && (
              <div
                className='btn btn-sm btn-dark m-0 py-1 px-3 ms-auto'
                onClick={() => {
                  queryClient.resetQueries({ queryKey: ['getTag'] })
                }}>
                Clear Cache
              </div>
            )}
          </div>
          <div className='bg-white shadow-xs mb-50px w-100'>
            <Table
              loading={pageIsLoading}
              stickyHeader
              data={dataTag}
              pagination
              total={dataTagTotal}
              columnClasses={{}}
              headers={[
                { value: 'name', label: 'Tag Name', className: 'text-start', sort: false },
                { value: 'actions', label: '', className: 'text-center', width: 0, sort: false },
              ]}
              tdClass='px-20px py-10px fs-13px'
              render={(_e: any, _original: any) => ({
                actions: () => {
                  return (
                    <div className='d-flex flex-center gap-10px'>
                      <Tooltip placement='top' title='Edit Tag'>
                        <div
                          className='btn btn-light-warning btn-flex flex-center p-0 w-30px h-30px radius-50'
                          onClick={() => {
                            setTmpDetail(_original)
                            setShowModalCreate(true)
                          }}>
                          <div className='fas fa-pen-alt' />
                        </div>
                      </Tooltip>
                      <Tooltip placement='auto' title='Delete Tag'>
                        <div
                          className='btn btn-light-danger btn-flex flex-center p-0 w-30px h-30px radius-50'
                          onClick={() => {
                            setTmpDetail(_original)
                            setShowModalDelete(true)
                          }}>
                          <div className='fas fa-trash-alt' />
                        </div>
                      </Tooltip>
                    </div>
                  )
                },
              })}
            />
          </div>
        </div>
      </div>

      {/* Modal Create Tag */}
      <ModalCreate
        show={showModalCreate}
        setShow={setShowModalCreate}
        detail={tmpDetail}
        queryKey={['getTag', { dataTagQueryParams }]}
      />
      {/* Modal Delete Tag */}
      <ModalDelete
        show={showModalDelete}
        setShow={setShowModalDelete}
        detail={tmpDetail}
        queryKey={['getTag', { dataTagQueryParams }]}
      />
    </div>
  )
}

export default Index
