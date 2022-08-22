import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { ColumnCenterGlobal, RowAlignStart, RowBetween, RowBetweenStart, RowStart } from '../../utils/StyledComponent'
import { GlobalStyle } from '../../utils/themes/themes'
import Paragraph from '../Paragraph'
import CartContainer from './reusable/CartContainer'
import * as CurrencyFormat from 'react-currency-format';
import Button from '../Button'
import Slider from "react-slick";
import ImageContainer from '../Image'
import { categoryDisplay } from '../../utils/constants/categories'
import ProductContainer from '../ProductContainer'
import { useRouter } from 'next/router'
import { IconImage } from './Styled'
import { bigBag, removeIcon } from '../../assets'
import AddToCartModal from '../AddToCartModal'
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { addToCart, deleteCart, getCarts, updateCart } from '../../slices/CartSlice'
import { toast, ToastContainer } from 'material-react-toastify'
import EmptyState from '../mobileComponents/reusable/EmptyState'




function DesktopCart() {
    const router = useRouter();
    const [getCartData, setGetCartData] = useState(null)
    const getCartFromStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')) : null
    const getUserToken = localStorage.getItem('token')
    const [userData, setUserData] = useState(null);
    const dispatch = useAppDispatch()
    const [modalVisible, setModalVisible] = useState(false)


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

    const openModalVisible = () => {
        setModalVisible(true)
    }




    const closeModalVisible = () => {
        setModalVisible(false)
    }

    const handleAdd = async () => {
        await getCartFromStorage?.map(data => {
            dispatch(addToCart(
                {
                    productId: data?.productId,
                    quantity: data?.quantity,
                    variantId: data?.variantId,
                    specId: data?.specId,
                }
            )).then((d) =>
                dispatch(getCarts()).then((data) => {
                    setGetCartData(data?.payload)
                    closeModalVisible()
                }))
        })
        localStorage.removeItem('cart')
    }

    const handleDelete = () => {
        localStorage.removeItem('cart')
        localStorage.removeItem('checking')
        closeModalVisible()
    }

    useEffect(() => {
        if (getUserToken) {
            if (getCartFromStorage?.length > 0) {
                openModalVisible()
            }
            else {
                dispatch(getCarts()).then((data) => {
                    setGetCartData(data?.payload)
                })
            }
        }
        else {

        }

    }, [getCartFromStorage])

    useEffect(() => {
        console.log("added");
    }, [userData]);

    const cartAmountLocal = getCartFromStorage && getCartFromStorage?.map((data) => data?.price * data.quantity);
    const cartTotalLocal = cartAmountLocal
        ? cartAmountLocal.length >= 1 && cartAmountLocal?.reduce((a, b) => a + b)
        : 0;

    const cartAmountLive = getCartData && getCartData?.map((data) => data?.price * data.quantity);
    const cartTotalLive = cartAmountLive?.length > 0
        ? cartAmountLive.length >= 1 && cartAmountLive?.reduce((a, b) => a + b) : 0;




    const increment = (data, i) => {
        console.log({ data })
        var newData = getCartFromStorage?.map((aa, kk) => {
            if (kk === i) {
                return {
                    name: aa.name,
                    price: aa?.price,
                    productId: aa.productId,
                    productQuantity: aa.productQuantity,
                    quantity: data?.quantity + 1,
                    specId: aa?.specId,
                    variantId: aa?.variantId,
                    variantImg: aa?.variantImg,
                    size: aa?.size,
                }
            }
            else {
                return aa
            }
        })
        setUserData(data?.quantity)
        localStorage.setItem("cart", JSON.stringify(newData));

    }

    const decrement = (data, i) => {
        if (data?.quantity < 1) {
            return;
        }
        var newData = getCartFromStorage?.map((aa, kk) => {
            if (kk === i) {
                return {
                    name: aa.name,
                    price: aa?.price,
                    productId: aa.productId,
                    productQuantity: aa.productQuantity,
                    quantity: data?.quantity - 1,
                    specId: aa?.specId,
                    variantId: aa?.variantId,
                    variantImg: aa?.variantImg,
                    size: aa?.size,
                }
            }
            else {
                return aa
            }
        })
        setUserData(data?.quantity)
        localStorage.setItem("cart", JSON.stringify(newData));

    }

    const removeFromCart = (index) => {
        var newData = getCartFromStorage?.filter((dd, i) => i !== index)
        setUserData(index)
        localStorage.setItem("cart", JSON.stringify(newData));

    }

    const incrementLive = (data, index) => {
        const payload = {
            id: data?.id,
            quantity: data?.quantity + 1
        }
        dispatch(updateCart(payload)).then(() => {
            dispatch(getCarts()).then((data) => {
                setGetCartData(data?.payload)
            })
        })

    }

    const decrementLive = (data, index) => {
        if (data?.quantity < 1) {
            return;
        }
        const payload = {
            id: data?.id,
            quantity: data?.quantity - 1
        }

        dispatch(updateCart(payload)).then(() => {
            dispatch(getCarts()).then((data) => {
                setGetCartData(data?.payload)
            })
        })


    }

    const removeFromCartLive = (data, index) => {
        dispatch(deleteCart(data?.id)).then(() => {
            dispatch(getCarts()).then((data) => {
                setGetCartData(data?.payload)
            })
        })

    }

    const handleProceed = () => {
        // if (getUserToken) {
        //     if(getCartData?.length > 0) {
        //          localStorage.removeItem('checking')
        //     return router.push('/payment')
        //     }
        //     else {
        //         toast.error("You have no item in cart")
        //     }
           
        // }
        // else {
        //    if(getCartFromStorage !== null) {
        //     toast.error("You need to be logged In")
        //     localStorage.setItem('checking', 'true')
        //     return router.push('/login')
        //    }
        //    else {
        //     toast.error("You have no item in cart")
        // }
        // }
        return router.push('/payment')

    }

    return (
        <Contain>
            <Row>
                <Col lg="9">
                    <Div>
                        <Paragraph text={`Shopping Cart (${getUserToken ? getCartData?.length : getCartFromStorage === null ? 0 : getCartFromStorage?.length} items)`} fontSize={GlobalStyle.size.size24} fontWeight='700' />
                        <br />
                        {
                             ["", ""]?.length > 0 ?
                                <>
                                    {
                                         ["", ""]?.map((data, i) => {
                                            return <CartContainer data={data} index={i} removeFromCart={() => removeFromCart(i)} localIncrement={() => increment(data, i)} localDecrement={() => decrement(data, i)} />
                                        })
                                    }
                                </>
                                :
                                <>
                                    {
                                        getCartData?.length > 0 ? <>
                                            {
                                                getCartData?.map((data, i) => {
                                                    var newD = {
                                                        name: data?.productDetail?.name,
                                                        size: data?.size,
                                                        variantImg: data?.variantImg,
                                                        quantity: data?.quantity,
                                                        specId: data?.specId,
                                                        variantId: data?.variantId,
                                                        price: data?.price
                                                    }
                                                    return <CartContainer data={newD} index={i} removeFromCart={() => removeFromCartLive(data, i)} localIncrement={() => incrementLive(data, i)} localDecrement={() => decrementLive(data, i)} />
                                                })
                                            }
                                        </> : <></>
                                    }
                                </>
                        }

{
                getCartData?.length < 1 && getCartFromStorage === null && <ColumnCenterGlobal>
                    <EmptyState
                        icon={bigBag}
                        title={'No Item In Cart Yet'}
                        header={'Items will appear here once added to cart'}
                    />
                </ColumnCenterGlobal>
            }
                    </Div>
                    

                </Col>

                <Col lg="3">
                    <Div>
                        <Paragraph text='Summary' fontSize={GlobalStyle.size.size18} fontWeight='700' />
                        <RowBetweenStart>
                            <MiniDiv>
                                <Paragraph text='Subtotal' fontSize={GlobalStyle.size.size12} fontWeight='700' />
                                <Paragraph text='Delivery and tax not included' fontSize={GlobalStyle.size.size10} fontWeight='700' />
                            </MiniDiv>
                            <CurrencyFormat value={!getUserToken ? 2000 : cartTotalLive} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size16} fontWeight='700' />} />
                        </RowBetweenStart>
                        <br />
                        <Button children='Proceed to checkout' handlePress={() => handleProceed()} />
                    </Div>
                </Col>
            </Row>
            <br />
            <RowBetween>
                <RowStart>
                    <Paragraph text="Previously viewed products" fontSize={GlobalStyle.size.size24} />
                </RowStart>
            </RowBetween>
            <SlickProduct {...productSettings}>
                {
                    categoryDisplay?.map(data => {
                        return <ProductContainer data={data} mini={false} />
                    })
                }
            </SlickProduct>
            <br />

            <AddToCartModal
                visible={modalVisible}
                setVisible={closeModalVisible}
                handleAdd={handleAdd}
                handleDelete={handleDelete}
            />
            <ToastContainer />
        </Contain>
    )
}

export default DesktopCart

const Contain = styled.div`
    padding: 10px 0px;
    border-bottom: 1px solid ${GlobalStyle.color.lightwhite}
`

const Div = styled.div`
    background: ${GlobalStyle.color.darkBlack};
    padding: 16px 24px;
`
const MiniDiv = styled.div`
   
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

