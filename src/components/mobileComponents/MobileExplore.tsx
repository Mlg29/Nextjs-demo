import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { chevronLeft } from '../../assets'
import ImageContainer from '../Image'
import Paragraph from '../Paragraph'
import SearchInput from '../SearchInput'
import MobileHeader from './Header'
import { Container } from './Styled'
import * as CurrencyFormat from 'react-currency-format';
import BuyerTabs from './reusable/BuyerTabs'
import { GlobalStyle } from '../../utils/themes/themes'
import Image from "next/image"



function MobileExplore() {
    const [searchValue, setSearchValue] = useState("")
    const getToken = localStorage.getItem('token')


    const Dummy = [
        {
            id: 0,
            name: "Women's Clothing",
            image: "https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/2_eyvshq.png",
            price: "3000"
          },
          {
            id: 1,
            name:  "Men's Clothing",
            image: "https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/1_ktfkhp.png",
            price: "2500"
          },
          {
            id: 2,
            name:  "Jewelry, Wristwatch & Glasses",
            image: "https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/5_yyfdvq.png",
            price: "3000"
          },
          {
            id: 3,
            name: "Hair & Wigs",
            image: "https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/2_eyvshq.png",
            price: "3000"
          },
    ]

    return (
        <Container>
            <MobileHeader
                icon={chevronLeft}
                header="Top selling products"
            />
            <SearchInput
                label='Search top selling products'
                value={searchValue}

            />
             <Grid>
             {
                    Dummy?.map(data => {
                        return <ProductDiv>
                            <ProdDiv>
                                <ContainerImage src={data?.image} />
                                <Paragraph text={data?.name?.length > 15 ? `${data?.name.substring(0, 15)}...` : data?.name} fontSize={GlobalStyle.size.size10} margin='4px 0px 0px 0px' />
                                <CurrencyFormat value={data?.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size14} color={GlobalStyle.color.accent} fontWeight='700' />} />
                            </ProdDiv>
                        </ProductDiv>
                    })
                }
             </Grid>
             {
                !getToken ? null : <BuyerTabs />
             }
        </Container>
    )
}

export default MobileExplore

const ProductDiv = styled.div`

`
const ProdDiv = styled.div`

`
const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
`
const ContainerImage = styled.img`
    width: 100%;
    height: 160px;
`