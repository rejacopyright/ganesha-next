'use client'
import { getProductCategory } from '@api/product'
import Tooltip from '@components/tooltip'
import { APP_ADMIN_PATH, isDev, replaceHTMLEntity } from '@helpers'
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
  const { page = 1, limit = 5 } = queryParams

  const [tmpDetail, setTmpDetail] = useState<any>()
  // MODALS
  const [showModalView, setShowModalView] = useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

  const dataProductCategoryQueryParams: any = {
    q: queryParams?.q || '',
    page,
    limit,
  }

  const dataProductCategoryQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getProductCategory', { dataProductCategoryQueryParams }],
    queryFn: () => getProductCategory(dataProductCategoryQueryParams),
    select: ({ data }: any) => {
      const res: any = data || {}
      return res
    },
  })
  const dataProductCategory: any = dataProductCategoryQuery?.data?.data || []
  const _dataProductCategoryTotal = dataProductCategoryQuery?.data?.total || 0
  const _pageIsLoading: any = !dataProductCategoryQuery?.isFetched

  return (
    <div className='content'>
      <title>Product Category</title>
      <Filter />
      <div className='d-flex align-items-center gap-8px fs-16px fw-500 my-10px'>
        {isDev && (
          <div
            className='btn btn-sm btn-dark m-0 py-1 px-3 ms-auto'
            onClick={() => {
              queryClient.resetQueries({ queryKey: ['getProductCategory'] })
            }}>
            Clear Cache
          </div>
        )}
      </div>
      <div className='row m-0'>
        {dataProductCategory?.map((item, index: number) => (
          <div key={index} className='col-xl-4 col-md-3 col'>
            <div className='card-2 py-10px px-15px radius-15 user-select-none my-10px bg-white'>
              <div className='fw-bolder fs-16px mb-5px'>{item?.name ?? ''}</div>
              <div className='fs-14px text-truncate-3'>
                {item?.description ? replaceHTMLEntity(item?.description) : ''}
              </div>
              <div className='d-flex align-items-center justify-content-end gap-10px mt-10px'>
                <Tooltip placement='top' title='View Product Category'>
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
                <Tooltip placement='top' title='Edit Product Category'>
                  <div
                    className='btn btn-light-warning btn-flex flex-center p-0 w-30px h-30px radius-50'
                    onClick={() => {
                      router.push(`${APP_ADMIN_PATH}/product/category/create?id=${item?.id}`)
                    }}>
                    <div className='fas fa-pen-alt' />
                  </div>
                </Tooltip>
                <Tooltip placement='auto' title='Delete Product Category'>
                  <div
                    className='btn btn-light-danger btn-flex flex-center p-0 w-30px h-30px radius-50'
                    onClick={(e) => {
                      e.stopPropagation()
                      setTmpDetail(item)
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

      {/* Modal View Product Category */}
      <ModalView show={showModalView} setShow={setShowModalView} detail={tmpDetail} />

      {/* Modal Delete Product Category */}
      <ModalDelete
        show={showModalDelete}
        setShow={setShowModalDelete}
        detail={tmpDetail}
        queryKey={['getProductCategory', { dataProductCategoryQueryParams }]}
      />
    </div>
  )
}

export default Index
