import React, { useRef } from 'react'
import styled from 'styled-components'
import { GlobalStyle } from '../../utils/themes/themes'
import Slider from "react-slick";
import Paragraph from '../Paragraph';
import { RowBetween, RowStart } from '../../utils/StyledComponent';
import ImageContainer from '../Image';
import * as CurrencyFormat from 'react-currency-format';
import { Col, Row } from 'react-bootstrap';
import { categoryDisplay } from '../../utils/constants/categories';
import { IconImage } from './Styled';
import { sliderLeft, sliderRight } from '../../assets';

import { useRouter } from "next/router"
import ProductContainer from '../ProductContainer';

function DesktopHome() {
    const sliderRef = useRef<any>();
    const router = useRouter();

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

    const gotoNext = () => {
        sliderRef.current.slickNext();
    };

    const gotoPrev = () => {
        sliderRef.current.slickPrev();
    };



    return (
        <Container>
            <Div>
                <Slider {...settings} ref={sliderRef}>
                    <SliderDiv>
                        <br />
                        <br />
                        <Subdiv>
                            <TagDiv>
                                <Paragraph text='Flash sale' textAlign='left' textTransform='uppercase' fontSize={GlobalStyle.size.size40} />
                            </TagDiv>
                            <Paragraph text='Hot sale' textTransform='uppercase' fontSize={GlobalStyle.size.size10} margin='0px 0px 5px 0px' />
                            <br />
                            <RowStart>
                                <Paragraph text={'40%'} textTransform='uppercase' color={GlobalStyle.color.white} fontWeight='bold' fontSize={GlobalStyle.size.size80} margin='0px 5px 2px 0px' />
                                <Paragraph text={'OFF WHEN'} textTransform='uppercase' fontSize={GlobalStyle.size.size80} margin='0px 0px 2px 0px' />
                            </RowStart>
                            <br />
                            <br />
                            <Paragraph text='YOU SHOP WITH US' textTransform='uppercase' fontSize={GlobalStyle.size.size40} />

                            <DotContainer>
                                <DotDiv>
                                    <SpanDot></SpanDot>
                                    <SpanDot2></SpanDot2>
                                    <SpanDot2></SpanDot2>
                                    <SpanDot2></SpanDot2>
                                </DotDiv>
                            </DotContainer>

                        </Subdiv>
                        <DivBox>
                            <SliderBox onClick={() => gotoPrev()}>
                                <IconImage
                                    src={sliderLeft}
                                />
                            </SliderBox>
                            <SliderBox onClick={() => gotoNext()}>
                                <IconImage
                                    src={sliderRight}
                                />
                            </SliderBox>

                        </DivBox>
                    </SliderDiv>
                    <SliderDiv2>
                        <br />
                        <br />
                        <Subdiv>
                            {/* <TagDiv>
                                <Paragraph text='Flash sale' textAlign='left' textTransform='uppercase' fontSize={GlobalStyle.size.size40} />
                            </TagDiv>
                            <Paragraph text='Hot sale' textTransform='uppercase' fontSize={GlobalStyle.size.size10} margin='0px 0px 5px 0px' />
                           <br/> */}
                            <RowStart>
                                <Paragraph text={'FLASH SALE'} textTransform='uppercase' color={GlobalStyle.color.white} fontWeight='bold' fontSize={GlobalStyle.size.size80} margin='0px 5px 2px 0px' />

                            </RowStart>
                            <br />
                            <Paragraph text='Make more money on Bazarz while you relax.' fontSize={GlobalStyle.size.size20} margin='0px 0px 23em 0px' />

                            <DotContainer>
                                <DotDiv>
                                    <SpanDot2></SpanDot2>
                                    <SpanDot></SpanDot>
                                    <SpanDot2></SpanDot2>
                                    <SpanDot2></SpanDot2>
                                </DotDiv>
                            </DotContainer>

                        </Subdiv>
                        <DivBox2>
                            <SliderBox onClick={() => gotoPrev()}>
                                <IconImage
                                    src={sliderLeft}
                                />
                            </SliderBox>
                            <SliderBox onClick={() => gotoNext()}>
                                <IconImage
                                    src={sliderRight}
                                />
                            </SliderBox>

                        </DivBox2>
                    </SliderDiv2>
                    <SliderDiv3>
                      
                        <Subdiv>

                            <RowStart>
                                <Paragraph text={'PAY DAY'} textTransform='uppercase' color={GlobalStyle.color.white} fontWeight='bold' fontSize={GlobalStyle.size.size80} margin='0px 5px 0px 0px' />

                            </RowStart>
                            <br />
                            <Paragraph text='Make more money on Bazarz while you relax.' fontSize={GlobalStyle.size.size20} margin='0px 0px 23em 0px' />

                            <DotContainer>
                                <DotDiv>
                                    <SpanDot2></SpanDot2>
                                    <SpanDot2></SpanDot2>
                                    <SpanDot2></SpanDot2>
                                    <SpanDot></SpanDot>
                                </DotDiv>
                            </DotContainer>
                        </Subdiv>
                        <DivBox3>
                            <SliderBox onClick={() => gotoPrev()}>
                                <IconImage
                                    src={sliderLeft}
                                />
                            </SliderBox>
                            <SliderBox onClick={() => gotoNext()}>
                                <IconImage
                                    src={sliderRight}
                                />
                            </SliderBox>

                        </DivBox3>
                    </SliderDiv3>

                </Slider>
            </Div>
            <br />
            <RowBetween>
                <RowStart>
                    <Paragraph text='Top Selling Products' fontSize={GlobalStyle.size.size24} />
                    <Paragraph text='(All Category)' fontSize={GlobalStyle.size.size13} margin='7px 0px 0px 5px' />
                </RowStart>
                <div onClick={() => router.push('/see-all/all')}>
                    <Paragraph text='See all' color={GlobalStyle.color.bazaraTint} />
                </div>
            </RowBetween>
            <SlickProduct {...productSettings}>
                {
                    categoryDisplay?.map(data => {
                        return <ProductContainer data={data} mini={false} />
                    })
                }
            </SlickProduct>
            <br />
            <Row>
                <Col lg='6'>
                    <ImageContainer2 src='https://res.cloudinary.com/doouwbecx/image/upload/v1659797412/Group_10640_s9f3mp.svg' />
                </Col>
                <Col lg='6'>
                    <ImageContainer2 src='https://res.cloudinary.com/doouwbecx/image/upload/v1659968775/Rectangle_629_m276e3.png' />
                </Col>
            </Row>
            <br />
            <RowBetween>
                <RowStart>
                    <Paragraph text='Top deals for you' fontSize={GlobalStyle.size.size24} />
                    <Paragraph text='(Shoe)' fontSize={GlobalStyle.size.size10} margin='7px 0px 0px 5px' />
                </RowStart>
                <div onClick={() => router.push('/see-all/all')}>
                    <Paragraph text='See all' color={GlobalStyle.color.bazaraTint} />
                </div>
            </RowBetween>
            <SlickProduct {...productSettings}>
                {
                    categoryDisplay?.map(data => {
                        return <ProductContainer data={data} mini={false} />
                    })
                }
            </SlickProduct>
            <br />
            <RowBetween>
                <RowStart>
                    <Paragraph text="Categories" fontSize={GlobalStyle.size.size24} />
                </RowStart>
                <div onClick={() => router.push(`/category/all`)}>
                    <Paragraph text='See all' color={GlobalStyle.color.bazaraTint} />
                </div>
            </RowBetween>
            <SlickProduct {...productSettings}>
                {
                    categoryDisplay?.map(data => {
                        return <ProductContainer data={data} mini={true} />
                    })
                }
            </SlickProduct>
            <br />
            <RowBetween>
                <RowStart>
                    <Paragraph text="Perfume" fontSize={GlobalStyle.size.size24} />
                </RowStart>
                <div onClick={() => router.push('/see-all/all')}>
                    <Paragraph text='See all' color={GlobalStyle.color.bazaraTint} />
                </div>
            </RowBetween>
            <SlickProduct {...productSettings}>
                {
                    categoryDisplay?.map(data => {
                        return <ProductContainer data={data} mini={false} />
                    })
                }
            </SlickProduct>
            <br />
            <Row>
                <Col lg={12}>
                    <ImageContainer3 src='https://res.cloudinary.com/doouwbecx/image/upload/v1659797381/Group_10639_nzx3t4.png' />
                </Col>
            </Row>
            <br />
            <RowBetween>
                <RowStart>
                    <Paragraph text="Female Cloths" fontSize={GlobalStyle.size.size24} />
                </RowStart>
                <div onClick={() => router.push('/see-all/all')}>
                    <Paragraph text='See all' color={GlobalStyle.color.bazaraTint} />
                </div>
            </RowBetween>
            <SlickProduct {...productSettings}>
                {
                    categoryDisplay?.map(data => {
                        return <ProductContainer data={data} mini={false} />
                    })
                }
            </SlickProduct>
            <br />
            <Row>
                <Col lg={12}>
                    <ImageContainer3 src='https://res.cloudinary.com/doouwbecx/image/upload/v1659797383/Group_10643_nrcgrq.png' />
                </Col>
            </Row>
            <br />
            <RowBetween>
                <RowStart>
                    <Paragraph text="Wrist Watch" fontSize={GlobalStyle.size.size24} />
                </RowStart>
                <div onClick={() => router.push('/see-all/all')}>
                    <Paragraph text='See all' color={GlobalStyle.color.bazaraTint} />
                </div>
            </RowBetween>
            <SlickProduct {...productSettings}>
                {
                    categoryDisplay?.map(data => {
                        return <ProductContainer data={data} mini={false} />
                    })
                }
            </SlickProduct>
            <br />
            <RowBetween>
                <RowStart>
                    <Paragraph text="Men's Cloth" fontSize={GlobalStyle.size.size24} />
                </RowStart>
                <div onClick={() => router.push('/see-all/all')}>
                    <Paragraph text='See all' color={GlobalStyle.color.bazaraTint} />
                </div>
            </RowBetween>
            <SlickProduct {...productSettings}>
                {
                    categoryDisplay?.map(data => {
                        return <ProductContainer data={data} mini={false} />
                    })
                }
            </SlickProduct>
            <br />
            <Row>
                <Col lg="12">
                    <DownloadDiv>
                        <Subdiv2>
                            <Paragraph text={'DOWNLOAD'} textTransform='uppercase' color={GlobalStyle.color.white} fontWeight='bold' fontSize={GlobalStyle.size.size80} margin='55px 0px' />
                            <Paragraph text={'BAZARA APP'} textTransform='uppercase' color={GlobalStyle.color.white} fontWeight='bold' fontSize={GlobalStyle.size.size80} />

                            <Paragraph text={'Get exclusive offer'} color={GlobalStyle.color.white} fontWeight='bold' fontSize={GlobalStyle.size.size24} margin='50px 0px' />

                            <ImageDiv>
                                <ImageContainer source='https://res.cloudinary.com/doouwbecx/image/upload/v1659974209/Rectangle_14_ayywnt.png' width={138} height={50} />
                                <ImageContainer source='https://res.cloudinary.com/doouwbecx/image/upload/v1659974216/Rectangle_15_mtpof2.png' width={138} height={50} />
                            </ImageDiv>
                        </Subdiv2>
                    </DownloadDiv>
                </Col>
            </Row>
            <br />
            <RowBetween>
                <RowStart>
                    <Paragraph text="Men's Cloth" fontSize={GlobalStyle.size.size24} />
                </RowStart>
                <div onClick={() => router.push('/see-all/all')}>
                    <Paragraph text='See all' color={GlobalStyle.color.bazaraTint} />
                </div>
            </RowBetween>
            <SlickProduct {...productSettings}>
                {
                    categoryDisplay?.map(data => {
                        return <ProductContainer data={data} mini={false} />
                    })
                }
            </SlickProduct>
            <br />
        </Container>
    )
}

