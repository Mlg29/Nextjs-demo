
import React, { useState, useEffect, useRef } from 'react'
import { chevronLeft } from '../../assets'
import { GlobalStyle } from '../../utils/themes/themes'
import { Progress, Rate, Breadcrumb } from 'antd';
import { Row, Col } from "react-bootstrap"
import * as CurrencyFormat from 'react-currency-format';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { Container } from './Styled'
import styled from 'styled-components';
import { RowAlignStart, RowBetween, RowStart } from '../../utils/StyledComponent';
import ImageContainer from '../Image';
import Paragraph from '../Paragraph';
import SelectField from '../SelectField';
import CommentCard from '../mobileComponents/reusable/CommentCard';
import Button from '../Button';
import { categoryDisplay } from '../../utils/constants/categories';
import { useRouter } from "next/router"
import ProductContainer from '../ProductContainer';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { addToCart, CartData, getCarts } from '../../slices/CartSlice';
import { getStoreRating, storeRatings } from '../../slices/StoreSlice';
import { getProduct, getProductBySlug } from '../../slices/ProductSlice';
import { toast, ToastContainer } from 'material-react-toastify';
import renderHTML from 'react-render-html';

import DesktopBuyerNavigation from './reusable/DesktopBuyerNavigation';
import Footer from '../Footer';




