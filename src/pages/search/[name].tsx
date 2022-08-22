import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileSettings from '../../components/mobileComponents/MobileSettings'
import DesktopBuyerLayouts from '../../components/DesktopComponent/reusable/DesktopBuyerLayout'
import DesktopSearch from '../../components/DesktopComponent/DesktopSearch'
import TabletBuyerLayouts from '../../components/TabletComponent/reusable/TabletBuyerLayout'
import TabletSearch from '../../components/TabletComponent/TabletSearch'

const Search = () => {
  const window = windowWidth()


  return (
    <div>
{
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 && <TabletBuyerLayouts><TabletSearch /></TabletBuyerLayouts>
      } 


{
        window?.innerWidth >= 1008 && <DesktopBuyerLayouts><DesktopSearch /></DesktopBuyerLayouts>
      } 

    </div>
  )
}

export default Search