
import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { GlobalStyle } from '../../utils/themes/themes'
import Paragraph from '../Paragraph'
import DesktopOrderCard from '../../components/DesktopComponent/reusable/DesktopOrderCard'
import { Container } from './Styled'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import EmptyState from '../../components/mobileComponents/reusable/EmptyState'
import { getBuyerOrders, orderSearch, buyerOrders } from '../../slices/OrderSlice'
import { RowBetween, RowStart } from '../../utils/StyledComponent'
import ImageContainer from '../Image'


function TabletBuyerOrders() {
    const dispatch = useAppDispatch()
    const buyerOrderList = useAppSelector(buyerOrders)
    const [stateLoader, setStateLoader] = useState(false)
    const id = localStorage.getItem("activeId")
    const [status, setStatus] = useState("all")

    useEffect(() => {
        setStateLoader(true)
        const loadData = async () => {
            await dispatch(getBuyerOrders())
            setStateLoader(false)
        }
        loadData()
    }, [id])

    const filterBuyerData = status === "all" ? buyerOrderList : buyerOrderList?.filter(data => data?.orderInfo.status === status)

    return (
        <Container>
            <Paragraph text='Orders' fontSize={GlobalStyle.size.size24} fontWeight='700' margin='10px 0px' />
            <br />
            <RowBetween>
                <RowStart>
                    <CursorDiv onClick={() => setStatus("pending")} style={{ borderBottom: status === "pending" ? `1px solid ${GlobalStyle.color.bazaraTint}` : "none" }}>
                        <Paragraph text='Pending' fontSize={GlobalStyle.size.size16} textAlign='center' fontWeight='400' textTransform='uppercase' color={status === "pending" ? GlobalStyle.color.bazaraTint : GlobalStyle.color.white} />
                    </CursorDiv>
                    <CursorDiv onClick={() => setStatus("processing")} style={{ borderBottom: status === "processing" ? `1px solid ${GlobalStyle.color.bazaraTint}` : "none" }}>
                        <Paragraph text='Processing' fontSize={GlobalStyle.size.size16} textAlign='center' fontWeight='400' textTransform='uppercase' color={status === "processing" ? GlobalStyle.color.bazaraTint : GlobalStyle.color.white} />
                    </CursorDiv>
                    <CursorDiv onClick={() => setStatus("dispatched")} style={{ borderBottom: status === "dispatched" ? `1px solid ${GlobalStyle.color.bazaraTint}` : "none" }}>
                        <Paragraph text='dispatched' fontSize={GlobalStyle.size.size16} textAlign='center' fontWeight='400' textTransform='uppercase' color={status === "dispatched" ? GlobalStyle.color.bazaraTint : GlobalStyle.color.white} />
                    </CursorDiv>
                    <CursorDiv onClick={() => setStatus("cancelled")} style={{ borderBottom: status === "cancelled" ? `1px solid ${GlobalStyle.color.bazaraTint}` : "none" }}>
                        <Paragraph text='cancelled' fontSize={GlobalStyle.size.size16} textAlign='center' fontWeight='400' textTransform='uppercase' color={status === "cancelled" ? GlobalStyle.color.bazaraTint : GlobalStyle.color.white} />
                    </CursorDiv>
                    <CursorDiv onClick={() => setStatus("rejected")} style={{ borderBottom: status === "rejected" ? `1px solid ${GlobalStyle.color.bazaraTint}` : "none" }}>
                        <Paragraph text='rejected' fontSize={GlobalStyle.size.size16} textAlign='center' fontWeight='400' textTransform='uppercase' color={status === "rejected" ? GlobalStyle.color.bazaraTint : GlobalStyle.color.white} />
                    </CursorDiv>

                    <CursorDiv onClick={() => setStatus("completed")} style={{ borderBottom: status === "completed" ? `1px solid ${GlobalStyle.color.bazaraTint}` : "none" }}>
                        <Paragraph text='completed' fontSize={GlobalStyle.size.size16} textAlign='center' fontWeight='400' textTransform='uppercase' color={status === "completed" ? GlobalStyle.color.bazaraTint : GlobalStyle.color.white} />
                    </CursorDiv>


                </RowStart>
            </RowBetween>
            <br />
            <Row>
                <Col lg='12'>
                    {
                        filterBuyerData?.length >= 1 && filterBuyerData?.map((data, i) => {
                            return <DesktopOrderCard data={data} />
                        })
                    }

                </Col>
                
            </Row>
        </Container>
    )
}

export default TabletBuyerOrders;

const CursorDiv = styled.div`
    cursor: pointer;
    width: 100px;
`

const Img = styled.img`
   width: 400px;
   height: 400px;

   @media screen and (min-width: 1008px) {
    width: 100%;
    height: 100%;
   }
`