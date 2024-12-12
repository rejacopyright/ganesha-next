'use client'
import { getTeam } from '@api/team'
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
  const { page = 1, limit = 5 } = queryParams

  const [tmpDetail, setTmpDetail] = useState<any>()
  // MODALS
  const [showModalView, setShowModalView] = useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

  const dataTeamQueryParams: any = {
    q: queryParams?.q || '',
    page,
    limit,
  }

  const dataTeamQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getTeam', { dataTeamQueryParams }],
    queryFn: () => getTeam(dataTeamQueryParams),
    select: ({ data }: any) => {
      const res: any = data || {}
      return res
    },
  })
  const dataTeam: any = dataTeamQuery?.data?.data || []

  return (
    <div className='content'>
      <title>Team</title>
      <Filter />
      <div className='d-flex align-items-center gap-8px fs-16px fw-500 my-10px'>
        {isDev && (
          <div
            className='btn btn-sm btn-dark m-0 py-1 px-3 ms-auto'
            onClick={() => {
              queryClient.resetQueries({ queryKey: ['getTeam'] })
            }}>
            Clear Cache
          </div>
        )}
      </div>
      <div className='row m-0'>
        {dataTeam?.map((item, index: number) => (
          <div key={index} className='col-xl-4 col-md-3 col'>
            <div className='card-2 radius-15 user-select-none my-10px bg-white'>
              <div
                className='w-100 h-250px'
                style={{
                  background: `#fff url(${item?.avatar || '/media/placeholder/avatar.svg'}) center / cover no-repeat`,
                  borderRadius: '15px 15px 0 0',
                }}
              />
              <div className='py-10px px-15px'>
                <div className='fw-bolder fs-20px mb-5px'>{item?.full_name}</div>
                <div className='fs-14px text-truncate-3'>{item?.title || ''}</div>
                <div className='d-flex align-items-center justify-content-end gap-10px mt-10px'>
                  <Tooltip placement='top' title='View Team'>
                    <div
                      className='btn btn-light-primary btn-flex flex-center p-0 w-30px h-30px radius-50'
                      onClick={(e) => {
                        e.stopPropagation()
                        setTmpDetail(item)
                        setShowModalView(true)
                      }}>
                      <div className='fas fa-eye' />
                    </div>
                  </Tooltip>
                  <Tooltip placement='top' title='Edit Team'>
                    <div
                      className='btn btn-light-warning btn-flex flex-center p-0 w-30px h-30px radius-50'
                      onClick={() => {
                        router.push(`${APP_ADMIN_PATH}/team/create?id=${item?.id}`)
                      }}>
                      <div className='fas fa-pen-alt' />
                    </div>
                  </Tooltip>
                  <Tooltip placement='auto' title='Delete Team'>
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

      {/* Modal View Team */}
      <ModalView show={showModalView} setShow={setShowModalView} detail={tmpDetail} />

      {/* Modal Delete Team */}
      <ModalDelete
        show={showModalDelete}
        setShow={setShowModalDelete}
        detail={tmpDetail}
        queryKey={['getTeam', { dataTeamQueryParams }]}
      />
    </div>
  )
}

export default Index
