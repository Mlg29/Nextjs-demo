import React, { useState } from 'react'
import styled from 'styled-components'
import { RowAlignStart, RowBetween, RowStart } from '../../../utils/StyledComponent'
import { GlobalStyle } from '../../../utils/themes/themes'
import { useRouter } from "next/router"
import { DatePicker, Menu, Modal, Tag } from "antd"
import ImageContainer from '../../Image'
import Paragraph from '../../Paragraph'
import * as CurrencyFormat from "react-currency-format"
import { IconImage } from '../Styled'
import { cancel, copy } from '../../../assets'
import renderHTML from 'react-render-html';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast, ToastContainer } from 'material-react-toastify';
import moment from 'moment';
import Button from '../../Button'


function DesktopOrderCard({ data }) {
    const [modalVisible, setModalVisible] = useState(false)

    const [selectedData, setSelectedData] = useState(null)


    const handleCancel = () => {
        setModalVisible(false);
    };

    const showModal = (data: any) => {
        setModalVisible(true)
        setSelectedData(data)
    }



    return (
        <Contain>
            <RowBetween>
                <SubDiv>
                    <RowAlignStart>
                        <div>
                            <ImageContainer width={200} height={170} source={"https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/1_ktfkhp.png"} />
                        </div>
                        <MalDiv>
                            <RowBetween>
                                <Paragraph text={"Lazy wear"} fontFamily='600' fontSize={GlobalStyle.size.size12} />
                                <CursorDiv>
                                       <Paragraph text={"SEE DETAILS"} textTransform='uppercase' color={GlobalStyle.color.bazaraTint} fontFamily='600' fontSize={GlobalStyle.size.size12} /> 
                                </CursorDiv>
                            </RowBetween>
                            <RowStart>
                                <RowBetween>
                                    <RowStart>
                                        <Paragraph text='Order ID:' fontFamily='400' fontSize={GlobalStyle.size.size10} color={GlobalStyle.color.gray} />
                                        <Paragraph text={"gshbwgfbh"} fontFamily='400' fontSize={GlobalStyle.size.size10} margin='0px 0px 0px 4px' />
                                    </RowStart>
                                    <CurrencyFormat value={1000} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size16} fontWeight='700' margin='0px 0px 0px 10px' />} />
                                </RowBetween>
                            </RowStart>
                            <RowStart>
                                <RowStart>
                                    <Paragraph text='Size: ' fontFamily='400' fontSize={GlobalStyle.size.size10} />
                                    <Paragraph text={"M"} color={GlobalStyle.color.bazaraTint} fontFamily='400' fontSize={GlobalStyle.size.size10} margin='0px 0px 0px 4px' />
                                </RowStart>
                            </RowStart>
                            <RowStart>
                                <RowStart>
                                    <Paragraph text='Color: ' fontFamily='400' fontSize={GlobalStyle.size.size10} />
                                    <Paragraph text={"M"} fontFamily='400' fontSize={GlobalStyle.size.size10} margin='0px 0px 0px 4px' />
                                </RowStart>

                            </RowStart>
                            <Tag color={GlobalStyle.color.antdOrange}>
                                <Paragraph text={"Pending"} textTransform='capitalize' color={GlobalStyle.color.antdOrange} />
                            </Tag>
                            <RowStart>
                                <RowStart>
                                    <Paragraph text='Date ' fontFamily='400' fontSize={GlobalStyle.size.size10} margin='10px 0px 0px 0px' />
                                    <Paragraph text={moment(data?.createdAt).format('DD-MM-YY')} fontFamily='400' fontSize={GlobalStyle.size.size10} margin='10px 0px 0px 4px' />
                                </RowStart>

                            </RowStart>
                        </MalDiv>

                    </RowAlignStart>
                </SubDiv>
            </RowBetween>



            <ModalCard
                title={null}
                centered
                visible={modalVisible}
                onOk={handleCancel}
                onCancel={handleCancel}
                style={{ top: 20 }}
                footer={null}
                closable={false}

            >
                <div>
                    <RowBetween>
                        <Paragraph text={"Order Details"} fontSize={GlobalStyle.size.size20} fontWeight='700' margin="0px 0px 10px 0px" />
                        <div onClick={handleCancel}>
                            <IconImage src={cancel} />
                        </div>
                    </RowBetween>

                    <RowStart>
                        <ImageContainer
                            source={selectedData?.orderInfo?.variantImg}
                            width={70}
                            height={70}
                        />
                        <ModalDiv>
                            <Paragraph text={selectedData?.product?.name} fontSize={GlobalStyle.size.size16} fontWeight="600" />
                            {renderHTML(`<div>${selectedData?.product?.description}</div>`)}
                            {/* <Paragraph text={selectedData?.product?.description} fontSize={GlobalStyle.size.size14} fontWeight="500" /> */}
                        </ModalDiv>

                    </RowStart>
                    <br />
                    <Container>
                        <RowBetween>
                            <ContainerDiv>
                                <Paragraph text={"Order ID:"} fontSize={GlobalStyle.size.size14} fontWeight="500" />
                            </ContainerDiv>
                            <ContainerDiv>
                            </ContainerDiv>
                            <ContainerDiv2>
                                <Paragraph text={selectedData?.id.substring(0, 10)} fontSize={GlobalStyle.size.size16} fontWeight="600" />
                                <Spaced></Spaced>
                                <CopyToClipboard text={selectedData?.id}
                                    onCopy={() => toast.success("Id copied successfully")}
                                >
                                    <IconImage
                                        src={copy}
                                    />
                                </CopyToClipboard>
                            </ContainerDiv2>
                            <ContainerDiv>
                            </ContainerDiv>
                        </RowBetween>
                    </Container>
                    <Container>
                        <RowBetween>
                            <ContainerDiv>
                                <Paragraph text={"Quantity:"} fontSize={GlobalStyle.size.size14} fontWeight="500" />
                            </ContainerDiv>
                            <ContainerDiv>
                            </ContainerDiv>
                            <ContainerDiv2>
                                <Paragraph text={selectedData?.orderInfo.quantity} fontSize={GlobalStyle.size.size16} fontWeight="600" />
                            </ContainerDiv2>
                            <ContainerDiv>
                            </ContainerDiv>
                        </RowBetween>
                    </Container>
                    <Container>
                        <RowBetween>
                            <ContainerDiv>
                                <Paragraph text={"Price:"} fontSize={GlobalStyle.size.size14} fontWeight="500" />
                            </ContainerDiv>
                            <ContainerDiv>
                            </ContainerDiv>
                            <ContainerDiv2>
                                <CurrencyFormat value={selectedData?.orderInfo.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size14} fontWeight='700' />} />
                            </ContainerDiv2>
                            <ContainerDiv>
                            </ContainerDiv>
                        </RowBetween>
                    </Container>
                    <Container>
                        <RowBetween>
                            <ContainerDiv>
                                <Paragraph text={"Color:"} fontSize={GlobalStyle.size.size14} fontWeight="500" />
                            </ContainerDiv>
                            <ContainerDiv>
                            </ContainerDiv>
                            <ContainerDiv2>
                                <Paragraph text={"N/A"} fontSize={GlobalStyle.size.size16} fontWeight="600" />
                            </ContainerDiv2>
                            <ContainerDiv>
                            </ContainerDiv>
                        </RowBetween>
                    </Container>

                    <Container>
                        <RowBetween>
                            <ContainerDiv>
                                <Paragraph text={"Size:"} />
                            </ContainerDiv>
                            <ContainerDiv>
                            </ContainerDiv>
                            <ContainerDiv2>
                                <Paragraph text={selectedData?.orderInfo.size} />
                            </ContainerDiv2>
                            <ContainerDiv>
                            </ContainerDiv>
                        </RowBetween>
                    </Container>
                    <Container>
                        <RowBetween>
                            <ContainerDiv>
                                <Paragraph text={"Order Date:"} fontSize={GlobalStyle.size.size14} fontWeight="500" />
                            </ContainerDiv>
                            <ContainerDiv>
                            </ContainerDiv>
                            <ContainerDiv2>
                                <Paragraph text={moment(selectedData?.createdAt).format("Do MMM YY")} fontSize={GlobalStyle.size.size16} fontWeight="600" />
                            </ContainerDiv2>
                            <ContainerDiv>
                            </ContainerDiv>
                        </RowBetween>
                    </Container>

                    <br />
                    <Container>
                        <br />
                        <br />
                        {
                            selectedData?.orderInfo.status === 'dispatched' ?
                                  <Cont>
                                    <Button children="Mark as Received" handlePress={() => {}} />
                                   
                                    <Cont>
                                        <Paragraph text='Message Seller' textAlign='center' margin='10px' />
                                    </Cont>
                                  </Cont>
                                :
                                <ContDiv>
                                    <Paragraph text='Message Seller' />
                                </ContDiv>
                        }
                    </Container>

                </div>
            </ModalCard>
            <ToastContainer />
        </Contain>
    )
}

