import React, { useEffect } from 'react'
import { Modal, Progress, Rate } from "antd"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { getStoreById, getStoreRating, storebyId, storeRatings } from '../../slices/StoreSlice'
import { RowBetween } from '../../utils/StyledComponent'
import Paragraph from '../Paragraph'
import { IconImage } from '../DesktopComponent/Styled'
import { cancel } from '../../assets'
import { GlobalStyle } from '../../utils/themes/themes'
import { Container } from '../mobileComponents/Styled'
import CommentCard from '../mobileComponents/reusable/CommentCard'


function RatingModal({ modalVisible, setModalVisible, data, rate }) {

    const storeRating = useAppSelector(storeRatings)
 const dispatch = useAppDispatch()
    const ratingComments = storeRating?.filter(data => data?.comment?.length > 1)

    const excellent = storeRating?.filter(data => data?.rating === 5)
    const good = storeRating?.filter(data => data?.rating === 4)
    const average = storeRating?.filter(data => data?.rating === 3)
    const poor = storeRating?.filter(data => data?.rating === 2)
    const terrible = storeRating?.filter(data => data?.rating === 1)



    return (
        <ModalCard
            title={null}
            centered
            style={{ top: 20 }}
            visible={modalVisible}
            onOk={setModalVisible}
            onCancel={setModalVisible}
            footer={null}
            width={400}
            closable={false}

        >
            <Container>
                <RowBetween>
                    <Paragraph textTransform='capitalize' margin='2% 0%' text={`Rating`} fontSize={GlobalStyle.size.size16} fontWeight='700' />
                    <div onClick={setModalVisible}>
                        <IconImage src={cancel} />
                    </div>
                </RowBetween>

                <CenterDiv>
                <Paragraph text={data?.sidehustle?.rating} fontSize={GlobalStyle.size.size30} fontWeight='700' />
                <Rate disabled allowHalf value={data?.sidehustle?.rating} />
                {
                    data?.sidehustle?.ratings === 0 ? <Button>No reviews yet.</Button> : <Button>{data?.ratings} out of 5.0 Rating</Button>
                }
            </CenterDiv>

            <Paragraph text={`${data?.sidehustle?.ratingCount === undefined ? 0 : data?.sidehustle?.ratingCount } review`} fontSize={GlobalStyle.size.size16} fontWeight='600' />
            <RowDiv>
                <SubDiv> <Paragraph text={'Excellent'} fontSize={GlobalStyle.size.size8} fontWeight='600' /></SubDiv>

                <ProgressDiv>
                    <Progress percent={excellent?.length} showInfo={false} size="small" />
                </ProgressDiv>
                <SubDiv2>
                    <Paragraph text={excellent?.length} fontSize={GlobalStyle.size.size8} fontWeight='600' />
                </SubDiv2>

            </RowDiv>
            <RowDiv>
                <SubDiv>
                    <Paragraph text={'Very good'} fontSize={GlobalStyle.size.size8} fontWeight='600' />
                </SubDiv>

                <ProgressDiv>
                    <Progress percent={good?.length} showInfo={false} size="small" />
                </ProgressDiv>
                <SubDiv2>
                    <Paragraph text={good?.length} fontSize={GlobalStyle.size.size8} fontWeight='600' />
                </SubDiv2>

            </RowDiv>
            <RowDiv>
                <SubDiv>
                    <Paragraph text={'Average'} fontSize={GlobalStyle.size.size8} fontWeight='600' />
                </SubDiv>

                <ProgressDiv>
                    <Progress percent={average?.length} showInfo={false} size="small" />
                </ProgressDiv>
                <SubDiv2>
                    <Paragraph text={average?.length} fontSize={GlobalStyle.size.size8} fontWeight='600' />
                </SubDiv2>

            </RowDiv>
            <RowDiv>
                <SubDiv>
                    <Paragraph text={'Poor'} fontSize={GlobalStyle.size.size8} fontWeight='600' />
                </SubDiv>

                <ProgressDiv>
                    <Progress percent={poor?.length} showInfo={false} size="small" />
                </ProgressDiv>
                <SubDiv2>
                    <Paragraph text={poor?.length} fontSize={GlobalStyle.size.size8} fontWeight='600' />
                </SubDiv2>

            </RowDiv>
            <RowDiv>
                <SubDiv>
                    <Paragraph text={'Terrible'} fontSize={GlobalStyle.size.size8} fontWeight='600' />
                </SubDiv>

                <ProgressDiv>
                    <Progress percent={terrible?.length} showInfo={false} size="small" />
                </ProgressDiv>
                <SubDiv2>
                    <Paragraph text={terrible?.length} fontSize={GlobalStyle.size.size8} fontWeight='600' />
                </SubDiv2>

            </RowDiv>
            <br/>
            <Paragraph text={`Comments (${storeRating?.length})`} fontSize={GlobalStyle.size.size16} fontWeight='600' />
            {
                ratingComments?.map(data => {
                    return <CommentCard 
                            image={data?.imgUrls[0]} 
                            name={data?.client?.fName + " " + data?.client?.lName} 
                            comment={data?.comment} 
                            date={data?.createdAt} 
                            rate={data?.rating}
                            id={data?._id}
                            productOwner={data?.productOwner}
                        />
                })
            }
            
            </Container>

        </ModalCard>
    )
}

export default RatingModal

const ModalCard = styled(Modal)`
    
`
const ContainerDiv = styled.div`
 width: 100%;
`

const CenterDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 22px 0%;
`

const Button = styled.button`
    width: 100%;
    padding: 5px;
    border-radius: 15px;
    border: none;
    margin-top: 10px;
    color: black;
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