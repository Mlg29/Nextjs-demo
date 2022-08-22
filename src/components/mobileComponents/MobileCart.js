import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { bigBag, cancel, chevronLeft, del, delIcon, removeIcon } from '../../assets'
import { ColumnAlignStart, ColumnCenterGlobal, ColumnStart, RowBetween, RowStart } from '../../utils/StyledComponent'
import { GlobalStyle } from '../../utils/themes/themes'
import ImageContainer from '../Image'
import Paragraph from '../Paragraph'
import MobileHeader from './Header'
import { Container, IconImage } from './Styled'
import * as CurrencyFormat from "react-currency-format"
import Button from '../Button'
import EmptyState from './reusable/EmptyState'
import DeliveryModal from '../DeliveryModal'
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { useRouter } from "next/router"
import { AddressData, getAddress, updateAddress } from '../../slices/AddressSlice'
import { addToCart, cartCheckout, deleteCart, getCarts, updateCart } from '../../slices/CartSlice'
import { toast, ToastContainer } from 'material-react-toastify'
// import { PaystackButton } from "react-paystack";
import config from '../../config/config'
import { getCustomRoute } from 'next/dist/server/server-route-utils'
import { getProfile, profileInfo, updateProfile } from '../../slices/ProfileSlice'
import AddToCartModal from '../AddToCartModal'
import { Modal } from 'antd'
import TextInput from '../TextInput'
import { useFormik } from 'formik'
import { PhoneSchema } from '../../utils/schemas'




