
import React, { useEffect, useState } from 'react'

import styles from "../../styles/Home.module.css"

import styled from 'styled-components'
import { windowWidth } from '../utils/windowWidth'
import MobileHome from '../components/mobileComponents/MobileHome'


function index() {
  const window = windowWidth()



  return (
    <Div>
        {/* {
        window?.innerWidth >= 641 && <DesktopSignup />
      } */}

      {
        window?.innerWidth < 640 && <MobileHome />
      }

    </Div>
  )
}

export default index


const Div = styled.div`

`