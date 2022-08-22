import React from 'react'
import { windowWidth } from '../../utils/windowWidth'


import MobileBuyerProfile from '../../components/mobileComponents/MobileBuyerProfile'
import DesktopBuyerLayouts from '../../components/DesktopComponent/reusable/DesktopBuyerLayout'
import DesktopBuyerProfile from '../../components/DesktopComponent/DesktopBuyerProfile'
import TabletBuyerLayouts from '../../components/TabletComponent/reusable/TabletBuyerLayout'

import TabletBuyerProfile from '../../components/TabletComponent/TabletBuyerProfile'

const Profile = () => {
  const window = windowWidth()


  return (
    <div>
{
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 && <TabletBuyerLayouts><TabletBuyerProfile /></TabletBuyerLayouts>
      } 
      {
        window?.innerWidth >= 1008 && <DesktopBuyerLayouts><DesktopBuyerProfile /></DesktopBuyerLayouts>
      }
      {
        window?.innerWidth < 640 && <MobileBuyerProfile />
      }

    </div>
  )
}

export default Profile