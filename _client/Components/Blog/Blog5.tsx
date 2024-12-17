import { getBlog } from '@api/blog'
import { replaceHTMLEntity } from '@helpers'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import Link from 'next/link'

import SectionTitle3 from '../Common/SectionTitle3'

const Blog5 = () => {
  const blogQuery: any = useQuery({
    initialData: { data: {} },
    queryKey: ['getBlog', { page: 1, limit: 3 }],
    queryFn: () => getBlog({ page: 1, limit: 3 }),
    select: ({ data }: any) => data,
  })

  const dataBlog: any = blogQuery?.data?.data || []

  return (
    <div className='blog7 sp bg-white'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 m-auto text-center'>
            <div className='heading7'>
              <SectionTitle3
                SubTitle='Our Blog'
                Title='Explore Our <span>Solutions</span>'
                content="Whether you are looking to enhance productivity, improve efficiency, or stay ahead of technological advancements, we've got you covered."></SectionTitle3>
            </div>
          </div>
        </div>

        <div className='space20'></div>
        <div className='row'>
          {dataBlog?.map((item, key: number) => (
            <div
              key={key}
              className='col-lg-4 col-md-6'
              data-aos='zoom-in-up'
              data-aos-duration='700'>
              <div className='blog-box'>
                <div className='image image-anime'>
                  <div
                    className='w-100 h-200px'
                    style={{
                      background: `#fff url(${item?.image || '/media/placeholder/blank-image.svg'}) center / cover no-repeat`,
                      borderRadius: '15px 15px 0 0',
                    }}
                  />
                </div>
                <div className='tags-area'>
                  <a href='#' className='tag'>
                    <div className='d-flex flex-center gap-5px'>
                      <img src='/client/icons/blog-icon1.png' alt='' />
                      {item?.user?.full_name}
                    </div>
                  </a>
                  <a href='#' className='tag'>
                    <div className='d-flex flex-center gap-5px'>
                      <img src='/client/icons/blog-icon2.png' alt='' />
                      {moment(item?.updated_at).format('ddd, D MMM yyyy')}
                    </div>
                  </a>
                </div>
                <div className='heading7'>
                  <h4>
                    <Link href='/blog/blog-details'>
                      <div className='text-truncate-2'>{item?.title}</div>
                    </Link>
                  </h4>
                  <p className='text-truncate-2 mb-20px'>
                    {item?.description ? replaceHTMLEntity(item?.description) : ''}
                  </p>
                  <Link href='/blog/blog-details' className='learn'>
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
      </div>
    </div>
  )
}

export default Blog5
