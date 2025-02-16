'use client'
import { getBlog } from '@api/blog'
import { TablePagination } from '@components/table/pagination'
import Tooltip from '@components/tooltip'
import { APP_ADMIN_PATH, isDev, replaceHTMLEntity } from '@helpers'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { parse, stringify } from 'qs'
import { FC, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

import { Filter } from './_parts/Filter'
import ModalDelete from './_parts/ModalDelete'
import ModalView from './_parts/ModalView'

const Index: FC<any> = () => {
  const user: any = useSelector(({ user }: any) => user?.admin, shallowEqual)
  const router = useRouter()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const { page = 1, limit = 9 }: any = queryParams

  const [tmpDetail, setTmpDetail] = useState<any>()
  // MODALS
  const [showModalView, setShowModalView] = useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

  const dataBlogQueryParams: any = {
    user_id: user?.id || '',
    q: queryParams?.q || '',
    page,
    limit,
  }

  const dataBlogQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getBlog', dataBlogQueryParams],
    queryFn: () => getBlog(dataBlogQueryParams),
    select: ({ data }: any) => {
      const res: any = data || {}
      return res
    },
  })
  const dataBlog: any = dataBlogQuery?.data?.data || []
  const dataBlogTotal = dataBlogQuery?.data?.total || 0
  const _pageIsLoading: any = !dataBlogQuery?.isFetched

  const addOrEditParams = (queries: { [key: string]: any }) => {
    const resParams = stringify({ ...queryParams, ...queries }, { encode: false })
    router.replace(`${pathname}?${resParams}`)
  }

  return (
    <div className='content'>
      <title>Blog</title>
      <Filter />
      <div className='d-flex align-items-center gap-8px fs-16px fw-500 my-10px'>
        {isDev && (
          <div
            className='btn btn-sm btn-dark m-0 py-1 px-3 ms-auto'
            onClick={() => {
              queryClient.resetQueries({ queryKey: ['getBlog'] })
            }}>
            Clear Cache
          </div>
        )}
      </div>
      <div className='row m-0'>
        {dataBlog?.map((item, index: number) => (
          <div key={index} className='col-xl-4 col-md-3 col'>
            <div className='card-2 radius-15 user-select-none my-10px bg-white'>
              <div
                className='w-100 h-150px'
                style={{
                  background: `#fff url(${item?.image || '/media/placeholder/blank-image.svg'}) center / cover no-repeat`,
                  borderRadius: '15px 15px 0 0',
                }}
              />
              <div className='py-10px px-15px'>
                <div className='fw-bolder fs-20px mb-5px'>{item?.title}</div>
                <div className='fs-14px text-truncate-3'>
                  {item?.description ? replaceHTMLEntity(item?.description) : ''}
                </div>
                <div className='d-flex align-items-center justify-content-end gap-10px mt-10px'>
                  <Tooltip placement='top' title='View Blog'>
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
                  <Tooltip placement='top' title='Edit Blog'>
                    <div
                      className='btn btn-light-warning btn-flex flex-center p-0 w-30px h-30px radius-50'
                      onClick={() => {
                        router.push(`${APP_ADMIN_PATH}/blog/create?id=${item?.id}`)
                      }}>
                      <div className='fas fa-pen-alt' />
                    </div>
                  </Tooltip>
                  <Tooltip placement='auto' title='Delete Blog'>
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
          </div>
        ))}
      </div>
      {dataBlogTotal > limit && (
        <div className='my-30px text-end position-sticky bottom-0 border bg-white radius-10 px-16px'>
          <div className='row'>
            <div className='col-12'>
              <div className=''>
                <TablePagination
                  limit={limit}
                  showLimit={false}
                  showCount={true}
                  page={page}
                  total={dataBlogTotal}
                  onChangeLimit={() => ''}
                  onChangePage={(e: any) => addOrEditParams({ page: e })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal View Blog */}
      <ModalView show={showModalView} setShow={setShowModalView} detail={tmpDetail} />

      {/* Modal Delete Blog */}
      <ModalDelete
        show={showModalDelete}
        setShow={setShowModalDelete}
        detail={tmpDetail}
        queryKey={['getBlog', dataBlogQueryParams]}
      />
    </div>
  )
}

export default Index
