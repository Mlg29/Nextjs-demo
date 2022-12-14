import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileExplore from '../../components/mobileComponents/MobileExplore'

const Explore = () => {
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
        window?.innerWidth < 640 && <MobileExplore />
      }

    </div>
  )
}

export default Explore