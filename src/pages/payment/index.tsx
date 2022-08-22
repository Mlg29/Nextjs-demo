import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileOrder from '../../components/mobileComponents/MobileOrder'
import DesktopLayouts from '../../components/DesktopComponent/reusable/DesktopLayouts'

import Paragraph from '../../components/Paragraph'
import DesktopSellerOrder from '../../components/DesktopComponent/DesktopSellerOrder'
import TabletSellerOrder from '../../components/TabletComponent/TabletSellerOrder'
import DesktopBuyerLayouts from '../../components/DesktopComponent/reusable/DesktopBuyerLayout'
import DesktopPayment from '../../components/DesktopComponent/DesktopPayment'
import TabletBuyerLayouts from '../../components/TabletComponent/reusable/TabletBuyerLayout'
import TabletPayment from '../../components/TabletComponent/TabletPayment'

const Payment = () => {
  const window = windowWidth()


  return (
    <div>

{
        window?.innerWidth >= 1008 &&<DesktopBuyerLayouts><DesktopPayment /></DesktopBuyerLayouts>
      }
       {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 && <TabletBuyerLayouts><TabletPayment /></TabletBuyerLayouts>
      } 
      {/* {
        window?.innerWidth < 640 && <MobileOrder />
      } */}

    </div>
  )
}

export default Payment