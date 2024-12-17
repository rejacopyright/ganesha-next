'use client'

import { getBlog } from '@api/blog'
import BreadCumb from '@client/Components/Common/BreadCumb'
import { TablePagination } from '@components/table/pagination'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { parse, stringify } from 'qs'
import { FC } from 'react'

const Index: FC<any> = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const { page = 1, limit = 9 }: any = queryParams

  const dataBlogQueryParams: any = {
    q: queryParams?.q || '',
    page,
    limit,
  }

  const blogQuery: any = useQuery({
    initialData: { data: {} },
    queryKey: ['getBlog', dataBlogQueryParams],
    queryFn: () => getBlog(dataBlogQueryParams),
    select: ({ data }: any) => data,
  })

  const dataBlog: any = blogQuery?.data?.data || []
  const dataBlogTotal = blogQuery?.data?.total || 0

  const addOrEditParams = (queries: { [key: string]: any }) => {
    const resParams = stringify({ ...queryParams, ...queries }, { encode: false })
    router.replace(`${pathname}?${resParams}`)
  }

  return (
    <div className='service-page'>
      <BreadCumb Title='Blog' />
      <div className='blog sp pt-50px pb-20px'>
        <div className='container'>
          <div className='row'>
            {dataBlog?.map((item, key: number) => (
              <div key={key} className='col-lg-4'>
                <div className='blog-box' data-aos='zoom-in-up' data-aos-duration='1100'>
                  <div className='image image-anime'>
                    <div
                      className='w-100 h-150px'
                      style={{
                        background: `#fff url(${item?.image || '/media/placeholder/blank-image.svg'}) center / contain no-repeat`,
                        borderRadius: '15px 15px 0 0',
                      }}
                    />
                  </div>
                  <div className='heading'>
                    <div className='d-flex gap-20px'>
                      <div className='d-flex flex-center gap-5px'>
                        <img src='/client/icons/blog-icon1.png' alt='' />
                        {item?.user?.full_name}
                      </div>
                      <div className='d-flex flex-center gap-5px'>
                        <img src='/client/icons/blog-icon2.png' alt='' />
                        {moment(item?.updated_at).format('ddd, D MMM yyyy')}
                      </div>
                    </div>
                    <h4>
                      <Link href={`/blog/detail/${item?.id}`}>
                        <div className='text-truncate-2'>{item?.title}</div>
                      </Link>
                    </h4>
                    <Link href={`/blog/detail/${item?.id}`} className='learn'>
                      Read More
                      <span className='ms-3'>
                        <i className='fa fa-long-arrow-right' aria-hidden='true' />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {dataBlogTotal > limit && (
        <div className='container my-30px position-sticky bottom-0'>
          <div className='row'>
            <div className='col-12'>
              <div className='border bg-white radius-10 px-16px'>
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
    </div>
  )
}

export default Index