export default DesktopOrderCard

const Contain = styled.div`
    padding: 10px 0px;
    border-bottom: 1px solid ${GlobalStyle.color.lightwhite}
`
const SubDiv = styled.div`
    width: 100%;
`
const SubDiv2 = styled.div`

`
const MalDiv = styled.div`
    margin-left: 20px;
    width: 100%;
`


const ModalCard = styled(Modal)`
    
`
const ModalDiv = styled.div`
  margin-left: 15px;
`

const ContainerDiv = styled.div`
  width: 200px;
`
const ContainerDiv3 = styled.div`
  width: 100px;
`
const Container = styled.div`
  padding: 10px 0%;
`

const ContainerDiv2 = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const Spaced = styled.div`
  width: 10px;
`
const Cont = styled.div`
    cursor: pointer
`
const ContDiv = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
`

const TextDiv = styled.div`
  border: 0.5px solid ${GlobalStyle.color.lightwhite};
  width: 100px;
  border-radius: 30px; 
  display: flex;
  justify-content: center;
  padding: 5px;
  cursor: pointer;

`

const ButtonFilterText = styled.div`
    background: ${GlobalStyle.color.bazaraTint};
    border: 1px solid ${GlobalStyle.color.bazaraTint};
    width: 100%;
    padding: 10px;
    font-size: 14px;
    color: ${GlobalStyle.color.white};
    border-radius: 10px;
    cursor: pointer;
`

const MenuDiv = styled(Menu)`
  background: ${GlobalStyle.color.primaryBg} !important;
  width: 350px !important;
  padding: 10px 15px;
`

const MenuItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  margin-top: 10px;
`

const DatePick = styled(DatePicker)`
  width: 100%;
  background: ${GlobalStyle.color.primaryBg};
  padding: 10px;
  border: 0.5px solid ${GlobalStyle.color.lightwhite};
  border-color: none !important;
`

const CursorDiv = styled.div`
    cursor: pointer;
`