function DesktopProductInfo() {
    const [quantity, setQuantity] = useState(0)
    const router = useRouter()
    const dispatch = useAppDispatch();
    const [productDetail, setProductDetail] = useState(null)
    const cartInfo = useAppSelector(CartData);
    const slugName = router.query.slug as string
    const getUserToken = localStorage.getItem('token')
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
    const [products, setProducts] = useState(null)
    const [userData, setUserData] = useState(null);
    const getCartFromStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')) : null

    const [localCart, setLocalCart] = useState(getCartFromStorage)

    const onChange = async (checked: boolean) => {
    };


    useEffect(() => {
        const getCartFromStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')) : null
        setLocalCart(getCartFromStorage)

    }, [userData])



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
                dispatch(getProduct(d?.payload?.sidehustle?.id)).then((dd) => {
                    var newD = dd?.payload?.filter(mm => mm.id !== d?.payload?.id)
                    setProducts(newD)
                })

            }
            )
        if (getUserToken) {
            dispatch(getCarts())
            dispatch(getStoreRating(productDetail?.sidehustle?.id))
        }
    }, [slugName])

    const handleModalOpen = (id: string) => {
        setModalVisible(true)
        setId(id)
    }
    const handleModalClose = () => {
        setModalVisible(false)
    }

    function executeOnClick(isExpanded) {
    }

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
        //     productId: productDetail?.id,
        //     quantity: quantity,
        //     variantId: activeVariant?.variantId,
        //     specId: activeVariant?.specId,
        // };

        // const offlineData = {
        //     productId: productDetail?.id,
        //     variantImg: activeVariant.image,
        //     variantId: activeVariant?.variantId,
        //     name: productDetail?.name,
        //     quantity: quantity,
        //     price: activeVariant?.price,
        //     productQuantity: activeVariant?.quantity,
        //     specId: activeVariant?.specId,
        //     size: activeVariant?.size
        // };


        // if (getUserToken) {
        //     dispatch(addToCart(data)).then(() => {
        //         dispatch(getCarts())
        //         return toast.success("Product Added to Cart Successfully")
        //     })
        //     setQuantity(0)

        // }
        // else {
        //     var getExisting = JSON.parse(localStorage.getItem("cart"));
        //     if (getExisting == null) getExisting = [];

        //     var checkArr = getExisting.some((cart) => cart.id == productDetail?.id);
        //     //var checkArr = getExisting.some((cart) => cart.variantId === activeVariant?.variantId && cart.specId === activeVariant?.specId);

        //     if (checkArr) return;

        //     // Save allEntries back to local storage
        //     getExisting.push(offlineData);
        //     localStorage.setItem("cart", JSON.stringify(getExisting));

        //     setUserData(offlineData);
        //     setQuantity(0)
        //     return toast.success("Product Added to Cart Successfully")
        // }
        return router.push('/cart')
    }

    const buyNow = async () => {
        // const data = {
        //     productId: productDetail?.id,
        //     quantity: quantity,
        //     variantId: activeVariant?.variantId,
        //     specId: activeVariant?.specId,
        // };

        // const offlineData = {
        //     productId: productDetail?.id,
        //     variantImg: activeVariant.image,
        //     variantId: activeVariant?.variantId,
        //     name: productDetail?.name,
        //     quantity: quantity,
        //     price: activeVariant?.price,
        //     productQuantity: activeVariant?.quantity,
        //     specId: activeVariant?.specId,
        //     size: activeVariant?.size
        // };


        // if (getUserToken) {
        //     await dispatch(addToCart(data)).then(() => {
        //         dispatch(getCarts())
        //     })

        // }
        // else {
        //     var getExisting = JSON.parse(localStorage.getItem("cart"));
        //     if (getExisting == null) getExisting = [];

        //     var checkArr = getExisting.some((cart) => cart.id == productDetail?.id);
        //     //var checkArr = getExisting.some((cart) => cart.variantId === activeVariant?.variantId && cart.specId === activeVariant?.specId);
        //     setUserData(offlineData);
        //     if (checkArr) return;
        //     localStorage.setItem("newEntry", JSON.stringify(offlineData));
        //     // Save allEntries back to local storage
        //     getExisting.push(offlineData);
        //     await localStorage.setItem("cart", JSON.stringify(getExisting));

        // }
        return router.push('/cart')
    }


    return (
       <>
        <Cont>
            <DesktopBuyerNavigation />
            <Container>
                <br />
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>All Products</Breadcrumb.Item>
                    <Breadcrumb.Item>Shoe Category</Breadcrumb.Item>
                    <Breadcrumb.Item>Product Name</Breadcrumb.Item>
                    <Breadcrumb.Item>Product Name</Breadcrumb.Item>
                </Breadcrumb>
                <br />
                <Row>
                    <Col md="6" lg="7" xl="6" xxl="6">
                        <Divv>
                            <RowAlignStart>
                                <Div>
                                    {
                                        ["", ""]?.map((data, i) => {
                                            return <CategoryDiv key={i} >
                                                <CatDiv>
                                                    <ImageContainer type='square' source="https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/2_eyvshq.png" width={50} height={50} />
                                                </CatDiv>
                                            </CategoryDiv>
                                        })
                                    }
                                </Div>

                                <Div>
                                    <ImageContainer4 src="https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/2_eyvshq.png" />
                                </Div>
                            </RowAlignStart>
                        </Divv>

                        <RowStart>

                        </RowStart>
                    </Col>
                    <Col md="6" lg="5" xl="6" xxl="6">
                        <Subdiv1>
                            <RowBetween>
                                <div onClick={() => router.push(`/store/ankara`)}>
                                    <Paragraph text={`Visit the ankara store`} textDecoration='underline' />
                                </div>
                                <Paragraph text='share product' color={GlobalStyle.color.purple} />
                            </RowBetween>
                            <Paragraph text="Lazy wear" fontSize={GlobalStyle.size.size24} fontWeight="bold" margin="27px 0px 1px 0px" />
                            <RateDiv>
                                <Rate disabled allowHalf value={2} />
                                <Paragraph text={`${2} stars`} margin='10px 5px 0px 5px' fontSize={GlobalStyle.size.size12} />
                            </RateDiv>
                            <Paragraph text='Available size' fontSize={GlobalStyle.size.size14} fontWeight="400" margin="14px 0px 0px 0px" />
                            <SizeItem>
                                {
                                    ["M", "1 size"]?.map((data, i) => {
                                        return <SizeDiv key={i} style={{ backgroundColor: data === activeVariant?.size ? GlobalStyle.color.bazaraTint : GlobalStyle.color.artBoard }}>
                                            <Paragraph text={data} textAlign='center' />
                                        </SizeDiv>
                                    })
                                }
                            </SizeItem>
                            <Paragraph text='Available colours' fontSize={GlobalStyle.size.size14} fontWeight="400" margin="14px 0px 0px 0px" />
                            <Div2>
                                {
                                    ["", ""]?.map((data, i) => {
                                        return <CategoryDiv key={i} >
                                            <CatDiv>
                                                <ImageContainer type='square' source="https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/2_eyvshq.png" width={50} height={50} />
                                            </CatDiv>
                                        </CategoryDiv>
                                    })
                                }
                            </Div2>
                            <RowStart>
                                <CurrencyFormat value={10000} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size24} fontWeight='700' />} />
                            </RowStart>
                            <TagDiv>
                                <Paragraph text={`${10} item left`} textAlign='center' fontSize={GlobalStyle.size.size14} fontWeight="500" />
                            </TagDiv>
                            <Paragraph text='Quantity' fontSize={GlobalStyle.size.size14} fontWeight="400" margin="24px 0px 1px 0px" />
                            <ActDiv>
                                <RowBetween>
                                    <QuantityDiv>
                                        <Count onClick={() => decrement()}>
                                            <Paragraph text='-' fontSize={GlobalStyle.size.size30} fontWeight='400' />
                                        </Count>
                                        <Paragraph text={quantity.toString()} fontSize={GlobalStyle.size.size20} fontWeight='400' />
                                        <Count onClick={() => increment()}>
                                            <Paragraph text='+' fontSize={GlobalStyle.size.size30} fontWeight='400' />
                                        </Count>
                                    </QuantityDiv>
                                    <EmptyDiv></EmptyDiv>
                                </RowBetween>
                                <BtnDiv>
                                    <RowBetween>
                                        <Button disabled={activeVariant?.quantity === 0 && true} children='Add to Cart' handlePress={addItemToCart} />
                                        <EmptyDiv></EmptyDiv>
                                        <Button type='filter' disabled={activeVariant?.quantity === 0 && true} children='Buy' handlePress={buyNow} />
                                    </RowBetween>
                                </BtnDiv>
                            </ActDiv>
                        </Subdiv1>
                    </Col>
                </Row>
                <br />
                <Paragraph text='Description' fontSize={GlobalStyle.size.size24} fontWeight='700' margin='10px 0px' />
                <Paragraph text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged" />
                <br />
                <Paragraph text='Seller performance' fontSize={GlobalStyle.size.size24} fontWeight='700' margin='10px 0px 0px 0px' />
                <Meld>
                    <RowBetween>
                        <Paragraph text='Order fulfilment rate:' margin='10px 0px 0px 0px' />
                        <Rate disabled allowHalf value={4} />
                    </RowBetween>
                </Meld>
                <Meld>
                    <RowBetween>
                        <Paragraph text='Successful order rate:' margin='10px 0px 0px 0px' />
                        <Rate disabled allowHalf value={2.5} />
                    </RowBetween>
                </Meld>
                <Meld>
                    <RowBetween>
                        <Paragraph text='Customer rating:' margin='10px 0px 0px 0px' />
                        <Rate disabled allowHalf value={3} />
                    </RowBetween>
                </Meld>
                <br />
                <RowBetween>
                    <Paragraph text='Similar products' fontSize={GlobalStyle.size.size24} fontWeight='700' margin='10px 0px' />
                    {/* <Paragraph text='See all' fontSize={GlobalStyle.size.size14} color={GlobalStyle.color.bazaraTint} fontWeight='400' margin='10px 0px' /> */}
                </RowBetween>
                <SlickProduct {...productSettings}>
                    {/* {
                        products?.map(data => {
                            const activeProducts = data?.variants?.find(dd => dd.status === 'active')
                            return <ProductContainer data={activeProducts} mini={false} name={data?.name} slug={data?.slug} />
                        })
                    } */}
                    {
                          categoryDisplay?.map(data => {
                            return <ProductContainer data={data} mini={false} slug={data?.name} />
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
                    <Paragraph text='More products from the seller' fontSize={GlobalStyle.size.size24} fontWeight='700' margin='10px 0px' />
                    {/* <Paragraph text='See all' fontSize={GlobalStyle.size.size14} color={GlobalStyle.color.bazaraTint} fontWeight='400' margin='10px 0px' /> */}
                </RowBetween>
                <SlickProduct {...productSettings}>
                {
                          categoryDisplay?.map(data => {
                            return <ProductContainer data={data} mini={false} slug={data?.name} />
                        })
                    }
                </SlickProduct>
                <ToastContainer />
            </Container>
            <br/>
           
        </Cont> 
        <Footer />
       </>
    )
}

export default DesktopProductInfo

const Cont = styled.div`
width: 100%;
padding: 0% 60px;
`

const ContainerImage = styled.img`
    width: 100%;
    height: 160px;
`
const ContainerImage2 = styled.img`
    width: 300px;
    height: 300px;
    margin: 10px;
`
const MiniImg = styled.img`
   
`
const ProductDiv = styled.div`

`
const ProdDiv = styled.div`

`

const Image = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 10px;
    margin-bottom: 10px;
`
const RowDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const SubDiv = styled.div`
    width: 20%;
`
const SubDiv2 = styled.div`
    width: 20%;
    display: flex;
    justify-content: flex-end;
`

const ProgressDiv = styled.div`
    width: 60%;
    margin-top: -5px;
}
`
const Div = styled.div`
   display: flex;
   flex-direction: column;
   margin-right: 4%;
