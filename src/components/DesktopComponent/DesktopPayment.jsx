import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { RowBetween, RowStart } from '../../utils/StyledComponent'
import { GlobalStyle } from '../../utils/themes/themes'
import Paragraph from '../Paragraph'
// import { PaystackButton } from "react-paystack";
import * as CurrencyFormat from 'react-currency-format';
import Button from '../Button'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { useRouter } from "next/router"
import { getProfile, profileInfo, updateProfile } from '../../slices/ProfileSlice'
import { addToCart, cartCheckout, getCarts } from '../../slices/CartSlice'
import { AddressData, getAddress, updateAddress } from '../../slices/AddressSlice'
import { PhoneSchema } from '../../utils/schemas'
import { toast, ToastContainer } from 'material-react-toastify'
import DeliveryModal from '../DeliveryModal'
import AddToCartModal from '../AddToCartModal'
import { Modal } from 'antd'
import { IconImage } from './Styled'
import { cancel } from '../../assets'
import TextInput from '../TextInput'
import config from '../../config/config'


function DesktopPayment() {
    const profileData = useAppSelector(profileInfo)
    const getUserToken = localStorage.getItem('token')
    const router = useRouter();
    const [phoneModalVisible, setPhoneModalVisible] = useState(false)

    const [visible, setVisible] = useState(false)
    const dispatch = useAppDispatch()
    const [getCartData, setGetCartData] = useState(null)
    const [activeDelivery, setActiveDelivery] = useState(null)
    const addressList = useAppSelector(AddressData)


    const cartAmountLive = getCartData && getCartData?.map((data) => data?.price * data.quantity);
    const cartTotalLive = cartAmountLive?.length > 0
        ? cartAmountLive.length >= 1 && cartAmountLive?.reduce((a, b) => a + b) : 0;


    const openPhoneVisible = () => {
        setPhoneModalVisible(true)
    }
    const closePhoneVisible = () => {
        setPhoneModalVisible(false)
    }

    const openVisible = () => {
        setVisible(true)
    }

    const closeVisible = () => {
        setVisible(false)
        dispatch(getAddress()).then((d) => {
            var filterDefault = d?.payload?.locations?.find(d => d.isDefault)
            setActiveDelivery(filterDefault)
        })
    }


    useEffect(() => {
        dispatch(getCarts()).then((dd) => {
            setGetCartData(dd.payload)

        })
        dispatch(getAddress()).then((data) => {
            var filterDefault = data?.payload?.locations?.find(d => d.isDefault)
            setActiveDelivery(filterDefault)
        })
        dispatch(getProfile())
    }, [])


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






    const { values, errors, touched, handleChange, handleSubmit, handleBlur, resetForm } =
        useFormik({
            initialValues: {
                mobile: profileData?.mobile ? profileData?.mobile : ""
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
                catch (e) {
                    console.log(e)
                }
            },
            enableReinitialize: true
        });

       
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

    return (
        <Contain>
            <Row>
                <Col lg="9">
                    <Div2>
                        <Paragraph text='Checkout' fontSize={GlobalStyle.size.size24} fontWeight='700' />
                        <br />
                        <Paragraph text='1.  Delivery Address' fontSize={GlobalStyle.size.size18} fontWeight='700' />
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
                            <Paragraph text='+ Add delivery address' fontSize={GlobalStyle.size.size16} color={GlobalStyle.color.bazaraTint} fontWeight='400' margin='0px 20px' />
                        </div>
                        <br />
                        <Paragraph text='2. Phone Number' fontSize={GlobalStyle.size.size18} fontWeight='700' />
                        <Div1>
                            <Paragraph text={profileData?.mobile} fontSize={GlobalStyle.size.size16} fontWeight='400' margin='0px 20px' />
                        </Div1>
                        {
                            profileData?.mobile === null ? <div onClick={() => openPhoneVisible()}>
                                <Paragraph text='+ Add phone number' fontSize={GlobalStyle.size.size16} color={GlobalStyle.color.bazaraTint} fontWeight='400' margin='0px 20px' />
                            </div>
                                :
                                <div onClick={() => openPhoneVisible()}>
                                    <Paragraph text='+ Change phone number' fontSize={GlobalStyle.size.size16} color={GlobalStyle.color.bazaraTint} fontWeight='400' margin='0px 20px' />
                                </div>
                        }
                        <br />
                    </Div2>

                </Col>

                <Col lg="3">
                    <Div>
                        <Paragraph text='Order Summary' fontSize={GlobalStyle.size.size18} fontWeight='700' />
                        <RowBetween>
                            <Paragraph text='Subtotal' fontSize={GlobalStyle.size.size12} fontWeight='700' />
                            <CurrencyFormat value={1500} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size16} fontWeight='700' />} />
                        </RowBetween>
                        <RowBetween>
                            <Paragraph text='Delivery and tax not included' fontSize={GlobalStyle.size.size12} fontWeight='700' />
                            <CurrencyFormat value={500} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size16} fontWeight='700' />} />
                        </RowBetween>
                        <br />
                        <RowBetween>
                            <Paragraph text='Total' fontSize={GlobalStyle.size.size13} fontWeight='700' />
                            <CurrencyFormat value={2000} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size16} fontWeight='700' />} />
                        </RowBetween>

                    </Div>
                </Col>
            </Row>
            <br />
            <SubDiv>
                <MiniDiv>
                    {
                        getCartData?.length > 0 && profileData?.mobile?.length > 1 && activeDelivery !== null && activeDelivery !== undefined ?
                        //  <Btns
                        //     publicKey={config.payStack.testSecretKey}
                        //     email={profileData?.email}
                        //     amount={(parseInt(cartTotalLive) + reducedFee) * 100}
                        //     text="Check out"
                        //     phone={profileData?.mobile}
                        //     onSuccess={(ref) => handlePaystackSuccessAction(ref)}
                        //   //  onSuccess={() => console.log(this, "hello")}
                        //     onClose={() => handlePaystackCloseAction()}
                        // />
                        <Button handlePress={() => requestAction()} children="Check Out" />
                            : <Button handlePress={() => requestAction()} children="Check Out" />
                    }
                </MiniDiv>
            </SubDiv>

            <DeliveryModal
                visible={visible}
                setVisible={closeVisible}
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
        </Contain>
    )
}

export default DesktopPayment

const Contain = styled.div`
    padding: 10px 0px;
    border-bottom: 1px solid ${GlobalStyle.color.lightwhite}
`

const Div2 = styled.div`
    padding: 16px 24px;
`

const Div = styled.div`
    background: ${GlobalStyle.color.darkBlack};
    padding: 16px 24px;
`
const MiniDiv = styled.div`
   width: 200px;
`
const SubDiv = styled.div`
   display: flex;
   justify-content: flex-end;
   align-items: flex-end;
   width: 70%;
   margin-bottom: 5%;
`
const Div1 = styled.div`

`
const Cod = styled.div`
    padding: 5px 0px;
`
const Checkbox = styled.div`
 width: 20px;
 height: 20px;
 border-radius: 50%;
 border: 1px solid ${GlobalStyle.color.bazaraTint};
 margin-right: 10px;
`
// const Btns = styled(PaystackButton)`
//     width: 100%;
//     padding: 10px;
//     background: ${GlobalStyle.color.bazaraTint};
//     color: ${GlobalStyle.color.white};
//     border: none;
//     border-radius: 5px;
// `
