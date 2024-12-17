'use client'
import { getDetailBlog } from '@api/blog'
import TextEditor from '@components/form/TextEditor'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { useParams } from 'next/navigation'
import { FC } from 'react'

const Index: FC<any> = () => {
  const { id }: any = useParams()
  const blogQuery: any = useQuery({
    initialData: { data: {} },
    queryKey: ['getDetailBlog', id],
    queryFn: () => getDetailBlog(id),
    select: ({ data }: any) => data,
  })

  const detailBlog: any = blogQuery?.data || {}
  return (
    <div className='service-details-area-all sp'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 m-auto'>
            <div className='service-details-post'>
              <article>
                <div className='details-post-area'>
                  <div className='image'>
                    <img src={detailBlog?.image || '/media/placeholder/blank-image.svg'} alt='' />
                  </div>
                  <div className='social-users'>
                    <div className='d-flex gap-20px'>
                      <div className='d-flex flex-center gap-5px'>
                        <img src='/client/icons/blog-icon1.png' alt='' />
                        {detailBlog?.user?.full_name}
                      </div>
                      <div className='d-flex flex-center gap-5px'>
                        <img src='/client/icons/blog-icon2.png' alt='' />
                        {moment(detailBlog?.updated_at).format('ddd, D MMM yyyy')}
                      </div>
                    </div>
                  </div>
                  <div className='space30'></div>
                  <div className='heading1'>
                    <h2>{detailBlog?.title}</h2>
                    <div className='space16'></div>
                    <div className='w-100'>
                      <TextEditor defaultData={detailBlog?.description || ''} disabled />
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
