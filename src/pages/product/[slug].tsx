import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileProductInfoPage from '../../components/mobileComponents/MobileProductInfoPage'
import DesktopBuyerLayouts from '../../components/DesktopComponent/reusable/DesktopBuyerLayout'
import DesktopProductInfo from '../../components/DesktopComponent/DesktopProductInfo'
import TabletBuyerLayouts from '../../components/TabletComponent/reusable/TabletBuyerLayout'
import TabletProductInfo from '../../components/TabletComponent/TabletProductInfo'

const ProductInfo = () => {
    const window = windowWidth()
    return (
        <div>
          {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 && <TabletProductInfo />
      } 
      
          {
            window?.innerWidth >= 1008 &&<DesktopProductInfo />
          }
            {
                window?.innerWidth < 640 && <MobileProductInfoPage />
            }

        </div>
    )
}

export default ProductInfo