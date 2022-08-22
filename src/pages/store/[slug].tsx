import React from 'react'
import { windowWidth } from '../../utils/windowWidth'
import MobileStoreInfo from '../../components/mobileComponents/MobileStoreInfo'
import DesktopBuyerLayouts from '../../components/DesktopComponent/reusable/DesktopBuyerLayout'
import DesktopStoreInfo from '../../components/DesktopComponent/DesktopStoreInfo'
import TabletBuyerLayouts from '../../components/TabletComponent/reusable/TabletBuyerLayout'
import TabletStoreInfo from '../../components/TabletComponent/TabletStoreInfo'

const StoreInfo = () => {
    const window = windowWidth()
    return (
        <div>
           {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 && <TabletBuyerLayouts><TabletStoreInfo /></TabletBuyerLayouts>
      } 
      
          {
            window?.innerWidth >= 1008 &&<DesktopBuyerLayouts><DesktopStoreInfo /></DesktopBuyerLayouts>
          }
            {
                window?.innerWidth < 640 && <MobileStoreInfo />
            }

        </div>
    )
}

export default StoreInfo