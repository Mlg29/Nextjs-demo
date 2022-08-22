
import React, { useEffect, useState } from 'react'


import styled from 'styled-components'
import { windowWidth } from '../utils/windowWidth'
import MobileHome from '../components/mobileComponents/MobileHome'
import DesktopHome from '../components/DesktopComponent/DesktopHome'
import DesktopBuyerLayouts from '../components/DesktopComponent/reusable/DesktopBuyerLayout'
import TabletBuyerLayouts from '../components/TabletComponent/reusable/TabletBuyerLayout'
import TabletHome from '../components/TabletComponent/TabletHome'


function index() {
  const window = windowWidth()



  return (
    <Div>

{
        window?.innerWidth >= 1008 && <DesktopBuyerLayouts><DesktopHome /></DesktopBuyerLayouts>
      }
       {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 && <TabletBuyerLayouts><TabletHome /></TabletBuyerLayouts>
      }
      {
        window?.innerWidth < 640 && <MobileHome />
      }

    </Div>
  )
}

export default index


const Div = styled.div`

`