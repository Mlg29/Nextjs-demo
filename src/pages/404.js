import React from 'react'
import { windowWidth } from '../utils/windowWidth'
import Desktop404 from "../components/DesktopComponent/Desktop404"
import DesktopBuyerLayouts from "../components/DesktopComponent/reusable/DesktopBuyerLayout"


function ErrorPage() {
    const window = windowWidth()


    return (
        <div>
            <Desktop404 />
        </div>
    )
}

export default ErrorPage