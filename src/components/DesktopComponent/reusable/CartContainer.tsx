import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { removeIcon } from '../../../assets';
import { RowAlignStart, RowBetween, RowBetweenStart, RowStart } from '../../../utils/StyledComponent';
import { GlobalStyle } from '../../../utils/themes/themes';
import ImageContainer from '../../Image';
import Paragraph from '../../Paragraph';
import { IconImage } from '../Styled';
import * as CurrencyFormat from 'react-currency-format';

function CartContainer({ data, index, localIncrement, localDecrement, removeFromCart }) {

    return (
        <Container>
            <RowBetweenStart>
                <RowAlignStart>
                    <ImageContainer source="https://res.cloudinary.com/doouwbecx/image/upload/v1659633074/2_eyvshq.png" width={140} height={140} />
                    <DivCart>
                        <Paragraph text="Lazy wear" />
                        <RowStart>
                            <SmallDiv>
                                <Paragraph text='Size' />
                                <Box>
                                    <Paragraph text={"M"} textAlign='center' />
                                </Box>
                            </SmallDiv>
                            {/* <SmallDiv>
                                <Paragraph text='Color' />
                                <Box>
                                    <Paragraph text='L' textAlign='center' />
                                </Box>
                            </SmallDiv> */}
                        </RowStart>

                        <Paragraph text='Quantity' margin='3px 0px' />
                        <QuantityDiv>
                            <Count>
                                <Paragraph text='-' fontSize={GlobalStyle.size.size30} fontWeight='400' />
                            </Count>
                            <Paragraph text={"3"} fontSize={GlobalStyle.size.size20} fontWeight='400' />
                            <Count>
                                <Paragraph text='+' fontSize={GlobalStyle.size.size30} fontWeight='400' />
                            </Count>
                        </QuantityDiv>
                    </DivCart>
                </RowAlignStart>

                <DivCart>
                    <RowStart>
                        <IconImage src={removeIcon} />
                        <Paragraph text='Remove' textTransform='uppercase' color={GlobalStyle.color.bazaraTint} margin='0px 5px' />
                    </RowStart>
                    <CurrencyFormat value={1000} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size16} fontWeight='700' />} />
                </DivCart>
            </RowBetweenStart>
        </Container>
    )
}

export default CartContainer;

const Container = styled.div`
    margin-bottom: 25px;
`

const DivCart = styled.div`
    margin-left: 24px;
`
const SmallDiv = styled.div`
    width: 100px;
`

const Box = styled.div`
    background: ${GlobalStyle.color.black};
    width: 40px;
`
const QuantityDiv = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 border: 1px solid ${GlobalStyle.color.lightwhite};
 width: 200px;
 padding: 10px 10px;
 border-radius: 5px;
`
const Count = styled.div`
    cursor: pointer;
`