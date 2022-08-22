
import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { bigBag, chevronLeft, dotIcon, productLogo } from '../../assets'

import Paragraph from '../Paragraph'
import Slider from "react-slick";
import * as CurrencyFormat from "react-currency-format"
import { Container, IconImage } from './Styled'
import { useRouter } from "next/router"
import { GlobalStyle } from '../../utils/themes/themes'
import { useAppDispatch, useAppSelector } from '../../app/hook'

import { getBuyerOrders, orderSearch, buyerOrders } from '../../slices/OrderSlice'
import { RowBetween, RowStart } from '../../utils/StyledComponent'
import { Menu, Tag } from 'antd'
import EmptyState from './reusable/EmptyState'
import OrderSkeleton from '../SkelentonLoader/Mobile/OrderSkeleton'
import BuyerTabs from './reusable/BuyerTabs'
import ImageContainer from '../Image';


function MobileBuyerOrders() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const buyerOrderList = useAppSelector(buyerOrders)
    const [searchValue, setSearchValue] = useState('')
    const [status, setStatus] = useState("all")
    const [stateLoader, setStateLoader] = useState(false)
    const id = localStorage.getItem("activeId")


    const filterBuyerData = status === "all" ? buyerOrderList : buyerOrderList?.filter(data => data?.orderInfo.status === status)


    useEffect(() => {
        setStateLoader(true)
        const loadData = async () => {
            await dispatch(getBuyerOrders())
            setStateLoader(false)
        }
        loadData()
    }, [id])


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
            {
                stateLoader ? <OrderSkeleton />
                    :
                    <>
                        <Component>
                            <RowBetween>
                                <Paragraph text={`Orders`} fontSize={GlobalStyle.size.size18} fontWeight='600' />

                            </RowBetween>
                        
                            <Slick {...categorySettings}>
                                {
                                    ["all", "pending", "processing", "dispatched", "cancelled", "rejected", "completed"].map(data => {
                                        return <ItemDiv onClick={() => setStatus(data)}>
                                            <Paragraph text={data} textAlign='center' fontWeight='bold' textTransform='capitalize' color={status === data ? GlobalStyle.color.bazaraTint : GlobalStyle.color.white} />
                                        </ItemDiv>
                                    })
                                }
                            </Slick>
                        </Component>


                        {["", ""]?.length < 1 && <EmptyState
                            icon={bigBag}
                            title="No Orders Yet"
                            header='All your store orders will be listed here'

                        />

                        }

                        {
                           ["", ""]?.map((data, i) => {
                                return <Contain onClick={() => router.push(`/buyer-order-detail/${i}`)}>
                                    <RowBetween>
                                        <SubDiv>
                                            <RowStart>
                                                <ImageContainer width={40} height={40} source="https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/1_ktfkhp.png" />
                                                <MalDiv>
                                                    <Paragraph text={"Lazy wear"} fontFamily='600' fontSize={GlobalStyle.size.size12} />
                                                    <RowStart>
                                                        <RowStart>
                                                            <Paragraph text='Size - ' fontFamily='400' fontSize={GlobalStyle.size.size10} />
                                                            <Paragraph text={"M"} color={GlobalStyle.color.bazaraTint} fontFamily='400' fontSize={GlobalStyle.size.size10} margin='0px 0px 0px 4px' />
                                                        </RowStart>
                                                        <CurrencyFormat value={1000} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size16} fontWeight='700' margin='0px 0px 0px 10px' />} />
                                                    </RowStart>
                                                </MalDiv>
                                            </RowStart>
                                        </SubDiv>
                                        <SubDiv2>
                                            <Tag color={GlobalStyle.color.antdOrange}>
                                                <Paragraph text={"Pending"} textTransform='capitalize' color={GlobalStyle.color.antdOrange} />
                                            </Tag>
                                        </SubDiv2>
                                    </RowBetween>
                                </Contain>
                            })

                        }


                    </>
            }

            <BuyerTabs />
        </Container>
    )
}

export default MobileBuyerOrders


const Component = styled.div`

            `

const Div = styled.div`
            width: 80%;
            margin: 1% auto;
            `

const Column = styled.div`
            flex: 1;
            `

const ColumnGlobal = styled.div`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 80%;
            width: 70%;
            margin: 0 auto;
            `

const TextDiv = styled.div`
           
            `

const Slick = styled(Slider)`
    width: 100% !important;
    margin-top: 10px;
`
const ItemDiv = styled.div`
border-radius: 10px;
padding: 5px;
width: 80px !important;
margin-bottom: 10px;
`

const SubDiv = styled.div`
    width: 100%;
`

const SubDiv2 = styled.div`

`
const MalDiv = styled.div`
    margin-left: 10px;
`

const Contain = styled.div`
    padding: 10px 0px;
    border-bottom: 1px solid ${GlobalStyle.color.lightwhite}
`