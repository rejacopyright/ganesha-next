'use client'

import BreadCumb from '@client/Components/Common/BreadCumb'
import { useParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import data from '@client/Data/servicePage.json'
import ProjectDetailsCenter1 from '@client/Components/ProjectDetails/ProjectDetailsCenter1'
import dynamic from 'next/dynamic'

const Ransomware = dynamic(() => import('./_static/ransomware'))
const Ecert = dynamic(() => import('./_static/ecert'))
const SmartSecurity = dynamic(() => import('./_static/smartSecurity'))
const DataProtection = dynamic(() => import('./_static/dataProtection'))

const Index: FC<any> = () => {
  const params = useParams()?.product
  const detail = data?.find(({ name }: any) => name === params)
  const [element, setElement] = useState(<Ransomware />)

  useEffect(() => {
    console.log(params, 'oke')
    switch (params) {
      case 'ransomware':
        setElement(<Ransomware />)
        break
      case 'ecert':
        setElement(<Ecert />)
        break
      case 'smart-security':
        setElement(<SmartSecurity />)
        break
      case 'data-protection':
        setElement(<DataProtection />)
        break

      default:
        break
    }
  }, [params])

  return (
    <div className='service-page'>
      <BreadCumb Title={detail?.title} />
      {/* <ProjectDetailsCenter1 /> */}
      {element}
    </div>
  )
}

export default Index
