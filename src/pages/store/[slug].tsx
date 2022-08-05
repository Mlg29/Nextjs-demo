import React from 'react'
import { windowWidth } from '../../utils/windowWidth'
import MobileStoreInfo from '../../components/mobileComponents/MobileStoreInfo'

const StoreInfo = () => {
    const window = windowWidth()
    return (
        <div>
            {/* {
            window?.innerWidth >= 1008 &&<DesktopLayouts><DesktopStaff /></DesktopLayouts>
          }
           {
            window?.innerWidth >= 641 && window?.innerWidth <= 1007 &&<DesktopLayouts><TabletStaff /></DesktopLayouts>
          } */}
            {
                window?.innerWidth < 640 && <MobileStoreInfo />
            }

        </div>
    )
}

export default StoreInfo