import React from 'react'
import {
    Header,
    RowJustifyAlignBetween,
    IconImage
} from "./Styled"

import { Headers } from '../../utils/interfaces';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Paragraph from '../Paragraph';
import { GlobalStyle } from '../../utils/themes/themes';

const MobileHeader: React.FC<Headers> = ({ icon, header }) => {
    const router = useRouter()

    return (
        <RowJustifyAlignBetween>
            <Div onClick={router?.pathname === "/login" || router?.pathname === "/signup" || router?.pathname === "/merchant" ? () => router.push('/') : () => router.back()}>
                <IconImage
                    src={icon}
                    width={24}
                    height={24}
                />
            </Div>
            {/* <Header>{header}</Header> */}
            <Paragraph  text={header} fontSize={GlobalStyle.size.size16} fontWeight='400' textTransform='capitalize'  />
            <Header></Header>
        </RowJustifyAlignBetween>

    )
}

export default MobileHeader

const Div = styled.div`

`