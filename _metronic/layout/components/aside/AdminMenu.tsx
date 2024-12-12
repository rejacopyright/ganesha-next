import { APP_ADMIN_PATH, translate } from '@helpers'
import { FC } from 'react'

import { AsideMenuItem } from './AsideMenuItem'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'

const Index: FC<any> = () => {
  return (
    <>
      <AsideMenuItem
        to={`${APP_ADMIN_PATH}/dashboard`}
        icon='/media/icons/art/art002.svg'
        // title={translate('MENU.DASHBOARD')}
        title='Dashboard'
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            {translate('MENU.MAIN')}
          </span>
        </div>
      </div>
      <AsideMenuItem
        to={`${APP_ADMIN_PATH}/product`}
        icon='/media/icons/general/gen056.svg'
        title='Product'
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to={`${APP_ADMIN_PATH}/team`}
        icon='/media/icons/communication/com006.svg'
        title='Team'
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to={`${APP_ADMIN_PATH}/blog`}
        icon='/media/icons/general/gen006.svg'
        title='Blog'
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to={`${APP_ADMIN_PATH}/about`}
        icon='/media/icons/general/gen045.svg'
        title='About Us'
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItemWithSub
        to={`${APP_ADMIN_PATH}/settings`}
        title='Settings'
        fontIcon='bi-chat-left'
        icon='/media/icons/coding/cod009.svg'>
        <AsideMenuItem to={`${APP_ADMIN_PATH}/settings/tags`} title='Tags' hasBullet />
      </AsideMenuItemWithSub>
    </>
  )
}

export default Index
