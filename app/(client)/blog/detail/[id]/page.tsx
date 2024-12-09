import { APP_NAME } from '@helpers'
import { FC } from 'react'

const Index: FC<any> = () => {
  return (
    <div className='service-details-area-all sp'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 m-auto'>
            <div className='service-details-post'>
              <article>
                <div className='details-post-area'>
                  <div className='image'>
                    <img src='/client/img/project-details-img1.png' alt='' />
                  </div>
                  <div className='social-users'>
                    <ul>
                      <li>
                        <a href='#'>
                          <img src='/client/icons/user-icon1.png' alt='' /> John William
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <img src='/client/icons/user-icon2.png' alt='' /> Feb 25, 24
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <img src='/client/icons/user-icon3.png' alt='' /> Cyber Security
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <img src='/client/icons/user-icon4.png' alt='' /> 03 Comments
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className='space30'></div>
                  <div className='heading1'>
                    <h2>Protecting Your Business in the Digital Age of Cyber Security</h2>
                    <div className='space16'></div>
                    <p>
                      In todays interconnected world, cybersecurity has become a critical concern
                      for businesses of all sizes. With cyber threats evolving rapidly and the
                      increasing reliance on digital technology, the importance of cybersecurity
                      cannot be overstated. In this blog post, we will delve into why cybersecurity
                      is essential for protecting your business in the digital age.
                    </p>
                  </div>
                </div>
              </article>

              <div className='space50'></div>
              <article>
                <div className='details-post-area'>
                  <div className='heading1'>
                    <h5>Preventing Cyber Attacks</h5>
                    <div className='space16'></div>
                    <p>
                      Cyber attacks come in many forms, from phishing scams and malware infections
                      to ransomware attacks and DDoS (Distributed Denial of Service) attacks. These
                      attacks can have devastating consequences for businesses, ranging from
                      financial losses and reputational damage to legal liabilities. By investing in
                      cybersecurity measures such as firewalls, intrusion detection systems, and
                      security awareness training, businesses can reduce their susceptibility to
                      cyber attacks and the impact of security incidents.
                    </p>
                  </div>

                  <div className='space40'></div>
                  <div className='heading1'>
                    <h5>Ensuring Business Continuity</h5>
                    <div className='space16'></div>
                    <p>
                      In addition to protecting against external threats, cybersecurity also plays a
                      crucial role in ensuring business continuity. In the event of a cyber attack
                      or data breach, systems may be disrupted, data may be lost or corrupted, and
                      downtime can result in significant financial losses. By implementing measures
                      such as regular data backups, disaster recovery plans, and incident response
                      protocols, businesses can minimize the impact of cyber incidents and maintain
                      continuity of operations, even in the face adversity.
                    </p>
                  </div>
                </div>
              </article>

              <div className='space50'></div>

              <article>
                <div className='details-post-area'>
                  <div className='video-area-image'>
                    <div className='image'>
                      <img src='/assets/img/blog-post-video-img.png' alt='' />
                    </div>
                  </div>

                  <div className='space30'></div>
                  <div className='heading1'>
                    <h5>Maintaining Regulatory Compliance</h5>
                    <div className='space20'></div>
                    <p>
                      Furthermore, cybersecurity is essential for maintaining compliance with
                      various regulations and industry standards governing data privacy and
                      security. Non-compliance can result in significant fines, legal penalties, and
                      reputational damage to businesses. By implementing security controls and
                      adhering to regulations such as GDPR, HIPAA, and PCI-DSS, businesses can
                      mitigate the risk of regulatory violations and demonstrate their commitment to
                      protecting customer data and privacy.
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
