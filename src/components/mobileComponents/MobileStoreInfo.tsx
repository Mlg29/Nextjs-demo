import React, { useState, useEffect } from 'react'
import { chevronLeft } from '../../assets'
import MobileHeader from './Header'
import { Container } from './Styled'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { RowBetween, RowStart } from '../../utils/StyledComponent'
import styled from 'styled-components'
import ImageContainer from '../Image'
import Paragraph from '../Paragraph'
import { getStoreBySlug, storeBySlug } from '../../slices/CategorySlice'
import { GlobalStyle } from '../../utils/themes/themes'
import { Rate } from 'antd';
import * as CurrencyFormat from 'react-currency-format';
import Slider from "react-slick";
import { categoryDisplay } from '../../utils/constants/categories'
import ProductContainer from '../ProductContainer'
import renderHTML from 'react-render-html';

import { getProduct } from '../../slices/ProductSlice'

function MobileStoreInfo() {
  const dispatch = useAppDispatch()
  const [storeBySlugData, setStoreBySlugData] = useState(null)
  const [products, setProducts] = useState(null)

  const router = useRouter()
  const slugName = router?.query?.slug as string
  
  function executeOnClick(isExpanded) {
  }

  useEffect(() => {
    dispatch(getStoreBySlug(slugName)).then(async data => {
      setStoreBySlugData(data?.payload)
      await dispatch(getProduct(data?.payload?.id)).then((dd) => setProducts(dd.payload))
    })
  }, [slugName])



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
      <MobileHeader
        icon={chevronLeft}
        header="Store detail page"
      />
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
      <Paragraph text='Store Description' fontSize={GlobalStyle.size.size18} fontWeight='400' />
      <Paragraph text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged" />
            <br />
      <Paragraph text='Seller performance' fontSize={GlobalStyle.size.size18} fontWeight='400' />
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
      <Paragraph text={`Store Items (${products?.length} items)`} fontSize={GlobalStyle.size.size18} fontWeight='400' />
      <Slick {...categorySettings}>
        {
          Items?.map(data => {
            return <ItemDiv>
              <Paragraph text={data} textAlign='center' fontSize={GlobalStyle.size.size10} />
            </ItemDiv>
          })
        }
      </Slick>
      <Grid>
        {
          // products?.map(data => {
          //   const activeProducts = data?.variants?.find(dd => dd.status === 'active')
          //  if (activeProducts){ 
          //   return <ProductDiv onClick={() => router.push(`/product/${data?.slug}`)}>
          //     <ProdDiv>
          //       <ContainerImage src={activeProducts?.variantImg ? activeProducts?.variantImg : "https://res.cloudinary.com/doouwbecx/image/upload/v1660556942/download_fcyeex.png"} />
          //       <Paragraph text={data?.name?.length > 15 ? `${data?.name.substring(0, 15)}...` : data?.name} fontSize={GlobalStyle.size.size16} margin='4px 0px 0px 10px' />
          //       <CurrencyFormat value={activeProducts?.spec[0]?.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph margin='0px 0px 0px 10px' text={`${value}`} fontSize={GlobalStyle.size.size16} color={GlobalStyle.color.accent} fontWeight='700' />} />
          //     </ProdDiv>
          //   </ProductDiv>
          //  }
          //  else {
          //   null
          //  }
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
const Meld = styled.div`
  margin: 5px 0px;
`
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