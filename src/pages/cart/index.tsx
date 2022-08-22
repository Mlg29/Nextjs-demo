import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileCart from '../../components/mobileComponents/MobileCart'
import DesktopCreateStore from '../../components/DesktopComponent/DesktopCreateStore'
import DesktopBuyerLayouts from '../../components/DesktopComponent/reusable/DesktopBuyerLayout'
import DesktopCart from '../../components/DesktopComponent/DesktopCart'
import TabletBuyerLayouts from '../../components/TabletComponent/reusable/TabletBuyerLayout'
import TabletCart from '../../components/TabletComponent/TabletCart'

const Cart = () => {
  const window = windowWidth()


  return (
    <div>
{
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 && <TabletBuyerLayouts><TabletCart /></TabletBuyerLayouts>
      }
 {
        window?.innerWidth >= 1008 && <DesktopBuyerLayouts><DesktopCart /></DesktopBuyerLayouts>
      }

      {
        window?.innerWidth < 640 && <MobileCart />
      }

    </div>
  )
}

export default Cart