function MobileCart() {
    const [quantity, setQuantity] = useState(0)
    const [visible, setVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const addressList = useAppSelector(AddressData)
    const getUserToken = localStorage.getItem('token')
    const [getCartData, setGetCartData] = useState(null)
    const [activeDelivery, setActiveDelivery] = useState(null)
    const [userData, setUserData] = useState(null);
    const [phoneModalVisible, setPhoneModalVisible] = useState(false)
    const profileData = useAppSelector(profileInfo)

    const getCartFromStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')) : null

    const cartAmountLocal = getCartFromStorage && getCartFromStorage?.map((data) => data?.price * data.quantity);
    const cartTotalLocal = cartAmountLocal
        ? cartAmountLocal.length >= 1 && cartAmountLocal?.reduce((a, b) => a + b)
        : 0;

    const cartAmountLive = getCartData && getCartData?.map((data) => data?.price * data.quantity);
    const cartTotalLive = cartAmountLive?.length > 0
        ? cartAmountLive.length >= 1 && cartAmountLive?.reduce((a, b) => a + b) : 0;


    const openPhoneVisible = () => {
        setPhoneModalVisible(true)
    }
    const closePhoneVisible = () => {
        setPhoneModalVisible(false)
    }

    useEffect(() => {
        console.log("added");
    }, [userData]);

    const openVisible = () => {
        setVisible(true)
    }



    const closeVisible = () => {
        setVisible(false)
        dispatch(getAddress()).then((data) => {
            var filterDefault = data?.payload?.locations?.find(d => d.isDefault)
            setActiveDelivery(filterDefault)
        })
    }


    const openModalVisible = () => {
        setModalVisible(true)
    }



    const closeModalVisible = () => {
        setModalVisible(false)
    }


    const deliveryList =
        getCartData &&
        getCartData?.map((data, i) => {
            return {
                id: data.id,
                name: data?.productDetail?.sidehustle?.brandName,
                sidehustleId: data?.productDetail?.sidehustleId,
                shippingFee: data?.productDetail?.sidehustle?.shippingFees,
                locations: data?.productDetail?.sidehustle?.location,
            };
        });


    const dataDelivery = deliveryList?.filter((value, index) => {
        const _value = JSON.stringify(value?.sidehustleId);
        return index === deliveryList.findIndex(obj => {
            return JSON.stringify(obj?.sidehustleId) === _value;
        });
    });



    const newList =
        dataDelivery && dataDelivery?.map((data) => {
            return {
                id: data.id,
                sidehustleId: data?.sidehustleId,
                name: data?.name,
                shippingFee:
                    data?.locations?.state === activeDelivery?.state
                        ? data?.shippingFee?.withinLocation
                        : data?.shippingFee?.outsideLocation,
                locations: data?.locations,
            };
        });
    const calculatedFee = newList && newList?.map((data) => data?.shippingFee);

    const reducedFee = calculatedFee && calculatedFee?.reduce((a, b) => a + b, 0);


    console.log({activeDelivery})

    useEffect(() => {
        if (getUserToken) {
            if (getCartFromStorage?.length > 0) {
                openModalVisible()
            }
            else {
                dispatch(getCarts()).then((data) => {
                    setGetCartData(data?.payload)
                })
                dispatch(getAddress()).then((data) => {
                    var filterDefault = data?.payload?.locations?.find(d => d.isDefault)
                    setActiveDelivery(filterDefault)
                })
                dispatch(getProfile())
            }
        }
        else {

        }


    }, [getCartFromStorage])


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

                }))
            dispatch(getAddress()).then((data) => {
                var filterDefault = data?.payload?.locations?.find(d => d.isDefault)
                setActiveDelivery(filterDefault)
                closeModalVisible()
                localStorage.removeItem('checking')
            })
            dispatch(getProfile())
        })
        localStorage.removeItem('cart')
    }

    const handleDelete = () => {
        localStorage.removeItem('cart')
        localStorage.removeItem('checking')
        closeModalVisible()
    }

    const increment = (index, quantity) => {
        var newData = getCartFromStorage?.map((aa, i) => {
            if (i === index) {
                return {
                    name: aa.name,
                    price: aa?.price,
                    productId: aa.productId,
                    productQuantity: aa.productQuantity,
                    quantity: quantity + 1,
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
        setUserData(quantity)
        localStorage.setItem("cart", JSON.stringify(newData));

    }

    const decrement = (index, quantity) => {
        if (quantity < 1) {
            return;
        }
        var newData = getCartFromStorage?.map((aa, i) => {
            if (i === index) {
                return {
                    name: aa.name,
                    price: aa?.price,
                    productId: aa.productId,
                    productQuantity: aa.productQuantity,
                    quantity: quantity - 1,
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
        setUserData(quantity)
        localStorage.setItem("cart", JSON.stringify(newData));

    }

    const removeFromCart = (index) => {
        var newData = getCartFromStorage?.filter((dd, i) => i !== index)
        setUserData(index)
        localStorage.setItem("cart", JSON.stringify(newData));

    }

    const incrementLive = (index, data) => {
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

    const decrementLive = (index, data) => {
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

    const removeFromCartLive = (index, data) => {
        dispatch(deleteCart(data?.id)).then(() => {
            dispatch(getCarts()).then((data) => {
                setGetCartData(data?.payload)
            })
        })

    }

    const cartsId = getCartData && getCartData?.map((data) => data.id);

    const handlePaystackSuccessAction = (response) => {

        const payload = {
            cartIds: cartsId,
            paymentMethod: "escrow",
            deliveryMethod: "DHL",
            deliveryAddress: {
                state: activeDelivery?.state,
                city: activeDelivery?.city,
                street: activeDelivery?.street,
            },
            contact: profileData?.mobile,
            paymentStatus: "paid",
            referenceNo: response?.reference,
        }

        try {
            dispatch(cartCheckout(payload)).then(() => {
                return router.push('/buyer-orders')
            })
        }
        catch (e) {
            console.log({ e })
        }
    };

    const handlePaystackCloseAction = () => {
        console.log("closed");
    };




    const checkout = () => {
        if (!getUserToken) {
            toast.error("You need to be logged In")
            localStorage.setItem('checking', 'true')
            return router.push('/login')
        }
        else {

        }
    }

    const localCheckout = () => {
        if (!getUserToken) {
            toast.error("You need to be logged In")
            localStorage.setItem('checking', 'true')
            return router.push('/login')
        }
        else {

        }
    }

    const updateDelivery = (data) => {

        const payload = {
            id: data?._id,
            state: data?.state,
            city: data?.city,
            street: data?.street,
            isDefault: data?.isDefault ? false : true
        }
        dispatch(updateAddress(payload)).then(() => {
            setActiveDelivery(data)
            dispatch(getAddress())
        })
    }

    const requestAction = () => {
        if (profileData?.mobile?.length < 1) {
            return toast.error('Phone number is Required')
        }
        if (activeDelivery === null || activeDelivery === undefined) {
            return toast.error('Delivery Address is Required')
        }
        else {
            toast.error('No Item in Cart')
        }
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur, resetForm } =
    useFormik({
        initialValues: {
            mobile: profileData?.mobile ?profileData?.mobile :""
        },
        validationSchema: PhoneSchema,
        onSubmit: (data) => {
            const payload = {
                mobile: data?.mobile
            }
            try {
                dispatch(updateProfile(payload)).then(() => {
                    toast.success("Phone number added")
                    closePhoneVisible()
                    dispatch(getProfile())
                })
            }
            catch(e) {
                console.log(e)
            }
        },
        enableReinitialize: true
    });

    return (
        <Container>
            <MobileHeader
                icon={chevronLeft}
                header="My Cart"
            />
            <ColumnContain>
                <TopDiv>

                    {
                        ["", ""]?.length > 0 ?
                            <>
                                {
                                  <>
                                        <Paragraph text={`${["", ""]?.length} item(s)`} />
                                        {
                                            ["", ""]?.map((data, i) => {
                                                return <Div>
                                                    <RowBetween>
                                                        <RowStart>
                                                            <ImageContainer source="https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/2_eyvshq.png" type='square' width={45} height={45} />
                                                            <Paragraph text='' margin='0px 10px' />
                                                            <ColumnAlignStart>
                                                                <Paragraph text={"Lazy wears"} />
                                                                <CurrencyFormat value={1000} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size16} color={GlobalStyle.color.accent} fontWeight='700' />} />
                                                            </ColumnAlignStart>
                                                        </RowStart>
                                                        <QuantityDiv>
                                                            <div>
                                                                <Paragraph text='-' fontSize={GlobalStyle.size.size30} fontWeight='400' />
                                                            </div>
                                                            <Paragraph text={"3"} fontSize={GlobalStyle.size.size20} fontWeight='400' />
                                                            <div>
                                                                <Paragraph text='+' fontSize={GlobalStyle.size.size30} fontWeight='400' />
                                                            </div>
                                                        </QuantityDiv>
                                                    </RowBetween>
                                                    <RowStart>
                                                        <IconImage src={removeIcon} />
                                                        <Paragraph text='Remove item' fontSize={GlobalStyle.size.size12} fontWeight='400' color={GlobalStyle.color.bazaraTint} margin='0px 0px 0px 5px' />
                                                    </RowStart>
                                                </Div>
                                            })
                                        }
                                    </>
                                     
                                }
                            </>
                            :
                            <>
                                {
                                    getCartData?.length > 0 ? <>
                                        <Paragraph text={`${getCartData?.length} item(s)`} />
                                        {
                                            getCartData?.map((data, i) => {
                                                return <Div>
                                                    <RowBetween>
                                                        <RowStart>
                                                            <ImageContainer source={data?.variantImg} type='square' width={45} height={45} />
                                                            <Paragraph text='' margin='0px 10px' />
                                                            <ColumnAlignStart>
                                                                <Paragraph text={data?.name} />
                                                                <CurrencyFormat value={data?.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size16} color={GlobalStyle.color.accent} fontWeight='700' />} />
                                                            </ColumnAlignStart>
                                                        </RowStart>
                                                        <QuantityDiv>
                                                            <div onClick={() => decrementLive(i, data)}>
                                                                <Paragraph text='-' fontSize={GlobalStyle.size.size30} fontWeight='400' />
                                                            </div>
                                                            <Paragraph text={data?.quantity.toString()} fontSize={GlobalStyle.size.size20} fontWeight='400' />
                                                            <div onClick={() => incrementLive(i, data)}>
                                                                <Paragraph text='+' fontSize={GlobalStyle.size.size30} fontWeight='400' />
                                                            </div>
                                                        </QuantityDiv>
                                                    </RowBetween>
                                                    <RowStart onClick={() => removeFromCartLive(i, data)}>
                                                        <IconImage src={removeIcon} />
                                                        <Paragraph text='Remove item' fontSize={GlobalStyle.size.size12} fontWeight='400' color={GlobalStyle.color.bazaraTint} margin='0px 0px 0px 5px' />
                                                    </RowStart>
                                                </Div>
                                            })
                                        }
                                        <br />
                                        <Paragraph text='Delivery Address' fontSize={GlobalStyle.size.size13} fontWeight='400' />
                                        <Div1>
                                            {
                                                addressList?.locations?.map(data => {
                                                    return <Cod>
                                                        <RowStart>
                                                            <Checkbox style={{ background: data?.isDefault ? GlobalStyle.color.bazaraTint : 'transparent' }} onClick={() => updateDelivery(data)}></Checkbox>
                                                            <Paragraph text={data?.street + " " + data?.city + " " + data?.state} fontSize={GlobalStyle.size.size14} fontWeight='400' />
                                                        </RowStart>
                                                    </Cod>
                                                })
                                            }
                                        </Div1>
                                        <div onClick={() => openVisible()}>
                                            <Paragraph text='+ Add delivery address' fontSize={GlobalStyle.size.size14} color={GlobalStyle.color.bazaraTint} fontWeight='400' />
                                        </div>
                                        <br />
                                        <Paragraph text='Phone Number' fontSize={GlobalStyle.size.size13} fontWeight='400' />
                                        <Div1>
                                            {profileData?.mobile}
                                        </Div1>
                                        {
                                            profileData?.mobile === null ? <div onClick={() => openPhoneVisible()}>
                                                <Paragraph text='+ Add Phone Number' fontSize={GlobalStyle.size.size14} color={GlobalStyle.color.bazaraTint} fontWeight='400' />
                                            </div>
                                            : <div onClick={() => openPhoneVisible()}>
                                            <Paragraph text='+ Change Phone Number' fontSize={GlobalStyle.size.size14} color={GlobalStyle.color.bazaraTint} fontWeight='400' />
                                        </div>
                                        }
                                    </>
                                        : <ColumnCenterGlobal>
                                            <EmptyState
                                                icon={bigBag}
                                                title={'No Item In Cart Yet'}
                                                header={'Items will appear here once added to cart'}
                                            />
                                        </ColumnCenterGlobal>
                                }
                            </>
                    }





                </TopDiv>
            </ColumnContain>

            {
                getCartData?.length < 1 || getCartData === null ?
                    <BottomContain>
                        <RowBetween>
                            <Paragraph text='Sub total' />
                            <CurrencyFormat value={2000} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size16} color={GlobalStyle.color.bazaraTint} fontWeight='700' />} />
                        </RowBetween>
                        <RowBetween>
                            <Paragraph text='Total Payment' />
                            <CurrencyFormat value={parseInt(2000)} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size16} color={GlobalStyle.color.bazaraTint} fontWeight='700' />} />
                        </RowBetween>
                        <br />
                        <Button children='Checkout' handlePress={() => {}} />
                    </BottomContain>
                    :
                    <BottomContain>
                        <RowBetween>
                            <Paragraph text='Sub total' />
                            <CurrencyFormat value={cartTotalLive} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size16} color={GlobalStyle.color.bazaraTint} fontWeight='700' />} />
                        </RowBetween>
                        <RowBetween>
                            <Paragraph text='Delivery fee' />
                            <CurrencyFormat value={reducedFee} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size16} color={GlobalStyle.color.bazaraTint} fontWeight='700' />} />
                        </RowBetween>
                        <RowBetween>
                            <Paragraph text='Total Payment' />
                            <CurrencyFormat value={parseInt(cartTotalLive) + reducedFee} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size16} color={GlobalStyle.color.bazaraTint} fontWeight='700' />} />
                        </RowBetween>
                        <br />
                        {
                            getCartData?.length > 0 && profileData?.mobile?.length > 1 && activeDelivery !== null && activeDelivery !== undefined ? 
                            // <Btns
                            //     publicKey={config.payStack.testSecretKey}
                            //     email={profileData?.email}
                            //     amount={(parseInt(cartTotalLive) + reducedFee) * 100}
                            //     text="Check out"
                            //     phone={profileData?.mobile}
                            //     onSuccess={(ref) => handlePaystackSuccessAction(ref)}
                            //     onClose={() => handlePaystackCloseAction()}
                            // />
                            <Button handlePress={() => requestAction()} children="Check Out" />
                                : <Button handlePress={() => requestAction()} children="Check Out" />
                        }


                    </BottomContain>
            }

            <DeliveryModal
                visible={visible}
                setVisible={closeVisible}
            />

            <AddToCartModal
                visible={modalVisible}
                setVisible={closeModalVisible}
                handleAdd={handleAdd}
                handleDelete={handleDelete}
            />

            <Modal
                visible={phoneModalVisible}
                onCancel={closePhoneVisible}
                onOk={closePhoneVisible}
                footer={null}
                title={null}
            >
                <RowBetween>
                    <Paragraph text='Add Phone number' />
                    <div onClick={() => closePhoneVisible()}>
                        <IconImage 
                            src={cancel}
                        />
                    </div>
                </RowBetween>
                <TextInput
                    label='Add Phone Number'
                    required
                    value={values?.mobile}
                    onChange={handleChange('mobile')}
                    // errorMsg={touched.mobile ? errors.mobile : undefined}
                />
                <Button children='Add' handlePress={() => handleSubmit()} />
            </Modal>
            <ToastContainer />
        </Container>
    )
}

export default MobileCart

const TopDiv = styled.div`
    margin-top: 10px;
    height: 70vh;
    overflow-y: scroll;
`
const Div = styled.div`
    border-top: 1px solid ${GlobalStyle.color.lightwhite};
    padding: 15px;
`
const Checkbox = styled.div`
 width: 20px;
 height: 20px;
 border-radius: 50%;
 border: 1px solid ${GlobalStyle.color.bazaraTint};
 margin-right: 10px;
`

const Div1 = styled.div`

`
const Cod = styled.div`
    padding: 5px 0px;
`

export const BottomContain = styled.div`
flex: 1;
`

export const ColumnContain = styled.div`
  flex: 4;
`

const BottomDiv = styled.div`

`
const QuantityDiv = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 border: 1px solid ${GlobalStyle.color.lightwhite};
 width: 100px;
 padding: 5px 10px;
 border-radius: 5px;
`

// const Btns = styled(PaystackButton)`
//     width: 100%;
//     padding: 10px;
//     background: ${GlobalStyle.color.bazaraTint};
//     color: ${GlobalStyle.color.white};
//     border: none;
//     border-radius: 5px;
// `

