import { Badge, Dropdown, Menu, Space, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { bell, cart, danger, logo, payment, ppSvg, productLogo, profile, square } from '../../../../assets'
import { getProfile, profileInfo } from '../../../../slices/ProfileSlice'
import { RowBetween, RowStart } from '../../../../utils/StyledComponent'
import { GlobalStyle } from '../../../../utils/themes/themes'
import Paragraph from '../../../Paragraph'
import { useAppDispatch, useAppSelector } from '../../../../app/hook'
import { Container, IconImage } from '../../Styled'
import { useRouter } from 'next/router'
import { getNotifications, getSellerNotificationStat, sellerNotificationStat } from '../../../../slices/NotificationSlice'
import EmptyState from '../../../mobileComponents/reusable/EmptyState'
import NotificationCard from '../../../NotificationCard'
import DesktopNotificationCard from '../../../NotificationCard/DesktopNotificationCard'
import SearchInput from '../../../SearchInput'
import SearchIcon from '@mui/icons-material/Search';
import Button from '../../../Button'
import { CartData, getCarts } from '../../../../slices/CartSlice'


const TabletBuyerNavigation = () => {
    const dispatch = useAppDispatch()
    const profileData = useAppSelector(profileInfo)
    const router = useRouter()
    const sellerNotificationStats = useAppSelector(sellerNotificationStat)
    const [search, setSearch] = useState("")
    const getCartFromStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')) : null
    const getToken = localStorage.getItem('token')
    const CartList = useAppSelector(CartData)
    const [getCartData, setGetCartData] = useState(null)
    const [localCart, setLocalCart] = useState(getCartFromStorage)

    const onChange = async (checked: boolean) => {
    };


    useEffect(() => {
        if (getToken) {
            dispatch(getNotifications())
            dispatch(getCarts())
            dispatch(getProfile())
        }
    }, [])

    const signOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('activeId')
        localStorage.removeItem('activeName')
        localStorage.removeItem('role')
        localStorage.removeItem('mode')
        return router.push('/')
    }

    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <TextDiv onClick={() => router.push('/buyer-profile')}>
                            <Paragraph text='Profile' />
                        </TextDiv>
                    ),
                    key: '0',
                },
                {
                    label: (
                        <TextDiv onClick={() => router.push('/buyer-orders')}>
                            <Paragraph text='My Orders' />
                        </TextDiv>
                    ),
                    key: '1',
                },
                {
                    label: (
                        <TextDiv onClick={() => signOut()}>
                            <Paragraph text='Log out' />
                        </TextDiv>
                    ),
                    key: '2',
                }
            ]}
        />
    )

    useEffect(() => {
        dispatch(getSellerNotificationStat())
    }, [])

    const isNotificationAvailable = sellerNotificationStats?.pendingOrders?.count > 0 || sellerNotificationStats?.completedOrders?.count > 0 || sellerNotificationStats?.productsOutOfStock?.count > 0 || sellerNotificationStats?.paymentReceived?.count > 0

    const routeSearch = () => {
        return router.push(`/search/${search}`)
    }

    return (
        <Nav>
            <RowBetween>
                <Contain1>
                    <RowStart>
                        <div onClick={() => router.push('/')}>
                            <IconImage src={logo} />
                        </div>
                    </RowStart>
                </Contain1>


                {
                    !getToken ? <Contain3>

                        <BtnDiv>
                            <RowBetween>
                                <div onClick={() => router.push('/cart')}>
                                    <Badge count={getCartFromStorage?.length}>
                                        <IconImage src={cart} />
                                    </Badge>
                                </div>
                                <div onClick={() => router.push('/login')}>
                                    <IconImage src={ppSvg} />
                                </div>
                            </RowBetween>
                        </BtnDiv>


                    </Contain3> :
                        <Contain2>
                            <RowStart>
                                <BellDiv onClick={() => router.push('/buyer-notification')}>
                                    <Badge dot={isNotificationAvailable}>
                                        <IconImage
                                            src={bell}
                                            width={20}
                                            height={20}
                                        />
                                    </Badge>
                                </BellDiv>

                                <BellDiv onClick={() => router.push('/cart')}>
                                    <Badge count={CartList?.length}>
                                        <IconImage
                                            src={cart}
                                            width={20}
                                            height={20}
                                        />
                                    </Badge>
                                </BellDiv>

                                <DropdownDiv>
                                    <Dropdown overlay={menu} trigger={['click']}>
                                        <SpaceDiv>
                                            <IconImage
                                                src={profile}
                                                width={20}
                                                height={20}
                                            />
                                            <Paragraph text={`Hello Olasukanmi Lawal`} fontSize={GlobalStyle.size.size16} fontFamily="600" margin='0% 0% 0% 10px ' />
                                        </SpaceDiv>
                                    </Dropdown>
                                </DropdownDiv>
                            </RowStart>
                        </Contain2>
                }



            </RowBetween>
            <View>
                <Div>
                    <SearchInput label={'Search for product, store and brand'} value={search} onChange={(e) => setSearch(e.target.value)} />
                </Div>
                <Btn onClick={() => routeSearch()}>
                    <SearchIcon style={{ color: 'white' }} />
                </Btn>

            </View>
        </Nav>
    )
}

export default TabletBuyerNavigation

const Nav = styled.div`
  padding: 10px 0%;
  width: 100%;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 111;
  background: ${GlobalStyle.color.realBlack}
`

const Btn = styled.div`
    background: ${GlobalStyle.color.bazaraTint};
    padding: 10px;
`
const EmptyDiv = styled.div`
    width: 20px;
`
const View = styled.div`
display: flex;
align-items: center;
width: 100%;
`
const BtnDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 70px;
`
const Contain1 = styled.div`
    width: 100%;

 
`

const Contain2 = styled.div`
  width: 50%;

`
const Contain3 = styled.div`

`

const Div = styled.div`
width: 100%;
`

const BellDiv = styled.div`
  padding: 0% 3%;
`

const DropdownDiv = styled.div`
padding: 0% 2%;
width: 100px;
cursor: pointer;
`

const TextDiv = styled.div`
cursor: pointer;
`

const MenuDiv = styled(Menu)`
  width: 400px;
  max-height: 350px;
  padding: 20px;
  background:  ${GlobalStyle.color.darkBlack} !important;
`
const Break = styled.hr`
 color: ${GlobalStyle.color.gray};
`

const SpaceDiv = styled.div`
    display: flex;
    width: 200px;
`
const Button2 = styled.button`
  background: ${GlobalStyle.color.bazaraTint};
  padding: 10px;;
  border: none;
  min-width: 100px;
  border-radius: 5px;
`