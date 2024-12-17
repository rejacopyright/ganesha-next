'use client'
import { getProduct } from '@api/product'
import { replaceHTMLEntity } from '@helpers'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import SectionTitle2 from '../Common/SectionTitle2'

const Services4 = () => {
  const productQuery: any = useQuery({
    initialData: { data: [] },
    queryKey: ['getProduct', { page: 1, limit: 4 }],
    queryFn: () => getProduct({ page: 1, limit: 4 }),
    select: ({ data }: any) => {
      const res: any = data?.data || []
      return res
    },
  })

  const product: any = productQuery?.data || []
  return (
    <div className='service4 sp bg-white'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 m-auto text-center'>
            <div className='heading4'>
              <SectionTitle2 SubTitle='Our Products 👋' Title='Our Products'></SectionTitle2>
            </div>
          </div>
        </div>

        <div className='space30'></div>
        <div className='row'>
          {product.map((item, key: number) => (
            <div
              key={key}
              className='col-lg-3 col-md-6'
              data-aos='zoom-in-up'
              data-aos-duration='800'>
              <div className='service4-box bg-white'>
                <div className='icon'>
                  <img src={`/client/icons/service4-icon${key + 1}.png`} alt='' />
                </div>
                <div className='heading4'>
                  <h4>
                    <Link href={item?.id ? `product/${item?.id}` : '#'}>{item?.name}</Link>
                  </h4>
                  <div className='space16'></div>
                  <p className='text-truncate-3'>
                    {item?.description ? replaceHTMLEntity(item?.description) : ''}
                  </p>
                  <div className='space16'></div>
                  <Link href={item?.id ? `product/${item?.id}` : '#'} className='learn-btn'>
                    Read More
                    <span>
                      <i className='bi bi-arrow-right'></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='space40'></div>
        <div className='row'>
          <div className='col-lg-12 text-center'>
            <div className='' data-aos='zoom-in-up' data-aos-duration='700'>
              <Link className='theme-btn5' href='/product'>
                More Services
                <span>
                  <i className='fas fa-arrow-right text-primary' />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services4
