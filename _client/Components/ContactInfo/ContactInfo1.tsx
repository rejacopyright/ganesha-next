import TextEditor from '@components/form/TextEditor'

const ContactInfo1 = ({ config }) => {
  return (
    <div>
      <div className='contact-page bg-white'>
        <div className='space100' />
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='contact-boxs'>
                <div className='heading1'>
                  <h2>Contact Information</h2>
                  <div className='space16'></div>
                  <p>
                    We Have grown up with the internet revolution, and we <br /> know how to deliver
                    on its
                  </p>
                </div>
                {config?.phone && (
                  <div className='contact-box col-auto'>
                    <div className='icon'>
                      <img src='/client/icons/contact-page-icon1.png' alt='' />
                    </div>
                    <div className='heading'>
                      <h5>Contact Us</h5>
                      <a href={`https://wa.me/${config?.phone}`} target='_blank' className='text'>
                        {config?.phone || ''}
                      </a>
                    </div>
                  </div>
                )}

                {config?.email && (
                  <div className='contact-box col-auto'>
                    <div className='icon'>
                      <img src='/client/icons/contact-page-icon2.png' alt='' />
                    </div>
                    <div className='heading'>
                      <h5>Send Us a Mail</h5>
                      <a href={`mailto:${config?.email}`} className='text'>
                        {config?.email || ''}
                      </a>
                    </div>
                  </div>
                )}

                {config?.address && (
                  <div className='contact-box'>
                    <div className='icon col-auto'>
                      <img src='/client/icons/contact-page-icon3.png' alt='' />
                    </div>
                    <div className='heading'>
                      <h5 className='fs-18px'>Office Location</h5>
                      {/* <a href={`tel:${config?.phone}`} className='text'>
                        {config?.address}
                      </a> */}
                      <div className='w-100 mt-10px'>
                        <TextEditor defaultData={config?.address || ''} disabled />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='col-lg-6'>
              <div className='contact-form-details'>
                <form action='#'>
                  <div className='row'>
                    <div className='col-lg-6'>
                      <div className='single-input'>
                        <input type='text' placeholder='First Name' />
                      </div>
                    </div>
                    <div className='col-lg-6'>
                      <div className='single-input'>
                        <input type='text' placeholder='Last Name' />
                      </div>
                    </div>

                    <div className='col-lg-6'>
                      <div className='single-input'>
                        <input type='email' placeholder='Email' />
                      </div>
                    </div>

                    <div className='col-lg-6'>
                      <div className='single-input'>
                        <input type='number' placeholder='Phone' />
                      </div>
                    </div>
                    <div className='col-lg-12'>
                      <div className='single-input'>
                        <input type='text' placeholder='Subject' />
                      </div>
                    </div>

                    <div className='col-lg-12'>
                      <div className='single-input'>
                        <textarea cols={30} rows={5} placeholder='Message'></textarea>
                      </div>
                    </div>

                    <div className='col-lg-12'>
                      <button className='theme-btn1'>
                        Submit{' '}
                        <span>
                          <i className='bi bi-arrow-right'></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='space100' />
      </div>

      <div className='space100'></div>

      <div className='contact-map-page'>
        <iframe
          src='https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=stp itb&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
          width='600'
          height='450'
          allowFullScreen
          loading='lazy'
        />
      </div>
    </div>
  )
}

export default ContactInfo1
