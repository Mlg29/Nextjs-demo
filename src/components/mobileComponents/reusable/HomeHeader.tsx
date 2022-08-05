import React from 'react'
import styled from 'styled-components'
import { buy, BuyerNotification } from '../../../assets'
import { RowBetween } from '../../../utils/StyledComponent'
import { GlobalStyle } from '../../../utils/themes/themes'
import { HomeHeaderType } from '../../../utils/types'
import ImageContainer from '../../Image'
import Paragraph from '../../Paragraph'
import { IconImage } from '../Styled'

const HomeHeader: React.FC<HomeHeaderType> = ({data}) => {
    const getToken = localStorage.getItem('token')


  return (
    <RowBetween>
        <Div>
            <ImageContainer source={data?.imgUrl ? data?.imgUrl : "https://res.cloudinary.com/doouwbecx/image/upload/v1644579668/Profile2_zjaxnm.png"} width={40} height={40} type='round'/>
           {
            !getToken ?  <Paragraph text={`Welcome 👋🏽`} fontSize={GlobalStyle.size.size14} fontWeight='400' color={GlobalStyle.color.gray} margin='0px 0px 0px 10px' /> :  <Paragraph text={`Hi, ${data?.fName} 👋🏽`} fontSize={GlobalStyle.size.size14} fontWeight='400' color={GlobalStyle.color.gray} margin='0px 0px 0px 10px' />
           }
        </Div>

        {
            !getToken ? null : <Div2>
            <IconImage src={BuyerNotification} />
            <IconImage src={buy} />
        </Div2>
        }
    </RowBetween>
  )
}

export default HomeHeader

const Div = styled.div`
    display: flex;
    align-items: center;
`

const Div2 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60px;
`