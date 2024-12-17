'use client'

import { getTeam } from '@api/team'
import BreadCumb from '@client/Components/Common/BreadCumb'
import { useQuery } from '@tanstack/react-query'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import { FC } from 'react'

const Index: FC<any> = () => {
  const teamQuery: any = useQuery({
    initialData: { data: [] },
    queryKey: ['getTeam'],
    queryFn: () => getTeam(),
    select: ({ data }: any) => {
      const res: any = data?.data || []
      return res
    },
  })

  const team: any = teamQuery?.data || []

  return (
    <div className='service-page'>
      <BreadCumb Title='Our Team' />
      <div className='team3 sp bg-white pt-20px'>
        <div className='container'>
          <div className='row'>
            {team.map((item, i) => {
              const social = map(
                mapValues(item?.social, (value, key) => {
                  return { brand: key, value }
                })
              )

              return (
                <div key={i} className='col-lg-3 col-md-6 my-20px'>
                  <div className='team-box' data-aos='zoom-in-up' data-aos-duration='1200'>
                    <div className='image-area'>
                      <div className='image image-anime'>
                        <img src={item?.avatar || '/media/placeholder/avatar.svg'} alt='' />
                      </div>
                      <div className='icon-area'>
                        <ul>
                          {social?.map((m, socialKey: number) => (
                            <li key={socialKey}>
                              <a href={m?.value || '#'} target='_blank'>
                                <i className={`bi bi-${m?.brand}`}></i>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className='space30'></div>
                    <div className='heading3'>
                      <h4>
                        <a href='#'>{item?.full_name}</a>
                      </h4>
                      <p>{item?.title}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
