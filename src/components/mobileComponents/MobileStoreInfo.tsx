import React, {useState, useEffect} from 'react'
import { chevronLeft } from '../../assets'
import MobileHeader from './Header'
import { Container } from './Styled'
import { useRouter } from 'next/router'
import {useAppDispatch, useAppSelector} from "../../app/hook"
import { RowStart } from '../../utils/StyledComponent'
import styled from 'styled-components'
import ImageContainer from '../Image'
import Paragraph from '../Paragraph'
import { getStoreBySlug, storeBySlug } from '../../slices/CategorySlice'
import { GlobalStyle } from '../../utils/themes/themes'
import { Rate } from 'antd';



function MobileStoreInfo() {
  const dispatch = useAppDispatch()
  const storeBySlugData = useAppSelector(storeBySlug)
  const router = useRouter()
  const slugName = router?.query?.slug as string

  
  useEffect(() => {
    dispatch(getStoreBySlug(slugName))
  }, [slugName])

  return (
    <Container>
      <MobileHeader
        icon={chevronLeft}
        header="Store detail page"
      />
      <br/>
      <RowStart>
          <Div>
              <ImageContainer type='round' source='https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/1_ktfkhp.png' width={130} height={130}/>
          </Div>
          <Div2>
              <Paragraph text='Agbada Store' fontSize={GlobalStyle.size.size16} fontWeight='700' />
              <Rate disabled allowHalf value={4} />
              <Paragraph text='4.9 stars (170 reviews)' fontSize={GlobalStyle.size.size16} fontWeight='700' />
          </Div2>
      </RowStart>
      <br/>
      <Paragraph text='Store Description' fontSize={GlobalStyle.size.size18} fontWeight='700' />
      <Paragraph text='We deal in all kinds of shoes that ranges from cooperate, atleth, for male, female to suit any occasion desired.' fontSize={GlobalStyle.size.size14} fontWeight='400' />
      <br/>
      <Paragraph text='Seller performance' fontSize={GlobalStyle.size.size18} fontWeight='700' />
      <Paragraph text='We deal in all kinds of shoes that ranges from cooperate, atleth, for male, female to suit any occasion desired.' fontSize={GlobalStyle.size.size14} fontWeight='400' />
    </Container>
  )
}

export default MobileStoreInfo

const Div = styled.div`
  width: 45%;

`
const Div2 = styled.div`
  width: 55%;

`