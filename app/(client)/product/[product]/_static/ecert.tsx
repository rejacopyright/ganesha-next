import Link from 'next/link'
import { FC } from 'react'

const Index: FC<any> = () => {
  return (
    <div className='service-details-area-all sp pt-50px'>
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
                    <h2>E-Certficate</h2>
                    <div className='space16'></div>
                    <p className='text-dark'>
                      Enterprise Resource Planning (ERP) systems are powerful tools designed to
                      integrate and streamline various business processes, from finance and human
                      resources to supply chain management and customer relationship management. At
                      [Company Name], we specialize in ERP implementation, helping businesses of all
                      sizes optimize their operations, improve efficiency, and drive growth.
                    </p>
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