`

const Div2 = styled.div`
   display: flex;
   width: 100%;
   margin-bottom: 10px;
`

const Subdiv = styled.div`
   display: flex;
   flex-direction: column;
   width: 70%;
`
const Subdiv1 = styled.div`
   display: flex;
   flex-direction: column;
   width: 70%;

   @media screen and (min-width: 1301px) and (max-width: 1400px) {
    margin-left: 10em
   }
   @media screen and (min-width: 1401px) and (max-width: 1500px) {
    margin-left: 5em
   }
`

const RateDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const SelectDiv = styled.div`
    width: 150px;
`

const TagDiv = styled.div`
 background: rgba(255, 167, 219, 0.2);
 border-radius: 5px;
 max-width: 80px;
 margin-top:  4px;
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

const Count = styled.div`
    cursor: pointer;
`

const Meld = styled.div`
  margin: 5px 0px;
  width: 300px;
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

const ImageContainer3 = styled.img`
    width: 100%;
    height: 350px;
`
const Contain = styled.div`
width: 300px;
margin-left: 20px;
`

const CenterDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 12px 0%;
    width: 300px;
`

const RateBox = styled(Rate)`
    
`
const Buttons = styled.button`
    width: 100%;
    padding: 5px;
    border-radius: 15px;
    border: none;
    margin-top: 10px;
    color: ${GlobalStyle.color.black}
`
const SlickProduct = styled(Slider)`
    width: 100% !important;
    margin-top: 10px;
`

const ActDiv = styled.div`
   width: 450px;

   
   @media screen and (min-width: 1008px) and (max-width: 1300px) {
    width: 100%;
}
`

const EmptyDiv = styled.div`
   width: 20px;

`

const BtnDiv = styled.div`
   width: 400px;
   margin-top: 20px;
`

const Divv = styled.div`
    width: 100%;
`
const ImageContainer4 = styled.img`
    width: 600px;
    height: 500px;

    @media screen and (min-width: 1008px) and (max-width: 1080px) {
        width: 400px;
        height: 400px;
    }

    @media screen and (min-width: 1081px) and (max-width: 1300px) {
        width: 450px;
        height: 450px;
    }
`
const CategoryDiv = styled.div`
 margin: 10px 5px 10px 0px;
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