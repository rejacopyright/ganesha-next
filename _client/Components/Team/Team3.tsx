import { getTeam } from '@api/team'
import { useQuery } from '@tanstack/react-query'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'

import SectionTitle3 from '../Common/SectionTitle3'

const Team3 = () => {
  const teamQuery: any = useQuery({
    initialData: { data: [] },
    queryKey: ['getTeam', { page: 1, limit: 3 }],
    queryFn: () => getTeam({ page: 1, limit: 3 }),
    select: ({ data }: any) => {
      const res: any = data?.data || []
      return res
    },
  })

  const team: any = teamQuery?.data || []

  return (
    <div className='team7 sp bg5'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 m-auto text-center'>
            <div className='heading7'>
              <SectionTitle3
                SubTitle='Our Team'
                Title='The Team Behind the <span>Solutions</span>'
                content=''></SectionTitle3>
            </div>
          </div>
        </div>
        <div className='space30'></div>
        <div className='row'>
          {team.map((item, i) => {
            const social = map(
              mapValues(item?.social, (value, key) => {
                return { brand: key, value }
              })
            )

            return (
              <div
                key={i}
                className='col-lg-4 col-md-6'
                data-aos='zoom-in-up'
                data-aos-duration='700'>
                <div className='team-box'>
                  <div className='image image-anime'>
                    <img src={item?.avatar || '/media/placeholder/avatar.svg'} alt='' />
                    <div className='hover-area'>
                      <ul>
                        {social?.map(({ brand, value }, socialKey: number) => (
                          <li key={socialKey}>
                            <a href={value || '#'} target='_blank'>
                              <i className={`bi bi-${brand}`}></i>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className='heading-area'>
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
  )
}

export default Team3
