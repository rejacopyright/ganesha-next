'use client'

import { getDetailProduct } from '@api/product'
import BreadCumb from '@client/Components/Common/BreadCumb'
import TextEditor from '@components/form/TextEditor'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { FC } from 'react'

const Index: FC<any> = () => {
  const id: any = useParams()?.id

  const productQuery: any = useQuery({
    queryKey: ['getDetailProduct', id],
    queryFn: () => getDetailProduct(id),
    select: ({ data }) => data,
  })

  const product: any = productQuery?.data || {}

  return (
    <div className='service-page'>
      <BreadCumb Title={product?.name} />
      {/* <ProjectDetailsCenter1 /> */}
      <div className='service-details-area-all sp pt-50px bg-white'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8 m-auto'>
              <div className='service-details-post'>
                <article>
                  <div className='details-post-area'>
                    {/* <div className='image'>
                    <img src='/client/img/project-details-img1.png' alt='' />
                  </div> */}
                    <div className='space30'></div>
                    <div className='heading1'>
                      <h2>{product?.name}</h2>
                      <div className='space16'></div>
                      <div className='w-100'>
                        <TextEditor defaultData={product?.description || ''} disabled />
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
