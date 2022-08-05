import React, { useEffect, useState } from 'react'
import { RowBetween, RowCenter } from '../../utils/StyledComponent'
import Button from '../Button'
import MobileTabs from './reusable/MobileTabs'
import { Container, IconImage } from './Styled'

import styled from 'styled-components'
import { useRouter } from 'next/router'
import Paragraph from '../Paragraph'
import { GlobalStyle } from '../../utils/themes/themes'
import { bank, blueUni, blueUser, groupUser, marks, pVector, store, truck } from '../../assets'
import { ArrayOptionType } from '../../utils/types/types'
import ListCard from './reusable/ListCard'
import { Switch } from 'antd'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { getPersonalStore, getStoreById, myStore, storebyId, updateStore } from '../../slices/StoreSlice'
import ResponseModal from '../Modal/ResponseModal'
import { getAssignedStoresRole, storeRolesList } from '../../slices/StaffSlice'
import ImageContainer from '../Image'

function MobileSettings() {
  const router = useRouter();
  const dispatch = useAppDispatch()

  const storeInfo = useAppSelector(storebyId)
  const myStoreData = useAppSelector(myStore)
  const activeId = localStorage.getItem('activeId')
  const myStoreRoles = useAppSelector(storeRolesList)

  const allStore = myStoreRoles?.map(data => {
    return data?.sidehustle?.status === 'active' && {
      id: data?.sidehustle?.id,
      brandName: data?.sidehustle?.brandName,
      status: data?.sidehustle?.status,
      role: data?.role

    }
  })

  const storeAddedTo = myStoreData?.map((data, i) => {
    return data?.status === 'active' && i < 3 && {
      id: data?.id,
      brandName: data?.brandName,
      status: data?.status,
      role: "Owner"
    }
  })

  const ActiveStores = storeAddedTo?.concat(allStore)

  const [checked, setChecked] = useState<string>(storeInfo?.status)

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')


  const handleModalClose = () => {
    setVisible(false)
  }

  useEffect(() => {
    dispatch(getStoreById(activeId))
    setChecked(storeInfo?.status)
    dispatch(getPersonalStore())
    dispatch(getAssignedStoresRole())
  }, [activeId])

  // useEffect(() => {
  //   const loadStatus = () => {
  //     const stat = storeInfo?.status === 'active' ? true : false

  //     setChecked(stat)
  //   }

  //   loadStatus()
  // }, [storeInfo])

  const quickActionArray = [
    {
      id: 1,
      title: "Store Information",
      icon: store,
      route: 'edit-store'
    },
    {
      id: 2,
      title: "User / Staff Management",
      icon: groupUser,
      route: 'staff'
    },
    {
      id: 3,
      title: "Delivery / Shipping Fee",
      icon: truck,
      route: 'delivery'
    },
    {
      id: 4,
      title: "Reviews and Ratings ",
      icon: bank,
      route: 'rating'
    }

  ]


  const personalActionArray = [
    {
      id: 1,
      title: "Profile",
      icon: pVector,
      route: 'profile'
    },
    {
      id: 2,
      title: "Payout Bank Account",
      icon: bank,
      route: 'payout'
    }

  ]

  const onChange = async (checked: boolean) => {
    const payload = {
      id: activeId,
      brandName: storeInfo.brandName,
      description: storeInfo.description,
      imgUrl: storeInfo?.imgUrl,
      address: storeInfo?.location?.street + " " + storeInfo?.location?.city + " " + storeInfo?.location?.state,
      phoneNumber: storeInfo.phoneNumber,
      isDraft: false,
      status: checked ? 'active' : 'inactive',
      location: {
        state: storeInfo?.location?.state,
        city: storeInfo?.location?.city,
        street: storeInfo?.location?.street,
      },
    }
    const resultAction = await dispatch(updateStore(payload))
    if (updateStore.fulfilled.match(resultAction)) {
      setType('Success')
      setTitle('Store updated successfully')
      setVisible(true)
      dispatch(getStoreById(activeId))
    }
    else {
      setType('Error')
      setTitle('Unable to update store')
      setVisible(true)
    }
  };


  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('activeId')
    localStorage.removeItem('activeName')
    localStorage.removeItem('role')
    return router.push('/')
  }

  const changeStore = (item) => {
    localStorage.setItem('activeId', item?.id)
    localStorage.setItem('activeName', item?.brandName)
    localStorage.setItem('role', item?.role)

    dispatch(getStoreById(activeId))
    dispatch(getPersonalStore())
    dispatch(getAssignedStoresRole())

  }


  return (
    <Container>
      <RowBetween>
        <Paragraph text='Store Information' fontSize={GlobalStyle.size.size18} fontWeight='600' />
        <Div onClick={signOut}>
          <Paragraph text='Log out' color={GlobalStyle.color.bazaraTint} />
        </Div>
      </RowBetween>
      <br />
      {
        quickActionArray?.map((data: ArrayOptionType) => {
          return <ListCard key={data?.id} {...data} />
        })
      }
      <View>
        <Paragraph text='Personal Information' fontSize={GlobalStyle.size.size14} fontWeight='600' />
      </View>

      {
        personalActionArray?.map((data: ArrayOptionType) => {
          return <ListCard key={data?.id} {...data} />
        })
      }
      <View>
        <Paragraph text='Stores' fontSize={GlobalStyle.size.size14} fontWeight='600' />
      </View>
      <Subdiv>
        {
          ActiveStores?.filter((n, i) => n && i <= 3)?.map(data => {
            return (
              <Listdiv onClick={() => changeStore(data)}>
                <RowBetween>
                  <Menudiv>
                    <Paragraph text={data?.brandName} />
                    <Paragraph text={data?.role} color={GlobalStyle.color.gray} />
                  </Menudiv>
                  {
                    data?.id === activeId && <ImageContainer width={20} height={20} type="round" source="https://res.cloudinary.com/doouwbecx/image/upload/v1659439185/Group_10652_tia6rl.png" />
                  }
                 
                </RowBetween>
              </Listdiv>

            )
          })
        }
        {
          ActiveStores?.filter((n) => n)?.length < 3 && <div onClick={() => router.push('/create-store')}>
             <Paragraph text="+ Add another store" color={GlobalStyle.color.bazaraTint} margin='3px 0px 0px 0px' />
          </div>
        }
      </Subdiv>
      <RowBetween>
        <Paragraph text='Activate / Deactivate Store' fontSize={GlobalStyle.size.size14} fontWeight='400' />
        <Switch onChange={onChange} defaultChecked={checked === 'active' ? true : false} className='switched' />
      </RowBetween>
      <br />
      <RowBetween>
        <Paragraph text='Switch to Buyer' fontSize={GlobalStyle.size.size14} fontWeight='400' />
        <Switch defaultChecked={false} className='switched' />
      </RowBetween>
      <MobileTabs />

      <ResponseModal
        title={title}
        type={type}
        modalVisible={visible}
        setModalVisible={handleModalClose}
        handlePress={handleModalClose}
      />
    </Container>
  )
}

export default MobileSettings

const Div = styled.div`
  
`

const View = styled.div`
 background: ${GlobalStyle.color.artBoard};
 padding: 8px;
 margin-top: 5px;
`

const Subdiv = styled.div`
  margin-bottom: 10px;
`

const Listdiv = styled.div`
  padding: 10px 0px;
  border-bottom: 0.5px solid ${GlobalStyle.color.lightwhite}
`
const Menudiv = styled.div`

`

const ActiveCard = styled.div`
background: red;
background-size: cover;
width: 25px;
height: 25px;
border-radius: 50px;
`