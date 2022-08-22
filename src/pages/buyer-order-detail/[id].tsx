import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hook'

import { useRouter } from "next/router"
import { changeOrderStatus, getSellerOrderDetail, sellerOrderDetails, orderLoader, resetData, getBuyerOrders, buyerOrders } from '../../slices/OrderSlice'
import { Container, IconImage } from '../../components/mobileComponents/Styled'
import { RowStart, RowAlignStart, RowBetween } from '../../utils/StyledComponent'
import { calender, chevronLeft, copy, pin } from '../../assets'
import Paragraph from '../../components/Paragraph'
import styled from 'styled-components'
import { Tag, Divider } from "antd"
import { GlobalStyle } from '../../utils/themes/themes'
import ImageContainer from '../../components/Image'
import * as CurrencyFormat from "react-currency-format"
import Button from '../../components/Button'
import ResponseModal from '../../components/Modal/ResponseModal'
import OrderActionModal from '../../components/OrderActionModal'
import OrderDetailSkeleton from '../../components/SkelentonLoader/Mobile/OrderDetailSkeleton'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast, ToastContainer } from 'material-react-toastify';




function BuyerOrderDetails() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [loader, setLoader] = useState(false)
    const [responseTitle, setResponseTitle] = useState('')
    const [responseType, setResponseType] = useState('')
    const [responseVisible, setResponseVisible] = useState(false)
    const buyerOrderList = useAppSelector(buyerOrders)
    const [action, setAction] = useState('')
    const [orderModalVisible, setOrderModalVisible] = useState(false)
    const [stateLoader, setStateLoader] = useState(false)




    const orderId = router?.query?.id

    const id = typeof window !== "undefined" ? localStorage?.getItem("activeId") : null
    const filteredOrder = buyerOrderList?.find(data => data.id === orderId)

    const statusUpdate = filteredOrder?.orderInfo.status === 'pending' ? 'This order is pending' : filteredOrder?.orderInfo.status === 'processing' ? 'This order is been processed' : filteredOrder?.orderInfo.status === 'dispatched' ? 'This order is been dispatched' : filteredOrder?.orderInfo.status === 'completed' ? 'This order is completed' : `This order has been ${filteredOrder?.orderInfo.status}`


    useEffect(() => {
        setStateLoader(true)
        const loadData = async () => {
            await dispatch(getBuyerOrders())
            setStateLoader(false)
        }
        loadData()
    }, [id])


    const handleModalClose = () => {
        setResponseVisible(false)
    }



    const handleOrderModalOpen = (item) => {
        setOrderModalVisible(true)
        setAction(item)
    }

    const handleOrderModalClose = () => {
        setOrderModalVisible(false)
        dispatch(getBuyerOrders())
    }


    const handleSubmit = async (status) => {
        const payload = {
            orderId,
            status,
            productId: buyerOrderList?.productId
        }
        setLoader(true)
        try {
            const resultAction = await dispatch(changeOrderStatus(payload))
            if (changeOrderStatus.fulfilled.match(resultAction)) {
                dispatch(getBuyerOrders())
                setLoader(false)
            } else {
                if (resultAction.payload) {
                    setLoader(false)
                    setResponseVisible(true)
                    setResponseType('Error')
                    setResponseTitle("Error updating order")
                    console.log('error1', `Update failed: ${resultAction.error.message}`)
                } else {
                    setLoader(false)
                    setResponseVisible(true)
                    setResponseType('Error')
                    setResponseTitle("Error updating order")
                    console.log('error', `Updated failed: ${resultAction.error.message}`)
                }
            }
        }
        catch (e) {
            console.log({ e })
        }
    }

    console.log({ filteredOrder })
    return (
        <Container>
            {
                stateLoader ? <OrderDetailSkeleton />
                    :
                    <>
                        <RowStart>
                            <IconImage src={chevronLeft} onClick={() => router.back()} />
                            <Paragraph text='Order Details' fontSize={GlobalStyle.size.size16} fontWeight='600' margin='0% 5%' />
                        </RowStart>

                        <Div color={filteredOrder?.orderInfo.status === 'pending' ? GlobalStyle.color.orange : filteredOrder?.orderInfo.status === 'processing' ? GlobalStyle.color.pink : filteredOrder?.orderInfo.status === 'dispatched' ? GlobalStyle.color.purple : filteredOrder?.orderInfo.status === 'completed' ? GlobalStyle.color.green : GlobalStyle.color.red}>
                            <Paragraph textTransform='capitalize' textAlign='center' text={statusUpdate} fontSize={GlobalStyle.size.size14} />
                        </Div>

                        <View>
                            <RowStart>
                                <ImageContainer source={"https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/1_ktfkhp.png"} width={40} height={40} />
                                <MinDiv>
                                    <Paragraph text={filteredOrder?.orderInfo?.name} fontSize={GlobalStyle.size.size14} fontWeight='600' />
                                    <Subdiv>
                                        <Paragraph text='Size -' fontSize={GlobalStyle.size.size10} fontWeight='400' />
                                        <Paragraph text={filteredOrder?.orderInfo?.size} color={GlobalStyle.color.bazaraTint} margin='2px 0% 0% 5px' fontSize={GlobalStyle.size.size10} fontWeight='400' />
                                    </Subdiv>
                                </MinDiv>
                            </RowStart>
                            <Break></Break>
                            <RowAlignStart>
                                <IconImage src={pin} />
                                <MinDiv>
                                    <Paragraph text='Delivery Details' fontSize={GlobalStyle.size.size14} fontWeight='600' color={GlobalStyle.color.gray} />
                                    <Paragraph text={filteredOrder?.deliveryInfo?.deliveryAddress} fontSize={GlobalStyle.size.size14} fontWeight='600' />

                                </MinDiv>
                            </RowAlignStart>
                            <Break></Break>
                            <RowAlignStart>
                                <IconImage src={calender} />
                                <MinDiv>
                                    <Paragraph text='Estimated Delivery Date' fontSize={GlobalStyle.size.size14} fontWeight='600' color={GlobalStyle.color.gray} />
                                    <Paragraph text={new Date(filteredOrder?.deliveryInfo?.expectedDeliveryDate).toDateString()} fontSize={GlobalStyle.size.size14} fontWeight='600' />

                                </MinDiv>
                            </RowAlignStart>
                        </View>

                        <View>
                            <RowBetween>
                                <Paragraph text="Items Total" color={GlobalStyle.color.gyd} fontSize={GlobalStyle.size.size14} fontWeight='400' />
                                <CurrencyFormat value={filteredOrder?.orderInfo?.totalAmount} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={value} fontSize={GlobalStyle.size.size14} fontWeight='600' />} />
                            </RowBetween>
                            <Break></Break>
                            <RowBetween>
                                <Paragraph text="Quantity" color={GlobalStyle.color.gyd} fontSize={GlobalStyle.size.size14} fontWeight='400' />
                                <Paragraph text={filteredOrder?.orderInfo?.quantity} fontSize={GlobalStyle.size.size14} fontWeight='600' />
                            </RowBetween>
                            <Break></Break>
                            <RowBetween>
                                <Paragraph text="Delivery Fee" color={GlobalStyle.color.gyd} fontSize={GlobalStyle.size.size14} fontWeight='400' />
                                <Paragraph text="N/A" fontSize={GlobalStyle.size.size14} fontWeight='400' />
                            </RowBetween>
                        </View>

                        <View>
                            <RowBetween>
                                <Paragraph text="Order ID" fontSize={GlobalStyle.size.size14} color={GlobalStyle.color.gyd} fontWeight='400' />

                                <CopyToClipboard text={filteredOrder?.id}
                                    onCopy={() => toast.success("Id copied successfully")}
                                >
                                    <RowStart>
                                        <Paragraph text={filteredOrder?.id.substring(0, 7)} fontSize={GlobalStyle.size.size14} fontWeight='600' margin='0px 5px 0px 0px' />
                                        <IconImage
                                            src={copy}
                                        />
                                    </RowStart>
                                </CopyToClipboard>
                            </RowBetween>
                            <Break></Break>
                            <RowBetween>
                                <Paragraph text="Order Date" fontSize={GlobalStyle.size.size14} color={GlobalStyle.color.gyd} fontWeight='400' />
                                <Paragraph text={new Date(filteredOrder?.createdAt).toDateString()} fontSize={GlobalStyle.size.size14} fontWeight='600' />
                            </RowBetween>
                            <Break></Break>
                            <RowBetween>
                                <Paragraph text="Buyer’s Name" fontSize={GlobalStyle.size.size14} color={GlobalStyle.color.gyd} fontWeight='400' />
                                <Paragraph text="N/A" fontSize={GlobalStyle.size.size14} fontWeight='400' />
                            </RowBetween>
                        </View>
                        <Break></Break>
                        {
                            filteredOrder?.orderInfo.status === 'dispatched' ?
                                <Button isLoading={loader} children={"Mark as Completed"} handlePress={() => handleSubmit('completed')} /> : null
                        }

                        <ContDiv>
                            <Paragraph text='Message Seller' fontSize={GlobalStyle.size.size16} textAlign='center' margin='15px 0px' />
                        </ContDiv>

                        <ResponseModal
                            title={responseTitle}
                            type={responseType}
                            modalVisible={responseVisible}
                            setModalVisible={handleModalClose}
                            handlePress={handleModalClose}
                        />

                        <OrderActionModal
                            action={action}
                            modalVisible={orderModalVisible}
                            setModalVisible={handleOrderModalClose}
                            orderId={orderId}
                        />

                        <ToastContainer />
                    </>
            }


        </Container>

    )
}

export default BuyerOrderDetails

const Div = styled(Tag)`
    margin: 5% 0% 2% 0%;
    padding: 5px;
    border-radius: 5px 5px 0px 0px;
`

const View = styled.div`
    padding: 10px;
    background: ${GlobalStyle.color.darkBlack};
    border-radius: 5px;
    margin-bottom: 3%;
`


const MinDiv = styled.div`
    margin-left: 3%;
`

const Subdiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const Break = styled(Divider)`
    color: ${GlobalStyle.color.lightwhite};
    margin: 10px 0% !important;
`

const ContDiv = styled.div`
    cursor: pointer;

`
