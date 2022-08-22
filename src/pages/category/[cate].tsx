import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import DesktopBuyerLayouts from '../../components/DesktopComponent/reusable/DesktopBuyerLayout'
import DesktopSeeAll from '../../components/DesktopComponent/DesktopSeeAll'
import MobileStoreAll from '../../components/mobileComponents/MobileStoreAll'
import DesktopCategory from '../../components/DesktopComponent/DesktopCategory'

const Cate = () => {
  const window = windowWidth()


  return (
    <div>
{/* 
      {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007
      } 

      {
        window?.innerWidth >= 1008 && <DesktopMyStore />
      } */}

{
        window?.innerWidth >= 1008 && <DesktopBuyerLayouts><DesktopCategory /></DesktopBuyerLayouts>
      }

      {
        window?.innerWidth < 640 && <MobileStoreAll />
      }

    </div>
  )
}

export default Cate