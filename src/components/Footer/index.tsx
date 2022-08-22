import { Col, Row } from "react-bootstrap"
import React from 'react'
import styled from 'styled-components'
import { RowBetween, RowStart } from '../../utils/StyledComponent'
import { GlobalStyle } from '../../utils/themes/themes'
import Paragraph from '../Paragraph'
import { IconImage } from "../DesktopComponent/Styled"
import { logo } from "../../assets"

function Footer() {
    return (
        <FooterComponent>
            <FooterDiv>
                <Subiv>
                    <Div>
                        <ColDiv>
                            <Paragraph text='New to Bazara?' />
                            <Paragraph text='Subsctibe to our newsletter' />
                        </ColDiv>
                        <RowStart>
                            <Inputs placeholder='Enter your email address' />
                            <Button>Search</Button>
                        </RowStart>
                    </Div>
                </Subiv>
            </FooterDiv>
            <FooterDiv2>
                <Row>
                    <Col lg="3">
                        <IconImage src={logo} />
                        <MiniDiv>
                            <Paragraph text='Make it happen. 12D Wole Ariyo Street, Lekki, Nigeria' />
                        </MiniDiv>
                    </Col>
                    <Col lg="3">
                        <Paragraph text='Company' fontSize={GlobalStyle.size.size16} fontWeight="bold" margin="0px 0px 10px 0px" />

                        <Link>
                            <Paragraph text='About Us' />
                        </Link>
                        <Link>
                            <Paragraph text='Privacy Policy' />
                        </Link>
                        <Link>
                            <Paragraph text='Investor Relations' />
                        </Link>
                        <Link>
                            <Paragraph text='Bazara Career' />
                        </Link>
                        <Link>
                            <Paragraph text='Terms and Conditions' />
                        </Link>
                    </Col>
                    <Col lg="3">
                        <Paragraph text='Make Money' fontSize={GlobalStyle.size.size16} fontWeight="bold" margin="0px 0px 10px 0px" />

                        <Link>
                            <Paragraph text='Become a Seller' />
                        </Link>
                        <Link>
                            <Paragraph text='Agent' />
                        </Link>
                        <Link>
                            <Paragraph text='Become an Affiliate' />
                        </Link>
                        <Link>
                            <Paragraph text='Advertise with us' />
                        </Link>
                    </Col>
                    <Col lg="3">
                        <Paragraph text='Help' fontSize={GlobalStyle.size.size16} fontWeight="bold" margin="0px 0px 10px 0px" />

                        <Link>
                            <Paragraph text='FAQ' />
                        </Link>
                        <Link>
                            <Paragraph text='Refund Policy' />
                        </Link>
                        <Link>
                            <Paragraph text='Shipping Rate ' />
                        </Link>
                        <Link>
                            <Paragraph text='Report a Product' />
                        </Link>
                        <Link>
                            <Paragraph text='Report a Store' />
                        </Link>
                        <Link>
                            <Paragraph text='Bazara Assistant' />
                        </Link>
                    </Col>
                </Row>
                <Hr />
                <RowBetween>
                    <RowStart>
                        <Paragraph text="&copy; 2020-2022 Bazara.com" />
                    </RowStart>
                    <RowStart>
                        <Paragraph text="Join Us: " margin="0px 20px 0px 0px" />
                        <a href="https://www.facebook.com/bazara.platform" target="_blank"> <img src="https://img.icons8.com/material-outlined/24/ffffff/facebook.png" /></a>
                        <a href="https://www.instagram.com/bazara.co/" target="_blank"><img src="https://img.icons8.com/material-outlined/24/ffffff/instagram-new--v2.png" /></a>
                        {/* <a href="#"> <img src="https://img.icons8.com/fluency-systems-regular/24/ffffff/twitter.png" /></a> */}
                        <a href="https://www.linkedin.com/company/bazara" target="_blank"><img src="https://img.icons8.com/material-outlined/24/ffffff/linkedin--v2.png" /></a>

                    </RowStart>
                </RowBetween>
            </FooterDiv2>
        </FooterComponent>

    )
}

export default Footer

const FooterComponent = styled.div`
//  background: ${GlobalStyle.color.prup};
 
`

const FooterDiv = styled.div`
 background: ${GlobalStyle.color.darkPink};
 padding: 0% 10em;
`

const FooterDiv2 = styled.div`
 background: ${GlobalStyle.color.prup};
 padding: 30px 15em;

 @media screen and (min-width: 1008px) and (max-width: 1300px) {
    padding: 30px 5em;
 }
`


const Div = styled.div`
//   width: 60%;
  padding: 20px;
  display: flex;
`
const Subiv = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
`

const ColDiv = styled.div`
 border-right: 1px solid ${GlobalStyle.color.white};
 width: 250px;
`

const Inputs = styled.input`
margin-left: 10%;
background: transparent;
padding: 10px;
width: 500px;
border: 1px solid ${GlobalStyle.color.white};
border-radius: 4px;
`
const Button = styled.button`
    background: ${GlobalStyle.color.bazaraTint};
    padding: 12px;
    width: 150px;
    border-radius: 10px;
    margin-left: 10px;
    border: none;
`
const MiniDiv = styled.div`
    width: 200px;
    margin: 10px 0px;
`

const Link = styled.div`
    width: 200px;
    margin: 10px 0px;
`

const Hr = styled.hr`
        background: ${GlobalStyle.color.white};
`