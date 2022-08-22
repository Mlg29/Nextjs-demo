import React from 'react'
import { chevronLeft } from '../../assets'
import MobileHeader from './Header'
import { Container } from './Styled'
import { GlobalStyle } from '../../utils/themes/themes'
import { useRouter } from "next/router"
import styled from 'styled-components'
import Paragraph from '../Paragraph'
import * as CurrencyFormat from "react-currency-format"
import { categoryDisplay } from '../../utils/constants/categories'
import ProductContainer from '../ProductContainer'


function MobileSeeAll() {
    const router = useRouter();

    const itemType = router?.query?.name as string

    const Dummy = [
        {
            id: 0,
            name: "Women's Clothing",
            image: "https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/2_eyvshq.png",
            price: "3000"
        },
        {
            id: 1,
            name: "Men's Clothing",
            image: "https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/1_ktfkhp.png",
            price: "2500"
        },
        {
            id: 2,
            name: "Jewelry, Wristwatch & Glasses",
            image: "https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/5_yyfdvq.png",
            price: "3000"
        },
        {
            id: 3,
            name: "Hair & Wigs",
            image: "https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/2_eyvshq.png",
            price: "3000"
        },
        {
            id: 4,
            name: "Jewelry, Wristwatch & Glasses",
            image: "https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/5_yyfdvq.png",
            price: "3000"
        },
        {
            id: 5,
            name: "Hair & Wigs",
            image: "https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/2_eyvshq.png",
            price: "3000"
        },
        {
            id: 6,
            name: "Jewelry, Wristwatch & Glasses",
            image: "https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/5_yyfdvq.png",
            price: "3000"
        },
        {
            id: 6,
            name: "Hair & Wigs",
            image: "https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/2_eyvshq.png",
            price: "3000"
        },
    ]


  return (
    <Container>
        <MobileHeader 
            icon={chevronLeft}
            header="See All"
        />
        
        <Paragraph text={itemType} fontSize={GlobalStyle.size.size16} textTransform='capitalize' fontWeight='700' margin='10px 0px' />
        <Grid>
                {
                    categoryDisplay?.map(data => {
                        return<ProductDiv  onClick={() => router.push(`/category/${data?.name}`)}>
                        <ProdDiv>
                            <ContainerImage2 src={data?.image} />
                            <Paragraph text={data?.name?.length > 15 ? `${data?.name.substring(0, 15)}...` : data?.name} fontSize={GlobalStyle.size.size16} margin='4px 0px 0px 10px' />
                            <CurrencyFormat value={data?.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph margin='0px 0px 0px 10px' text={`${value}`} fontSize={GlobalStyle.size.size16} color={GlobalStyle.color.accent} fontWeight='700' />} />
                        </ProdDiv>
                    </ProductDiv>
                    })
                }
            </Grid>
    </Container>
  )
}

export default MobileSeeAll


const Grid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 15px;
    `

const ProductDiv = styled.div`

`
const ProdDiv = styled.div`

`
const ContainerImage2 = styled.img`
    width: 100%;
    height: 160px;
`