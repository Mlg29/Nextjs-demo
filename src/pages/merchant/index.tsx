import React from 'react'
import { windowWidth } from '../../utils/windowWidth'
import DesktopMerchant from '../../components/DesktopComponent/DesktopMerchant'
import MobileMerchantSignup from '../../components/mobileComponents/MobileMerchantSignup'

const Merchant = () => {
  const window = windowWidth()


  return (
    <div>
{/* 

      {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007
      } */}

{
        window?.innerWidth >= 640 && <DesktopMerchant />
      }

      {
        window?.innerWidth < 640 && <MobileMerchantSignup />
      }

    </div>
  )
}

export default Merchant