'use client'
import { getProduct } from '@api/product'
import { replaceHTMLEntity } from '@helpers'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

const Service6 = () => {
  const productQuery: any = useQuery({
    initialData: { data: [] },
    queryKey: ['getProduct'],
    queryFn: () => getProduct(),
    select: ({ data }: any) => {
      const res: any = data?.data || []
      return res
    },
  })

  const product: any = productQuery?.data || []

  return (
    <div className='servcie2 service-page-sec bg-white'>
      <div className='space50' />
      <div className='container'>
        <div className='row'>
          {product.map((item, i) => (
            <div key={i} className='col-lg-6 col-md-6'>
              <Link className='' href={`/product/${item?.id || '/'}`}>
                <div className='servcie2-box'>
                  <div className='icon'>
                    <img src='/client/icons/service-page-icon1.png' alt='' />
                  </div>
                  <div className='arrow'>
                    <i className='fas fa-arrow-right text-primary' />
                  </div>
                  <div className='heading1'>
                    <div className='fw-bolder fs-18px'>{item?.name}</div>
                    <div className='space10'></div>
                    <p className='text-truncate-3'>
                      {item?.description ? replaceHTMLEntity(item?.description) : ''}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className='space100' />
    </div>
  )
}

export default Service6
