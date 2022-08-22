
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { chevronLeft, good } from '../../assets'
import { GlobalStyle } from '../../utils/themes/themes'
import Button from '../Button'
import Paragraph from '../Paragraph'
import SelectField from '../SelectField'
import TextInput from '../TextInput'
import MobileHeader from './Header'
import { BottomContainer, ColumnContainer, Container, IconImage } from './Styled'

import { userRoles } from '../../utils/constants/roles'
import { useFormik } from 'formik'
import { AddStaffData } from '../../utils/types'
import { AddStaffSchema } from '../../utils/schemas'
import { toast, ToastContainer } from 'material-react-toastify';
import {useAppDispatch, useAppSelector} from "../../app/hook"
import { useRouter } from 'next/router'
import { addStaff, getRoles, storeRolesList } from '../../slices/StaffSlice'


const MobileAddStaff = () => {
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState('')
  const dispatch = useAppDispatch()
  const router = useRouter()
  const userRoles = useAppSelector(storeRolesList)
  const initialValues: AddStaffData = {
      email: '',
      role: ''
  }

  const id = localStorage.getItem("activeId")


  useEffect(() => {
    dispatch(getRoles())
  }, [])


 


  
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
  useFormik({
      initialValues,
      validationSchema: AddStaffSchema,
      onSubmit: (data: AddStaffData) => handleAddStaff(data),
  });


  const roleId = userRoles?.find(data => data?.role === values.role)?.id

  const userRoleData = userRoles?.map(data => {
    return {
      id: data?.id,
      type: data?.role
    }
  })

  const handleAddStaff = async (data) => {
    setLoading(true)
    const paylaod = {
        email: data?.email,
        roleId: roleId,
        storeId: id
    }

    try {
        const response = await dispatch(addStaff(paylaod))
        if(addStaff.fulfilled.match(response)) {
            toast.success('Staff Added')
            setLoading(false)
            // return router.push('/staff')
        }
        else {
            setLoading(false)
           // toast.error(response?.message)
        }
    }
    catch(e) {
        console.log({e})
        setLoading(false)
    }
}


  const permissionData = userRoles?.find(data => data?.role === values?.role)?.permissions

  console.log({userRoleData, userRoles, roleId})


  const handleRoleChange = (e) => {
    setRole(e)
  }



  return (
    <Container>
      <MobileHeader
        icon={chevronLeft}
        header="Add New Staff"
      />

      <ColumnContainer>
        <Paragraph text='Kindly provide new user details' fontSize={GlobalStyle.size.size16} fontFamily='600' margin='3% 0%' />
        <TextInput
          label={'Email Address'}
          required
          value={values.email}
          onChange={handleChange('email')}
          errorMsg={touched.email ? errors.email : undefined}
        />

        <SelectField
          placeholder='Staff role'
          type
          value={values.role}
          data={userRoleData}
          onSearch={handleChange('role')}
          onChange={handleChange('role')}
          errorMsg={touched.role ? errors.role : undefined}
        />

        {/* <TextDiv>
          <Paragraph text='View role permissions' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size16} fontFamily='600' margin='3% 0%' />
        </TextDiv>

        {
          permissionData?.map((data, i) => {
            return <View key={i}>
              <IconImage src={good} />
              <Paragraph key={i} text={data.permission} margin='0% 5px' />
            </View>
          })
        } */}
      </ColumnContainer>

      <BottomContainer>
        <Button isLoading={loading} children={'Add Staff'} handlePress={handleSubmit} />
        {/* <SubDiv>
          <Paragraph text='Deactivate Staff' fontSize={GlobalStyle.size.size16} fontFamily='600' margin='3% 0%' />
        </SubDiv> */}
      </BottomContainer>

      <ToastContainer />
    </Container>
  )
}

export default MobileAddStaff

const TextDiv = styled.div`
  cursor: pointer;
`

const SubDiv = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
`

const View = styled.div`
  padding: 5px 0%;
  display: flex;
`