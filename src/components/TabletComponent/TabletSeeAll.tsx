import React from 'react'
import styled from 'styled-components'
import Paragraph from '../Paragraph'
import * as CurrencyFormat from "react-currency-format"
import { GlobalStyle } from '../../utils/themes/themes'
import { useRouter } from "next/router"
import { Col, Row } from 'react-bootstrap'
import { RowBetween, RowStart } from '../../utils/StyledComponent'
import NumberInput from '../NumberInput'
import { Dropdown, Input, Menu } from 'antd'
import SearchIcon from '@mui/icons-material/Search';
import { DownOutlined } from '@ant-design/icons';
import { categoryDisplay } from '../../utils/constants/categories'
import ProductContainer from '../ProductContainer'

function TabletSeeAll() {
    const router = useRouter();

    const itemType = router?.query?.name as string

    
    const menu = (
        <Menu>

        </Menu>
    )

    return (
        <>
            <Row>
                <Col sm="4" md="4">
                    <Div>
                        <RowBetween>
                            <Paragraph text='Price' />
                            <Paragraph text="Apply" color={GlobalStyle.color.bazaraTint} />
                        </RowBetween>
                        <NumberInput label={'Min Amount'} value={0} />
                        <Empty>
                            <Paragraph text='-' textAlign='center' />
                        </Empty>

                        <NumberInput label={'Max Amount'} value={0} />
                        <br />
                        <Paragraph text='Brand' margin='0px 0px 5px 0px' />
                        <Inputs
                            id={"outlined-adornment-weight"}
                            aria-describedby="outlined-weight-helper-text"
                            size='large'
                            prefix={<SearchIcon style={{ color: 'white' }} />}

                        />
                        <br />
                        <br />
                        <Paragraph text='Size' margin='0px 0px 5px 0px' />
                        <Inputs
                            id={"outlined-adornment-weight"}
                            aria-describedby="outlined-weight-helper-text"
                            size='large'
                            prefix={<SearchIcon style={{ color: 'white' }} />}

                        />
                    </Div>
                </Col>

                <Col sm="8" md="8">
                    <RowBetween>
                        <Paragraph text={`Result for ${itemType}`} fontSize={GlobalStyle.size.size24} fontWeight='700' margin='10px 0px' />
                        <RowStart>
                            <Paragraph text={`Sort by: `} fontSize={GlobalStyle.size.size16} fontWeight='700' margin='10px 0px' />
                            <Dropdown overlay={menu}>
                                <>
                                    <Paragraph text={`New Arrival`} fontSize={GlobalStyle.size.size16} fontWeight='700' margin='10px 5px' />
                                    <DownOutlined />
                                </>
                            </Dropdown>
                        </RowStart>
                    </RowBetween>
                    <Grid>
                        {
                            categoryDisplay?.map(data => {
                                return <ProductContainer data={data} mini={false} />
                            })
                        }
                    </Grid>
                </Col>
            </Row>
        </>
    )
}

export default TabletSeeAll


const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    `

const ProductDiv = styled.div`

`
const ProdDiv = styled.div`

`
const ContainerImage2 = styled.img`
    width: 300px;
    height: 300px;
    margin: 10px;
`

const Div = styled.div`
    background: ${GlobalStyle.color.darkBlack};
    padding: 20px;
`
const Empty = styled.div`
    width: 30px;
`
const Inputs = styled(Input)`
  width: 100%;
  background: transparent;
  border: 1px solid ${GlobalStyle.color.lightwhite};
  padding: 10px;
`