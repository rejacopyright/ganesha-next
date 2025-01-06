'use client'

import { getDetailProductCategory, getProduct } from '@api/product'
import BreadCumb from '@client/Components/Common/BreadCumb'
import { TablePagination } from '@components/table/pagination'
import { replaceHTMLEntity } from '@helpers'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { parse, stringify } from 'qs'
import { FC } from 'react'

const Index: FC<any> = () => {
  const router = useRouter()
  const pathname = usePathname()
  const id: any = useParams()?.id
  const searchParams = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const { page = '1', limit = '9' } = queryParams

  const productCategoryQuery: any = useQuery({
    queryKey: ['getDetailProductCategory', id],
    queryFn: () => getDetailProductCategory(id),
    select: ({ data }) => data,
  })

  const productCategory: any = productCategoryQuery?.data || {}

  const dataProductQueryParams: any = {
    q: queryParams?.q || '',
    page,
    limit,
    category_id: id,
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

  const addOrEditParams = (queries: { [key: string]: any }) => {
    const resParams = stringify({ ...queryParams, ...queries }, { encode: false })
    router.replace(`${pathname}?${resParams}`)
  }

  return (
    <div className='service-page'>
      <title>{productCategory?.name}</title>
      <BreadCumb Title={productCategory?.name} />
      {/* <ProjectDetailsCenter1 /> */}
      <div className='service-details-area-all sp pt-50px bg-white'>
        <div className='container'>
          <div className='row'>
            {dataProduct?.map((item, key: number) => (
              <div key={key} className='col-lg-4 my-5px'>
                <div
                  className='blog-box border radius-10 p-10px'
                  data-aos='zoom-in-up'
                  data-aos-duration='1100'>
                  <div
                    className={`d-flex ${item?.description ? '' : 'align-items-center'}  gap-10px`}>
                    <div
                      className='col-auto w-50px h-50px radius-10 border'
                      style={{
                        background: `#fff url(${item?.image || '/media/placeholder/blank-image.svg'}) center / cover no-repeat`,
                      }}
                    />
                    <div className='col'>
                      <div className='fw-bolder'>{item?.name}</div>
                      <div className='text-truncate-2 h-35px mb-10px'>
                        {item?.description ? replaceHTMLEntity(item?.description) : ''}
                      </div>
                    </div>
                  </div>
                  <div className='mt-10px text-end'>
                    <Link href={`/product/detail/${item?.id}`} className='learn'>
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
      {dataProductTotal > limit && (
        <div className='container my-30px position-sticky bottom-0'>
          <div className='row'>
            <div className='col-12'>
              <div className='border bg-white radius-10 px-16px'>
                <TablePagination
                  limit={limit}
                  showLimit={false}
                  showCount={true}
                  page={page}
                  total={dataProductTotal}
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
