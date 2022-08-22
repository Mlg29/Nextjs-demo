import React from 'react'
import styled from 'styled-components'
import Button from '../Button'

import Paragraph from '../Paragraph'
import { useRouter } from "next/router"
import { GlobalStyle } from '../../utils/themes/themes'

function Desktop404() {
    const router = useRouter()

    return (
        <Contain>
            <Div>
                <ImageContainer src='https://res.cloudinary.com/doouwbecx/image/upload/v1660287853/404_vector_kq8dhf.png' />
                <Paragraph text="Something went wrong" textAlign='center' fontSize={GlobalStyle.size.size24} fontWeight='700' margin="40px 0px 20px 0px" />
                <BtnDiv>
                    <Button children='Go back home' handlePress={() => router.push('/')} />
                </BtnDiv>
            </Div>
        </Contain>
    )
}

export default Desktop404

const Contain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Div = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const BtnDiv = styled.div`
    width: 150px;
    margin-bottom: 40px;
`
const ImageContainer = styled.img`
   

@media screen and (min-width: 320px) and (max-width: 640px) {
    width: 100%;
    height: 100%;
}
`