import React, { useEffect } from 'react'
import styled from 'styled-components'
import { buy, BuyerNotification, imageLogo, logo, ppSvg } from '../../../assets'
import { RowAlignStart, RowBetween, RowStart } from '../../../utils/StyledComponent'
import { GlobalStyle } from '../../../utils/themes/themes'
import { HomeHeaderType } from '../../../utils/types'
import ImageContainer from '../../Image'
import Paragraph from '../../Paragraph'
import { IconImage } from '../Styled'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from "../../../app/hook"
import { getNotifications, notification } from '../../../slices/NotificationSlice'
import { Badge } from 'antd'
import { CartData, getCarts } from '../../../slices/CartSlice'


const HomeHeader: React.FC<HomeHeaderType> = ({ data }) => {
    const getToken = localStorage.getItem('token')
    const router = useRouter()
    const dispatch = useAppDispatch();
    const notificationList = useAppSelector(notification)
    const CartList = useAppSelector(CartData)
    const getCartFromStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')) : null
    const getUserToken = localStorage.getItem('token')


    const filtNotification = notificationList?.filter(d => d.title === "Order confirmation")

    useEffect(() => {
        if (getUserToken) {
            dispatch(getNotifications())
            dispatch(getCarts())
        }

    }, [])



    return (
        <>
            {
                !getToken ? <RowBetween>
                    <RowStart>
                        <IconImage src={imageLogo} />
                        <Paragraph text="bazara" fontSize={GlobalStyle.size.size22} fontWeight='700' margin='0px 0px 0px 10px' />
                    </RowStart>
                    <RowAlignStart>
                       <Badge count={getCartFromStorage?.length}>
                            <Sub onClick={() => router.push('/cart')}>
                                <IconImage src={buy} />
                            </Sub>
                        </Badge>
                        <Empty></Empty>
                        <Sub onClick={() => router.push('/login')}>
                            <IconImage src={ppSvg} />
                        </Sub>
                    </RowAlignStart>
                </RowBetween>
                    :
                    <RowBetween>
                        <Div>
                            {
                                data?.imgUrl ? <ImageContainer source={data?.imgUrl} width={40} height={40} type='round' />
                                    :
                                    <IconImage src={ppSvg} />
                            }

                            {
                                !getToken ? <Paragraph text={`Welcome 👋🏽`} fontSize={GlobalStyle.size.size14} fontWeight='400' color={GlobalStyle.color.gray} margin='0px 0px 0px 10px' /> : <Paragraph text={`Hi, ${data?.fName} 👋🏽`} fontSize={GlobalStyle.size.size14} fontWeight='400' color={GlobalStyle.color.gray} margin='0px 0px 0px 10px' />
                            }
                        </Div>

                        <Div2>
                            <Badge dot={filtNotification?.length > 0}>
                                <Sub onClick={() => router.push('/buyer-notification')}>
                                    <IconImage src={BuyerNotification} />
                                </Sub>
                            </Badge>
                            <Badge count={CartList?.length}>
                                <Sub onClick={() => router.push('/cart')}>
                                    <IconImage src={buy} />
                                </Sub>
                            </Badge>

                        </Div2>
                    </RowBetween>
            }

        </>
    )
}

export default HomeHeader

const Div = styled.div`
    display: flex;
    align-items: center;
`

const Div2 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60px;
`
const Sub = styled.div`

`
const Empty = styled.div`
    width: 10px;
`