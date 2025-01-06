'use client'
import { getProduct } from '@api/product'
import Table from '@components/table'
import Tooltip from '@components/tooltip'
import { APP_ADMIN_PATH, isDev } from '@helpers'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC, useState } from 'react'

import { Filter } from './_parts/Filter'
import ModalDelete from './_parts/ModalDelete'
import ModalView from './_parts/ModalView'

const Index: FC<any> = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const { page = '1', limit = '5', category_id = '' } = queryParams

  const [tmpDetail, setTmpDetail] = useState<any>()
  // MODALS
  const [showModalView, setShowModalView] = useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

  const dataProductQueryParams: any = {
    q: queryParams?.q || '',
    page,
    limit,
    category_id,
  }

  const dataProductQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getProduct', dataProductQueryParams],
    queryFn: () => getProduct(dataProductQueryParams),
    select: ({ data }: any) => {
      const res: any = data || {}
      return res
    },
  })
  const dataProduct: any = dataProductQuery?.data?.data || []
  const dataProductTotal = dataProductQuery?.data?.total || 0
  const pageIsLoading: any = !dataProductQuery?.isFetched

  return (
    <div className='content'>
      <title>Product</title>
      <Filter
        onClickAdd={() => {
          router.push(`${APP_ADMIN_PATH}/product/create`)
        }}
      />
      <div className='d-flex align-items-center gap-8px fs-16px fw-500 my-10px'>
        <div className='fs-12px'>Total</div>
        <div className='fs-12px'>:</div>
        <div className='fw-700 text-primary'>{dataProductTotal}</div>
        {isDev && (
          <div
            className='btn btn-sm btn-dark m-0 py-1 px-3 ms-auto'
            onClick={() => {
              queryClient.resetQueries({ queryKey: ['getProduct'] })
            }}>
            Clear Cache
          </div>
        )}
      </div>
      <div className='bg-white shadow-xs mb-50px'>
        <Table
          loading={pageIsLoading}
          stickyHeader
          data={dataProduct}
          pagination
          total={dataProductTotal}
          // select={true}
          // onSelect={() => ''}
          columnClasses={{ image: 'text-center' }}
          headers={[
            { value: 'image', label: '#', className: 'text-center', width: 0, sort: false },
            { value: 'name', label: 'Product Name', sort: false },
            { value: 'category', label: 'Category', sort: false },
            { value: 'actions', label: '', className: 'text-center', width: 0, sort: false },
          ]}
          tdClass='px-20px py-10px fs-13px'
          render={(e: any, _original: any) => {
            return {
              image: (
                <div
                  className='w-50px h-50px radius-10 border'
                  style={{
                    background: `#fff url(${e || '/media/placeholder/blank-image.svg'}) center / cover no-repeat`,
                  }}
                />
              ),
              category: <div className=''>{e?.name || '-'}</div>,
              actions: () => {
                return (
                  <div className='d-flex flex-center gap-10px'>
                    <Tooltip placement='top' title='Lihat detail kelas'>
                      <button
                        type='button'
                        disabled={_original?.service_id === 1}
                        className='btn btn-light-primary btn-flex flex-center p-0 w-30px h-30px radius-50'
                        onClick={() => {
                          new Promise((resolve) => resolve(setTmpDetail(_original))).then(() =>
                            setShowModalView(true)
                          )
                        }}>
                        <div className='fas fa-eye' />
                      </button>
                    </Tooltip>
                    <Tooltip placement='top' title='Edit paket'>
                      <div
                        className='btn btn-light-warning btn-flex flex-center p-0 w-30px h-30px radius-50'
                        onClick={() => {
                          router.push(`${APP_ADMIN_PATH}/product/create?id=${_original?.id}`)
                        }}>
                        <div className='fas fa-pen-alt' />
                      </div>
                    </Tooltip>
                    <Tooltip placement='auto' title='Hapus paket'>
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
            }
          }}
        />
      </div>
      {/* Modal View */}
      <ModalView show={showModalView} setShow={setShowModalView} detail={tmpDetail} />
      {/* Modal Delete Item */}
      <ModalDelete
        show={showModalDelete}
        setShow={setShowModalDelete}
        detail={tmpDetail}
        queryKey={['getProduct', dataProductQueryParams]}
      />
    </div>
  )
}

export default Index
