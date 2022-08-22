import React from 'react'
import { windowWidth } from '../../utils/windowWidth'



import DesktopBuyerLayouts from '../../components/DesktopComponent/reusable/DesktopBuyerLayout'

import MobileBuyerNotification from '../../components/mobileComponents/MobileBuyerNotification'
import DesktopBuyerNotification from '../../components/DesktopComponent/DesktopBuyerNotification'
import TabletBuyerLayouts from '../../components/TabletComponent/reusable/TabletBuyerLayout'
import TabletBuyerNotification from '../../components/TabletComponent/TabletBuyerNotification'

const BuyerNotification = () => {
  const window = windowWidth()

  return (
    <div>

{
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 &&<TabletBuyerLayouts><TabletBuyerNotification /></TabletBuyerLayouts>
      } 
      {
        window?.innerWidth >= 1008 &&<DesktopBuyerLayouts><DesktopBuyerNotification /></DesktopBuyerLayouts>
      }
      {
        window?.innerWidth < 640 && <MobileBuyerNotification />
      }

    </div>
  )
}

export default BuyerNotification