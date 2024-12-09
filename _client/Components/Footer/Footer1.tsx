import { APP_EMAIL, APP_NAME } from '@helpers'
import Link from 'next/link'

const Footer1 = () => {
  return (
    <div className='footer1 _relative'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 col-md-6 col-12'>
            <div className='single-footer-items footer-logo-area'>
              <div className='footer-logo'>
                <a href=''>
                  <img src='/assets/img/logo/footer-logo1.png' alt='' />
                </a>
              </div>
              <div className='space20'></div>
              <div className='heading1'>
                <p>
                  At {APP_NAME} Solutions, we are dedicated to delivering innovative technology
                  solutions tailored to meet the unique needs of businesses like yours.{' '}
                </p>
              </div>
              <ul className='social-icon'>
                <li>
                  <a href='#'>
                    <i className='bi bi-linkedin'></i>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <i className='bi bi-twitter'></i>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <i className='bi bi-youtube'></i>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <i className='bi bi-instagram'></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='col-lg col-md-6 col-12'>
            <div className='single-footer-items'>
              <h3>Service We Offer</h3>

              <ul className='menu-list'>
                <li>
                  <Link href='/service/service-details'>Cloud Computing Solution</Link>
                </li>
                <li>
                  <Link href='/service/service-details'>Cybersecurity & Compliance</Link>
                </li>
                <li>
                  <Link href='/service/service-details'>Software Development</Link>
                </li>
                <li>
                  <Link href='/service/service-details'>It Consulting & Support</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='col-lg col-md-6 col-12'>
            <div className='single-footer-items'>
              <h3>Useful Links</h3>

              <ul className='menu-list'>
                <li>
                  <Link href='/about'>About Us </Link>
                </li>
                <li>
                  <Link href='/service'>Our Services</Link>
                </li>
                <li>
                  <Link href='/blog'>Blog & News</Link>
                </li>
                <li>
                  <Link href='/project'>Project</Link>
                </li>
                <li>
                  <Link href='/contact'>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='col-lg-3 col-md-6 col-12'>
            <div className='single-footer-items'>
              <h3>Contact Us</h3>

              <div className='contact-box'>
                <div className='icon'>
                  <img src='/client/icons/footer1-icon1.png' alt='' />
                </div>
                <div className='pera'>
                  <a href='tel:0500222333'>0500 222 333</a>
                </div>
              </div>

              <div className='contact-box'>
                <div className='icon'>
                  <img src='/client/icons/footer1-icon2.png' alt='' />
                </div>
                <div className='pera'>
                  <a href='tel:0356588547'>03 5658 8547</a>
                </div>
              </div>

              <div className='contact-box'>
                <div className='icon'>
                  <img src='/client/icons/footer1-icon3.png' alt='' />
                </div>
                <div className='pera'>
                  <a href={`mailto:${APP_EMAIL}`}>{APP_EMAIL}</a>
                </div>
              </div>

              <div className='contact-box'>
                <div className='icon'>
                  <img src='/client/icons/footer1-icon4.png' alt='' />
                </div>
                <div className='pera'>
                  <a href={`mailto:${APP_EMAIL}`}>{APP_EMAIL}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='space40'></div>
      </div>

      <div className='copyright-area'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-5'>
              <div className='coppyright'>
                <p>Copyright @2024 {APP_NAME}. All Rights Reserved</p>
              </div>
            </div>
            <div className='col-md-7'>
              <div className='coppyright right-area'>
                <a href='#'>Terms & Conditions</a>
                <a href='#'>Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Footer1 }
