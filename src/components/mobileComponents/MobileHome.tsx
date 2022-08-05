import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import HomeHeader from './reusable/HomeHeader'
import { Container } from './Styled'
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { useRouter } from "next/router"
import { getProfile, profileInfo } from '../../slices/ProfileSlice'
import Slider from "react-slick";
import { Container as ContainerB, Row, Col } from "react-bootstrap"
import Paragraph from '../Paragraph'
import { Global } from '@emotion/react'
import { GlobalStyle } from '../../utils/themes/themes'
import { RowBetween, RowStart } from '../../utils/StyledComponent'
import { categoryDisplay, categoryList } from '../../utils/constants/categories'
import ImageContainer from '../Image'
import { categoryData, getAllCategories } from '../../slices/CategorySlice'
import * as CurrencyFormat from 'react-currency-format';
import BuyerTabs from './reusable/BuyerTabs'

function MobileHome() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const sliderRef = useRef<any>();
    const profileData = useAppSelector(profileInfo)
    const categoryItems = useAppSelector(categoryData)

    const getToken = localStorage.getItem('token')

    const gotoNext = () => {
        sliderRef.current.slickNext();
    };

    const gotoPrev = () => {
        sliderRef.current.slickPrev();
    };

    useEffect(() => {
        dispatch(getProfile())
        dispatch(getAllCategories())
    }, [])

    const settings = {
        className: "slider variable-width ",
        dots: false,
        infinite: false,
        //centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        //variableWidth: true,
        arrows: false
    };

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
            <HomeHeader data={profileData} />
            <Div>
                <Slider {...settings}>
                    <SliderDiv>
                        <Subdiv>
                            <TagDiv>
                                <Paragraph text='Flash sale' textAlign='center' textTransform='uppercase' fontSize={GlobalStyle.size.size10} />
                            </TagDiv>
                            <Paragraph text='Hot sale' textTransform='uppercase' fontSize={GlobalStyle.size.size12} margin='0px 0px 5px 0px' />
                            <RowStart>
                                <Paragraph text={'40%'} textTransform='uppercase' color={GlobalStyle.color.white} fontWeight='bold' fontSize={GlobalStyle.size.size22} margin='0px 5px 2px 0px' />
                                <Paragraph text={'OFF WHEN'} textTransform='uppercase' fontSize={GlobalStyle.size.size12} margin='0px 0px 2px 0px' />
                            </RowStart>
                            <Paragraph text='YOU SHOP WITH US' textTransform='uppercase' fontSize={GlobalStyle.size.size12} />

                            <DotContainer>
                                <DotDiv>
                                    <SpanDot></SpanDot>
                                    <SpanDot2></SpanDot2>
                                    <SpanDot2></SpanDot2>
                                </DotDiv>
                            </DotContainer>
                        </Subdiv>

                    </SliderDiv>
                    <SliderDiv2>
                        <Subdiv>
                            <TagDiv>
                                <Paragraph text='Flash sale' textAlign='center' textTransform='uppercase' fontSize={GlobalStyle.size.size10} />
                            </TagDiv>
                            <Paragraph text='Hot sale' textTransform='uppercase' fontSize={GlobalStyle.size.size12} margin='0px 0px 5px 0px' />
                            <RowStart>
                                <Paragraph text={'40%'} textTransform='uppercase' color={GlobalStyle.color.white} fontWeight='bold' fontSize={GlobalStyle.size.size22} margin='0px 5px 2px 0px' />
                                <Paragraph text={'OFF WHEN'} textTransform='uppercase' fontSize={GlobalStyle.size.size12} margin='0px 0px 2px 0px' />
                            </RowStart>
                            <Paragraph text='YOU SHOP WITH US' textTransform='uppercase' fontSize={GlobalStyle.size.size12} />

                            <DotContainer>
                                <DotDiv>
                                    <SpanDot2></SpanDot2>
                                    <SpanDot></SpanDot>
                                    <SpanDot2></SpanDot2>
                                </DotDiv>
                            </DotContainer>
                        </Subdiv>
                    </SliderDiv2>
                    <SliderDiv3>
                        <Subdiv>
                            <TagDiv>
                                <Paragraph text='Flash sale' textAlign='center' textTransform='uppercase' fontSize={GlobalStyle.size.size10} />
                            </TagDiv>
                            <Paragraph text='Hot sale' textTransform='uppercase' fontSize={GlobalStyle.size.size12} margin='0px 0px 5px 0px' />
                            <RowStart>
                                <Paragraph text={'40%'} textTransform='uppercase' color={GlobalStyle.color.white} fontWeight='bold' fontSize={GlobalStyle.size.size22} margin='0px 5px 2px 0px' />
                                <Paragraph text={'OFF WHEN'} textTransform='uppercase' fontSize={GlobalStyle.size.size12} margin='0px 0px 2px 0px' />
                            </RowStart>
                            <Paragraph text='YOU SHOP WITH US' textTransform='uppercase' fontSize={GlobalStyle.size.size12} />

                            <DotContainer>
                                <DotDiv>
                                    <SpanDot2></SpanDot2>
                                    <SpanDot2></SpanDot2>
                                    <SpanDot></SpanDot>
                                </DotDiv>
                            </DotContainer>
                        </Subdiv>
                    </SliderDiv3>

                </Slider>
            </Div>

            <RowBetween>
                <Paragraph text='Categories' fontSize={GlobalStyle.size.size16} fontWeight='600' />
                <Paragraph text='See all' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size16} fontWeight='600' />
            </RowBetween>

            <Slick {...categorySettings}>
                {
                    categoryDisplay?.map(data => {
                        return <CategoryDiv>
                            <CatDiv>
                                <ImageContainer type='round' source={data?.image} width={50} height={50} />
                                <Paragraph text={data?.name?.length > 15 ? `${data?.name.substring(0, 15)}...` : data?.name} fontSize={GlobalStyle.size.size10} textAlign='center' margin='4px 0px 0px 0px' />
                            </CatDiv>
                        </CategoryDiv>
                    })
                }
            </Slick>
            <br/>
            <br/>
            <RowBetween>
                <Paragraph text='Top Selling Products' fontSize={GlobalStyle.size.size16} fontWeight='600' />
                <Paragraph text='See all' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size16} fontWeight='600' />
            </RowBetween>
            <Paragraph text='All Categories' fontSize={GlobalStyle.size.size12} fontWeight='400' />
            <SlickProduct {...productSettings}>
                {
                    Dummy?.map(data => {
                        return <ProductDiv>
                            <ProdDiv>
                                <ImageContainer source={data?.image} width={150} height={150} />
                                <Paragraph text={data?.name?.length > 15 ? `${data?.name.substring(0, 15)}...` : data?.name} fontSize={GlobalStyle.size.size10} margin='4px 0px 0px 0px' />
                                <CurrencyFormat value={data?.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size14} color={GlobalStyle.color.accent} fontWeight='700' />} />
                            </ProdDiv>
                        </ProductDiv>
                    })
                }
            </SlickProduct>
            <br/>
            <br/>
            
            {
                !getToken ? null :  <BuyerTabs />
            }
           
        </Container>
    )
}

