import React, { useState, useEffect } from 'react'
import { chevronLeft } from '../../assets'

import { Container } from './Styled'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { RowBetween, RowStart } from '../../utils/StyledComponent'
import styled from 'styled-components'
import ImageContainer from '../Image'
import Paragraph from '../Paragraph'
import { getStoreBySlug, storeBySlug } from '../../slices/CategorySlice'
import { GlobalStyle } from '../../utils/themes/themes'
import { Rate, Breadcrumb } from 'antd';
import * as CurrencyFormat from 'react-currency-format';
import Slider from "react-slick";
import { categoryDisplay } from '../../utils/constants/categories'
import ProductContainer from '../ProductContainer'
import { getProduct } from '../../slices/ProductSlice'
import renderHTML from 'react-render-html';



function DesktopStoreInfo() {
    const dispatch = useAppDispatch()
    const [storeBySlugData, setStoreBySlugData] = useState(null)
    const [products, setProducts] = useState(null)

    const router = useRouter()
    const slugName = router?.query?.slug as string


    useEffect(() => {
        dispatch(getStoreBySlug(slugName)).then(async data => {
            setStoreBySlugData(data?.payload)
            await dispatch(getProduct(data?.payload?.id)).then((dd) => setProducts(dd.payload))
        })
    }, [slugName])

    function executeOnClick(isExpanded) {
    }



    const Items = ["All", "Male", "Female", "Sport", "Office", "All", "Male", "Female", "Sport", "Office"]

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


    return (
        <Container>
            <br />
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>All Stores</Breadcrumb.Item>
                <Breadcrumb.Item>Store Name</Breadcrumb.Item>
                <Breadcrumb.Item>Store Name</Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <RowStart>
                <Div>
                    <ImageContainer type='round' source="https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/1_ktfkhp.png" width={130} height={130} />
                </Div>
                <Div2>
                    <Paragraph text="Store Name" fontSize={GlobalStyle.size.size16} fontWeight='700' />
                    <Rate disabled allowHalf value={3} />
                    <Paragraph text={`${3} stars (${3} review(s))`} fontSize={GlobalStyle.size.size16} fontWeight='700' />
                </Div2>
            </RowStart>
            <br />
            <Paragraph text='Store Description' fontSize={GlobalStyle.size.size24} fontWeight='700' margin='10px 0px 0px 0px' />
            <Paragraph text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged" />
            <br />
            <Paragraph text='Seller performance' fontSize={GlobalStyle.size.size24} fontWeight='700' margin='10px 0px 0px 0px' />
            <Meld>
                <RowBetween>
                    <Paragraph text='Order fulfilment rate:' />
                    <Paragraph text='Excellent' />
                </RowBetween>
            </Meld>
            <Meld>
                <RowBetween>
                    <Paragraph text='Successful order rate:' />
                    <Paragraph text='Excellent' />
                </RowBetween>
            </Meld>
            <Meld>
                <RowBetween>
                    <Paragraph text='Customer rating:' />
                    <Paragraph text='Excellent' />
                </RowBetween>
            </Meld>
            <br />
            <Paragraph text={`Store Items (${4} items)`} fontSize={GlobalStyle.size.size24} fontWeight='700' margin='10px 0px 0px 0px' />
            <br />
            <Slick {...categorySettings}>
                {
                    Items?.map(data => {
                        return <ItemDiv>
                            <Paragraph text={data} textAlign='center' fontSize={GlobalStyle.size.size10} />
                        </ItemDiv>
                    })
                }
            </Slick>
            <br />
            <Grid>
                {
                    // products?.map(data => {
                    //     const activeProducts = data?.variants?.find(dd => dd.status === 'active')
                    //     return <ProductContainer data={activeProducts} mini={false} name={data?.name} slug={data?.slug} />
                    // })
                    categoryDisplay?.map(data => {
                        return <ProductDiv onClick={() => router.push(`/product/${data?.name}`)}>
                            <ProdDiv>
                                <ContainerImage src={data?.image ? data?.image : "https://res.cloudinary.com/doouwbecx/image/upload/v1660556942/download_fcyeex.png"} />
                                <Paragraph text={data?.name?.length > 15 ? `${data?.name.substring(0, 15)}...` : data?.name} fontSize={GlobalStyle.size.size16} margin='4px 0px 0px 10px' />
                            </ProdDiv>
                        </ProductDiv>
                    })
                }
            </Grid>
            <br />
        </Container>
    )
}

export default DesktopStoreInfo

const Div = styled.div`

`
const Div2 = styled.div`
 margin-left: 3%;
`
const Meld = styled.div`
  margin: 5px 0px;
  width: 300px;
`
const Slick = styled(Slider)`
    width: 100% !important;
    margin-top: 10px;
`

const ItemDiv = styled.div`
border-radius: 10px;
background: ${GlobalStyle.color.darkBlack};
padding: 5px;
width: 50px !important;
margin-bottom: 10px;
`
const ProductDiv = styled.div`

`
const ProdDiv = styled.div`

`
const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    // display: grid;
    // grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    // grid-gap: 15px;

    // @media screen and (min-width: ) and (max-width:) {
    //     grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    //     grid-gap: 15px;
    // }
`
const ContainerImage = styled.img`
    width: 300px;
    height: 300px;
    margin: 10px;
`
