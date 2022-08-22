import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import DesktopBuyerLayouts from '../../components/DesktopComponent/reusable/DesktopBuyerLayout'
import MobileBuyerChat from '../../components/mobileComponents/MobileBuyerChat'


const BuyerChat = () => {
  const window = windowWidth()

  return (
    <div>

{/* {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 &&<TabletBuyerLayouts><TabletBuyerNotification /></TabletBuyerLayouts>
      } 
      {
        window?.innerWidth >= 1008 &&<DesktopBuyerLayouts><DesktopBuyerNotification /></DesktopBuyerLayouts>
      } */}
      {
        window?.innerWidth < 640 && <MobileBuyerChat />
      }

    </div>
  )
}

export default BuyerChat