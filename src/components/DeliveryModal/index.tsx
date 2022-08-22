import { Modal } from 'antd'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import styled from 'styled-components'
import { cancel } from '../../assets'
import { locationData } from '../../utils/constants/location'
import { DeliverySchema } from '../../utils/schemas'
import { RowBetween } from '../../utils/StyledComponent'
import { GlobalStyle } from '../../utils/themes/themes'
import { DeliveryData, locationProp } from '../../utils/types'
import Button from '../Button'
import { IconImage } from '../DesktopComponent/Styled'
import Paragraph from '../Paragraph'
import SelectField from '../SelectField'
import TextInput from '../TextInput'
import {useAppDispatch} from "../../app/hook"
import { addAddress, getAddress } from '../../slices/AddressSlice'

function DeliveryModal({ visible, setVisible }) {
    const dispatch = useAppDispatch()
    const [loader, setLoader] = useState(false)
    const [isDefault, setIsDefault] = useState(false)

    const initialValues: DeliveryData = {
        street: "",
        state: "",
        city: ""
    }

    const handleFormSubmit = async (data) => {
        const payload = {
            state: data?.state,
            city: data?.city,
            street: data?.street,
            isDefault: isDefault
        }

        setLoader(true)

        try {
            const response = await dispatch(addAddress(payload))
            if(addAddress.fulfilled.match(response)) {
                setVisible()
                setLoader(false)
                setIsDefault(false)
                dispatch(getAddress())
                resetForm()
            }
            else {
                setLoader(false)
                console.log({response})
            }
        }
        catch (e) {
            setLoader(false)
            console.log({e})
        }
    }

   

    const { values, errors, touched, handleChange, handleSubmit, handleBlur, resetForm } =
        useFormik({
            initialValues,
            validationSchema: DeliverySchema,
            onSubmit: (data: DeliveryData) => handleFormSubmit(data),
            enableReinitialize: true
        });

        const locationState = locationData?.map((data: locationProp) => data?.state);

        const locationCity = locationData?.find(
            (data: locationProp) => data?.state === values.state,
        )?.city;



    return (
        <ModalCard
            title={null}
            centered
            style={{ top: 0 }}
            visible={visible}
            onOk={setVisible}
            onCancel={setVisible}
            footer={null}
            closable={false}

        >
            <ContainerDiv>
                <RowBetween>
                    <Paragraph textTransform='capitalize' margin='2% 0%' text={`Delivery Address`} fontSize={GlobalStyle.size.size16} fontWeight='700' />
                    <div onClick={setVisible}>
                        <IconImage src={cancel} />
                    </div>
                </RowBetween>

                <div>
                    <TextInput
                        label='Delivery Address'
                        required
                        value={values.street}
                        onChange={handleChange('street')}
                        errorMsg={touched.street ? errors.street : undefined}
                    />

                    <SelectField
                        data={locationState}
                        value={values.state}
                        placeholder="Select State"
                        onSearch={handleChange('state')}
                        onChange={handleChange('state')}
                        errorMsg={touched.state ? errors.state : undefined}
                    />

                    <SelectField
                        data={locationCity}
                        value={values.city}
                        placeholder="Select City"
                        onSearch={handleChange('city')}
                        onChange={handleChange('city')}
                        errorMsg={touched.city ? errors.city : undefined}
                    />

                    <br/>
                    <Div>
                        <Checkbox style={{background: isDefault ? GlobalStyle.color.bazaraTint : 'transparent'}} onClick={() => setIsDefault(!isDefault)}></Checkbox>
                        <Paragraph text='Set as Default' />
                    </Div>
                    <br/>

                    <Button isLoading={loader} children='Add Address' handlePress={handleSubmit} />
                </div>
            </ContainerDiv>

        </ModalCard>
    )
}

export default DeliveryModal


const ContainerDiv = styled.div`
 width: 100%;
`

const ModalCard = styled(Modal)`
    
`

const Div = styled.div`
 width: 100%;
 display: flex;
`

const Checkbox = styled.div`
 width: 20px;
 height: 20px;
 border-radius: 50%;
 border: 1px solid ${GlobalStyle.color.bazaraTint};
 margin-right: 10px;
`

