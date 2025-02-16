'use client'

import { getConfig } from '@api/settings'
import BreadCumb from '@client/Components/Common/BreadCumb'
import Vission1 from '@client/Components/Mission/Vission1'
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
      <BreadCumb Title='About Us' />
      <Vission1 title={config?.about_title || ''} description={config?.about_description || ''} />
    </div>
  )
}

export default Index
