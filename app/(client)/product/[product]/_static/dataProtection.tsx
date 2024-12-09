import Link from 'next/link'
import { FC } from 'react'

const Index: FC<any> = () => {
  const productsCard = [
    'Right Management System (RMS)',
    'Data Loss Prevention (DLP)',
    'Intelligent CCTV',
  ]
  return (
    <div className='service-details-area-all sp pt-50px'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 m-auto'>
            <div className='service-details-post'>
              <article>
                <div className='details-post-area'>
                  <div className='heading1'>
                    <h2>Data Protection</h2>
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

              <div className='space50'></div>

              <article>
                <div className='details-post-area'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <div className='heading1'>
                        <h5>The Products</h5>
                        <div className='space16'></div>
                        <div className='row'>
                          {productsCard.map((name: any, index: number) => (
                            <div key={index} className='col-lg-6 col-md-6'>
                              <div className='project-details-box heading1 bg-white'>
                                <h4>
                                  <Link href='#'>{name}</Link>
                                </h4>
                                <div className='space16'></div>
                                <p>
                                  Streamline business processes and workflows, reducing manual
                                  effort and improving productivity.
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
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
