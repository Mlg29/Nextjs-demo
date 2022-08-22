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
import Slider from "react-slick";
import { RowBetween } from '../../utils/StyledComponent'
import { categoryDisplay } from '../../utils/constants/categories'
import { useRouter } from "next/router"
import ProductContainer from '../ProductContainer'


function MobileExplore() {
    const [searchValue, setSearchValue] = useState("")
    const getToken = localStorage.getItem('token')
    const router = useRouter()

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
    ]

    const Items = ["hat", "Sneakers", "Female", "Sport", "white gele"]


    const categorySettings = {
        className: "slider variable-width ",
        dots: false,
        infinite: false,
        //centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false
    };

    const productSettings = {
        className: "slider variable-width ",
        dots: false,
        infinite: false,
        //centerMode: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false
    };

    return (
        <Container>
            <MobileHeader
                icon={chevronLeft}
                header="Top selling products"
            />
            <SearchInput
                label='Search top selling products'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}

            />
            {
                searchValue?.length > 0 && <Grid>
                    {
                        categoryDisplay?.map(data => {
                            return <ProductContainer data={data}  mini={true} />
                        })
                    }
                </Grid>
            }
            {
                searchValue?.length < 1 && <>
                    <br />
                    <RowBetween>
                        <Paragraph text='Recent Search' fontSize={GlobalStyle.size.size16} fontWeight='600' />
                    </RowBetween>
                    <Grid2>
                        {
                            Items?.map(data => {
                                return <ItemDiv>
                                    <Paragraph text={data} textAlign='center' fontSize={GlobalStyle.size.size13} />
                                </ItemDiv>
                            })
                        }
                    </Grid2>
                        <br/>
                    <RowBetween>
                        <Paragraph text='Categories' fontSize={GlobalStyle.size.size16} fontWeight='600' />
                        <div onClick={() => router.push(`/category/all`)}>
                            <Paragraph text='See all' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size16} fontWeight='600' />
                        </div>
                    </RowBetween>

                    <Slick {...categorySettings}>
                        {
                            categoryDisplay?.map(data => {
                                return <CategoryDiv onClick={() => router.push(`/category/${data?.name}`)}>
                                    <CatDiv>
                                        <ImageContainer type='round' source={data?.image} width={50} height={50} />
                                        <Paragraph text={data?.name?.length > 15 ? `${data?.name.substring(0, 15)}...` : data?.name} fontSize={GlobalStyle.size.size10} textAlign='center' margin='4px 0px 0px 0px' />
                                    </CatDiv>
                                </CategoryDiv>
                            })
                        }
                    </Slick>
                    <br />
                    <br />
                    <RowBetween>
                        <Paragraph text='Top Selling Products' fontSize={GlobalStyle.size.size16} fontWeight='600' />
                        <div onClick={() => router.push('/see-all/shoe')}>
                            <Paragraph text='See all' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size16} fontWeight='600' />
                        </div>
                    </RowBetween>
                    <Paragraph text='All Categories' fontSize={GlobalStyle.size.size12} fontWeight='400' />
                    <SlickProduct {...productSettings}>
                        {
                            categoryDisplay?.map(data => {
                                return <ProductContainer data={data}  mini={true} />
                            })
                        }
                    </SlickProduct>
                </>
            }
            {
                !getToken ? null : <BuyerTabs />
            }
        </Container>
    )
}

export default MobileExplore


const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
`

const Grid2 = styled.div`
    // display: grid;
    // grid-template-columns: 1fr 1fr 1fr 1fr;
    // grid-gap: 15px;
    display: flex;
    flex-wrap: wrap;
`

const ContainerImage = styled.img`
    width: 100%;
    height: 160px;
`

const CategoryDiv = styled.div`

`
const ProductDiv = styled.div`

`
const Slick = styled(Slider)`
    width: 100% !important;
    margin-top: 10px;
`

const SlickProduct = styled(Slider)`
    width: 100% !important;
    margin-top: 10px;
`

const CatDiv = styled.div`
    display: flex;
    flex-direction: column;
`
const ProdDiv = styled.div`
    display: flex;
    flex-direction: column;
`
const ItemDiv = styled.div`
border-radius: 5px;
background: ${GlobalStyle.color.darkBlack};
padding: 5px;
width: 80px;
margin: 5px;
`