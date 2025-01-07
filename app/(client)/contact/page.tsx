'use client'

import { getConfig } from '@api/settings'
import BreadCumb from '@client/Components/Common/BreadCumb'
import ContactInfo1 from '@client/Components/ContactInfo/ContactInfo1'
import Cta4 from '@client/Components/Cta/Cta4'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

const Index: FC<any> = () => {
  const configQuery: any = useQuery({
    initialData: { data: {} },
    queryKey: ['getConfig'],
    queryFn: () => getConfig(),
    select: ({ data }: any) => data || {},
  })

  const config: any = configQuery?.data || {}
  return (
    <div className='service-page'>
      <BreadCumb Title='Contact Us' />
      <ContactInfo1 config={config} />
      <Cta4 />
    </div>
  )
}

export default Index
