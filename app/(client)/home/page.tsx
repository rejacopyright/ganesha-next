'use client'

import { getConfig } from '@api/settings'
import About4 from '@client/Components/About/About4'
import Blog5 from '@client/Components/Blog/Blog5'
import Brand1 from '@client/Components/Brand/Brand1'
// import Cta4 from '@client/Components/Cta/Cta4'
// import Faq2 from '@client/Components/Faq/Faq2'
import HeroBanner5 from '@client/Components/HeroBanner/HeroBanner5'
// import HowWork3 from '@client/Components/HowWork/HowWork3'
import Services4 from '@client/Components/Services/Services4'
import Team3 from '@client/Components/Team/Team3'
import { APP_NAME } from '@helpers'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

const Home: FC<any> = () => {
  const configQuery: any = useQuery({
    initialData: { data: {} },
    queryKey: ['getConfig'],
    queryFn: () => getConfig(),
    select: ({ data }: any) => data || {},
  })

  const config: any = configQuery?.data || {}

  return (
    <div className=''>
      <title>{APP_NAME}</title>
      <HeroBanner5
        subtitle='Our Integrated IT Solutions'
        title={config?.home_title || ''}
        content={config?.home_description || ''}
        btnone='Free Consultation'
        btnoneurl='/contact'
        btntwo='Discover More'
        btntwourl='/product/category'
        image1='/client/img/hero7-image.png'
        shape2='/client/img/hero7-shape1.png'
        shape3='/client/img/hero7-shape2.png'
        shape4='/client/img/hero7-shape3.png'
        shape5='/client/img/hero7-shape7.png'
      />
      <About4
        image1='/client/img/about4-img1.png'
        image2='/client/img/hero7-image.png'
        image3='/client/img/about4-img3.png'
        shape1='/client/img/about3-shape1.png'
        subTitle='About Us 👋'
        Title={config?.about_title || ''}
        content={config?.about_description || ''}
        expNum='25'
        expCon='Years Experience'
        featurelist={['Tech Solution', 'It Consulting', 'Cyber Security']}
        btnName='Read More'
        btnUrl='/about'
      />
      <Services4 />
      {/* <HowWork3 /> */}
      <Team3 />
      {/* <Faq2 /> */}
      <Brand1 />
      <Blog5 />
      {/* <Cta4 /> */}
    </div>
  )
}

export default Home