export default DesktopHome

const Container = styled.div`

`

const Div = styled.div`
    margin-top: 20px;

`
const SliderDiv = styled.div`
    width: 100%;
    height: 600px;
    background-image: url('https://res.cloudinary.com/doouwbecx/image/upload/v1659797382/Web_Landing_Page_Banner_tx2f8x.svg');
    background-size: cover;
    border-radius: 10px;
    background-position: 70%;
`

const SliderDiv2 = styled.div`
    width: 100%;
    height: 600px;
    background-image: url('https://res.cloudinary.com/doouwbecx/image/upload/v1659966476/Banner_2_zpvf1y.svg');
    background-size: cover;
    border-radius: 10px;
    background-position: 70%;

`
const SliderDiv3 = styled.div`
    width: 100%;
    height: 600px;
    background-image: url('https://res.cloudinary.com/doouwbecx/image/upload/v1659968901/Banner_4_zfcvpc.png');
    background-size: cover;
    border-radius: 10px;
    background-position: 70%;
`

const DownloadDiv = styled.div`
    width: 100%;
    // height: 700px;
    background-image: url('https://res.cloudinary.com/doouwbecx/image/upload/v1659970789/adf_qumxjx.png');
    background-size: cover;
    border-radius: 10px;
    background-position: 50%;

`


const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  margin-top: 10em;
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
    padding: 8em 10em;
`

const Subdiv2 = styled.div`
    padding: 20em 10em;

`
const TagDiv = styled.div`
    background: ${GlobalStyle.color.darkBlack};
    width: 230px;
    padding: 10px;
    border-radius: 3px;
    margin-bottom: 16px;
`

const SlickProduct = styled(Slider)`
    width: 100% !important;
    margin-top: 10px;
`
const ProdDiv = styled.div`
    display: flex;
    flex-direction: column;
`
const ProductDiv = styled.div`

`
const ImageContainer2 = styled.img`
    width: 100%;
`

const ImageContainer3 = styled.img`
    width: 100%;
    height: 350px;
`

const ImageDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 290px;
`

const SliderBox = styled.div`

`

const DivBox = styled.div`
  width: 100%;
  display: flex; 
  justify-content: space-between; 
  margin-top: -25em;
  padding: 0px 10px;
`

const DivBox2 = styled.div`
  width: 100%;
  display: flex; 
  justify-content: space-between; 
  margin-top: -35em;
  padding: 0px 10px;
`
const DivBox3 = styled.div`
  width: 100%;
  display: flex; 
  justify-content: space-between; 
  margin-top: -32em;
  padding: 0px 10px;
`