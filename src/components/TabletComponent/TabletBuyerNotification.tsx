import React, {useState, useEffect} from 'react'
import { BuyerNotification, chevronLeft } from '../../assets'

import { Container } from './Styled'
import {useAppDispatch, useAppSelector} from "../../app/hook"
import { getNotifications, notification } from '../../slices/NotificationSlice'
import moment from 'moment'
import styled from 'styled-components'
import Paragraph from '../Paragraph'
import { GlobalStyle } from '../../utils/themes/themes'
import EmptyState from '../mobileComponents/reusable/EmptyState'

function TabletBuyerNotification() {
    const dispatch = useAppDispatch();
    const notificationList = useAppSelector(notification)

     useEffect(() => {
        dispatch(getNotifications())
    }, [])

  return (
    <Container>
        <Div>
            {
                notificationList?.filter(a => a.title === "Order confirmation").map(data => {
                    return <SubDiv>
                        <Paragraph text={data?.content} />
                        <Paragraph text={moment(data?.createdAt).format("DD-MM-YY")}  />
                    </SubDiv>
                })
            }
        </Div>

        <Div2>
            {
                notificationList?.filter(a => a.title === "Order confirmation")?.length < 1 && <EmptyState icon={BuyerNotification} title={'No Notification Available'} header={'All Your Notifications will appear here'}                
                />
            }
        </Div2>

    </Container>
  )
}

export default TabletBuyerNotification

const Div = styled.div`

`

const Div2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const SubDiv = styled.div`
    padding: 20px;
    border-bottom: 1px solid ${GlobalStyle.color.lightwhite}
`