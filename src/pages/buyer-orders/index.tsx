import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import Paragraph from '../../components/Paragraph'

import MobileBuyerOrders from '../../components/mobileComponents/MobileBuyerOrders'
import DesktopBuyerLayouts from '../../components/DesktopComponent/reusable/DesktopBuyerLayout'
import DesktopBuyerOrders from '../../components/DesktopComponent/DesktopBuyerOrders'
import TabletBuyerLayouts from '../../components/TabletComponent/reusable/TabletBuyerLayout'
import TabletBuyerOrders from '../../components/TabletComponent/TabletBuyerOrder'

const Orders = () => {
  const window = windowWidth()

  const hello = () => {
    return <Paragraph text='hello world' />
  }

  return (
    <div>

{
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 && <TabletBuyerLayouts><TabletBuyerOrders /></TabletBuyerLayouts>
      } 
      
      {
        window?.innerWidth >= 1008 &&<DesktopBuyerLayouts><DesktopBuyerOrders /></DesktopBuyerLayouts>
      }
      {
        window?.innerWidth < 640 && <MobileBuyerOrders />
      }

    </div>
  )
}

export default Orders