import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import DesktopBuyerLayouts from '../../components/DesktopComponent/reusable/DesktopBuyerLayout'
import DesktopSeeAll from '../../components/DesktopComponent/DesktopSeeAll'
import MobileSeeAll from '../../components/mobileComponents/MobileSeeAll'
import TabletBuyerLayouts from '../../components/TabletComponent/reusable/TabletBuyerLayout'
import TabletSeeAll from '../../components/TabletComponent/TabletSeeAll'

const SeeAll = () => {
  const window = windowWidth()


  return (
    <div>
 {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 && <TabletBuyerLayouts><TabletSeeAll /></TabletBuyerLayouts>
      } 

{
        window?.innerWidth >= 1008 && <DesktopBuyerLayouts><DesktopSeeAll /></DesktopBuyerLayouts>
      }

      {
        window?.innerWidth < 640 && <MobileSeeAll />
      }

    </div>
  )
}

export default SeeAll