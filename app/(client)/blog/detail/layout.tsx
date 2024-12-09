'use client'

import BreadCumb from '@client/Components/Common/BreadCumb'
import { FC } from 'react'

const Index: FC<any> = ({ children }) => {
  return (
    <div className='service-page'>
      <BreadCumb Title='Blog Title' />
      {/* <ProjectDetailsCenter1 /> */}
      {children}
    </div>
  )
}

export default Index
