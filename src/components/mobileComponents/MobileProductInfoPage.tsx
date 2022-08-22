import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from "../../app/hook"
import { useRouter } from "next/router"
import { getProductBySlug, productBySlug } from '../../slices/ProductSlice';
import { Container, IconImage } from './Styled';
import MobileHeader from './Header';
import { chevronLeft, rate } from '../../assets';
import ImageContainer from '../Image';
import Paragraph from '../Paragraph';
import { RowBetween, RowStart } from '../../utils/StyledComponent';
import { Rate } from 'antd';
import { GlobalStyle } from '../../utils/themes/themes';
import * as CurrencyFormat from 'react-currency-format';
import styled from 'styled-components';
import Slider from "react-slick";
import Button from '../Button';
import RatingModal from '../RatingModal';
import { addToCart, CartData, getCarts } from '../../slices/CartSlice';
import renderHTML from 'react-render-html';
import { toast, ToastContainer } from 'material-react-toastify';
import { getStoreRating, storeRatings } from '../../slices/StoreSlice';



function MobileProductInfoPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [productDetail, setProductDetail] = useState(null)
  const cartInfo = useAppSelector(CartData);
  const slugName = router.query.slug as string
  const getUserToken = localStorage.getItem('token')
  const [quantity, setQuantity] = useState(0)
  const [activeVariant, setActiveVariant] = useState({
    image: "",
    price: "",
    size: "",
    quantity: 0,
    specId: "",
    variantId: "",
  })
  const [variantList, setVariantList] = useState(null)
  const [variantSpec, setVariantSpec] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [id, setId] = useState("")
  const storeRating = useAppSelector(storeRatings)



  const handleModalOpen = (id: string) => {
    setModalVisible(true)
    dispatch(getStoreRating(productDetail?.sidehustle?.id))
  }
  const handleModalClose = () => {
    setModalVisible(false)
  }

  function executeOnClick(isExpanded) {
  }


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

  useEffect(() => {
    dispatch(getProductBySlug(slugName))
      .then((d) => {
        const act = d?.payload?.variants?.filter(dd => dd.status === 'active')
        setActiveVariant({
          image: act && act[0]?.variantImg,
          price: act && act[0]?.spec[0]?.price,
          size: act && act[0]?.spec[0]?.size,
          quantity: act && act[0]?.spec[0]?.quantity,
          specId: act && act[0]?.spec[0]?._id,
          variantId: act && act[0]?._id
        })
        setVariantList(act)
        setVariantSpec(act && act[0]?.spec)
        setProductDetail(d.payload)
      }
      )
    if (getUserToken) {
      dispatch(getCarts())
      dispatch(getStoreRating(productDetail?.sidehustle?.id))
    }
  }, [slugName])


  const handleImageChange = (data) => {
    setActiveVariant({
      image: data?.variantImg,
      price: data?.spec[0]?.price,
      size: data?.spec[0].size,
      quantity: data?.spec[0]?.quantity,
      specId: data?.spec[0]._id,
      variantId: data?._id
    })
    setVariantSpec(data?.spec)
  }

  const handleSizeChange = (data) => {
    setActiveVariant({
      image: activeVariant?.image,
      price: data?.price,
      size: data?.size,
      quantity: data?.quantity,
      specId: activeVariant?.specId,
      variantId: activeVariant?.variantId
    })
  }

  const increment = () => {
    if (quantity >= activeVariant?.quantity) {
      toast.error("Quantity in stock exceeded")
      return;
    }
    setQuantity(prev => prev + 1)
  }

  const decrement = () => {
    setQuantity(prev => prev < 1 ? prev : prev - 1)
  }

  const addItemToCart = () => {
    // const data = {
    //   productId: productDetail?.id,
    //   quantity: quantity,
    //   variantId: activeVariant?.variantId,
    //   specId: activeVariant?.specId,
    // };

    // const offlineData = {
    //   productId: productDetail?.id,
    //   variantImg: activeVariant.image,
    //   variantId: activeVariant?.variantId,
    //   name: productDetail?.name,
    //   quantity: quantity,
    //   price: activeVariant?.price,
    //   productQuantity: activeVariant?.quantity,
    //   specId: activeVariant?.specId,
    //   size: activeVariant?.size
    // };


    // if (getUserToken) {
    //   dispatch(addToCart(data)).then(() => {
    //     return toast.success("Product Added to Cart Successfully")
    //   })

    // }
    // else {
    //   var getExisting = JSON.parse(localStorage.getItem("cart"));
    //   if (getExisting == null) getExisting = [];

    //   var checkArr = getExisting.some((cart) => cart.id == productDetail?.id);
    //   //var checkArr = getExisting.some((cart) => cart.variantId === activeVariant?.variantId && cart.specId === activeVariant?.specId);

    //   if (checkArr) return;

    //   // Save allEntries back to local storage
    //   getExisting.push(offlineData);
    //   localStorage.setItem("cart", JSON.stringify(getExisting));

    //   return toast.success("Product Added to Cart Successfully")
    // }
    return router.push('/cart')
  }

  const buyNow = async () => {
    // const data = {
    //   productId: productDetail?.id,
    //   quantity: quantity,
    //   variantId: activeVariant?.variantId,
    //   specId: activeVariant?.specId,
    // };

    // const offlineData = {
    //   productId: productDetail?.id,
    //   variantImg: activeVariant.image,
    //   variantId: activeVariant?.variantId,
    //   name: productDetail?.name,
    //   quantity: quantity,
    //   price: activeVariant?.price,
    //   productQuantity: activeVariant?.quantity,
    //   specId: activeVariant?.specId,
    //   size: activeVariant?.size
    // };


    // if (getUserToken) {
    //   await dispatch(addToCart(data)).then(() => {
    //   })

    // }
    // else {
    //   var getExisting = JSON.parse(localStorage.getItem("cart"));
    //   if (getExisting == null) getExisting = [];

    //   var checkArr = getExisting.some((cart) => cart.id == productDetail?.id);
    //   //var checkArr = getExisting.some((cart) => cart.variantId === activeVariant?.variantId && cart.specId === activeVariant?.specId);

    //   if (checkArr) return;
    //   localStorage.setItem("newEntry", JSON.stringify(offlineData));
    //   // Save allEntries back to local storage
    //   getExisting.push(offlineData);
    //   await localStorage.setItem("cart", JSON.stringify(getExisting));

    // }
    return router.push('/cart')
  }

  return (
    <Container>
      <MobileHeader
        icon={chevronLeft}
        header="Product detail page"
      />
      <ImageContainer source="https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/2_eyvshq.png" height={200} />
      <br />
      <ScrollView>
        <Paragraph text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to" />
        <RowBetween>
          <div onClick={() => router.push(`/store/ankara`)}>
            <Paragraph text="ankara store" textDecoration='underline' />
          </div>
          <div style={{ display: "flex", alignItems: 'center' }} onClick={getUserToken ? () => handleModalOpen(productDetail?.id) : null}>
            <IconImage src={rate} />
            <Paragraph text={`${2} stars`} margin='0px 3px' />
          </div>
        </RowBetween>
        <CurrencyFormat value={activeVariant?.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size14} color={GlobalStyle.color.accent} fontWeight='700' />} />
        <br />
        <Paragraph text='Available Colours' fontSize={GlobalStyle.size.size16} fontWeight='600' />
        <Slick {...categorySettings}>
          {
            ["", ""]?.map((data, i) => {
              return <CategoryDiv key={i} >
                <CatDiv>
                  <ImageContainer type='square' source="https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/2_eyvshq.png" width={50} height={50} />
                </CatDiv>
              </CategoryDiv>
            })
          }
        </Slick>
        <br />
        <Paragraph text='Available Sizes' fontSize={GlobalStyle.size.size16} fontWeight='600' />
        <SizeItem>
        {
                                    ["M", "1 size"]?.map((data, i) => {
                                        return <SizeDiv key={i} style={{ backgroundColor: data === activeVariant?.size ? GlobalStyle.color.bazaraTint : GlobalStyle.color.artBoard }}>
                                            <Paragraph text={data} textAlign='center' />
                                        </SizeDiv>
                                    })
                                }
        </SizeItem>
        <br />
        <RowStart>
          <Paragraph text='Quantity' fontSize={GlobalStyle.size.size16} fontWeight='600' />
          <Span>*</Span>
        </RowStart>
        <QuantityDiv>
          <div onClick={() => decrement()}>
            <Paragraph text='-' fontSize={GlobalStyle.size.size30} fontWeight='400' />
          </div>
          <Paragraph text={quantity.toString()} fontSize={GlobalStyle.size.size20} fontWeight='400' />
          <div onClick={() => increment()}>
            <Paragraph text='+' fontSize={GlobalStyle.size.size30} fontWeight='400' />
          </div>
        </QuantityDiv>
        <br />
        <Paragraph text='Description' fontSize={GlobalStyle.size.size16} fontWeight='600' />
        <Paragraph text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy" />
      </ScrollView>
      <br />
      <RowBetween>
        <Box>
          <Button type='cancel' children='Add to Cart' handlePress={addItemToCart} />
        </Box>
        <Box>
          <Button children='Buy Now' handlePress={buyNow} />
        </Box>
      </RowBetween>

      <RatingModal
        modalVisible={modalVisible}
        setModalVisible={handleModalClose}
        data={productDetail}
        rate={storeRating}
      />

      <ToastContainer />
    </Container>
  )
}

export default MobileProductInfoPage

const CategoryDiv = styled.div`

`

const Slick = styled(Slider)`
    width: 100% !important;
    margin-top: 10px;
`
const CatDiv = styled.div`
    display: flex;
    flex-direction: column;
`
const SizeItem = styled.div`
  display: flex;
  margin-top: 5px;
`
const SizeDiv = styled.div`
  padding: 5px;
  border-radius: 10px;
  width: 50px;
  margin-right: 15px;
`
const QuantityDiv = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 border: 1px solid ${GlobalStyle.color.lightwhite};
 width: 200px;
 padding: 10px 10px;
 border-radius: 5px;
`
const Span = styled.span`
  color: red;
  margin-left: 3px;
`
const Box = styled.div`
  width: 49%;
`

const ScrollView = styled.div`
  height: 60%;
  overflow-y: scroll;
  ms-overflow-style: none;
  scrollbar-width: none;

    ::-webkit-scrollbar {
      display: none;
    }
`