export default MobileHome

const Div = styled.div`
    margin-top: 20px;

`
const SliderDiv = styled.div`
    width: 100%;
    height: 200px;
    background-image: url('https://res.cloudinary.com/doouwbecx/image/upload/v1659529722/gb_znpphu.svg');
    background-size: cover;

`

const SliderDiv2 = styled.div`
    width: 100%;
    height: 170px;
    background-image: url('https://res.cloudinary.com/doouwbecx/image/upload/v1634583567/image_9_rsrovg.png');
    background-size: cover;

`
const SliderDiv3 = styled.div`
    width: 100%;
    height: 170px;
    background-image: url('https://res.cloudinary.com/doouwbecx/image/upload/v1636636130/Hero_Slide_2_fuzclf.png');
    background-size: cover;

`

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  margin-top: 5%;
`;

const DotDiv = styled.div`
 display: flex;
 justify-content: space-between;
 width: 40px;
`

const SpanDot = styled.span`
background-color: ${GlobalStyle.color.bazaraTint};
width: 7px;
height: 7px;
border-radius: 50%;
`

const SpanDot2 = styled.span`
background-color: ${GlobalStyle.color.darkBlack};
width: 7px;
height: 7px;
border-radius: 50%;
`
const Subdiv = styled.div`
    padding: 20px 10px 10px 20px;
`
const TagDiv = styled.div`
    background: ${GlobalStyle.color.darkBlack};
    width: 65px;
    padding: 5px;
    border-radius: 3px;
    margin-bottom: 16px;
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