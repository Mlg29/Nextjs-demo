
import { Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Paragraph from '../Paragraph'
import TextInput from '../TextInput'
import { useFormik } from 'formik'
import { BuyerProfileFormData, ProfileFormData } from '../../utils/types'
import { BuyerProfileFormSchema, ProfileFormSchema } from '../../utils/schemas'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { changePassword, getProfile, profileInfo, profileLoader, updateProfile } from '../../slices/ProfileSlice'
import { ToastContainer, toast } from 'material-react-toastify';
import { useRouter } from 'next/router'
import ImageContainer from '../Image'
import { getPersonalStore, uploadImage } from '../../slices/StoreSlice'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, DatePicker, Switch } from 'antd';
import { IconImage } from './Styled'
import { editIcon, minus, profile } from '../../assets'
import { GlobalStyle } from '../../utils/themes/themes'
import Button from '../Button'
import { RowBetween, RowStart } from '../../utils/StyledComponent'
import type { DatePickerProps } from 'antd';
import { getAddress, updateAddress } from '../../slices/AddressSlice'
import DeliveryModal from '../DeliveryModal'



function DesktopBuyerProfile() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [edit, setEdit] = useState(false)
    const [stores, setStores] = useState(null)
    const [addressList, setAddressList] = useState(null)
    const [loader, setLoader] = useState(false)
    const profileData = useAppSelector(profileInfo)
    const [imageUrl, setImageUrl] = useState(profileData ? profileData?.imgUrl : "")
    const antIcon = <LoadingOutlined style={{ fontSize: 12 }} spin />;
    const [dob, setDob] = useState(profileData ? profileData?.dob : "")
    const initialValues: BuyerProfileFormData = {
        lName: profileData ? profileData?.lName : '',
        fName: profileData ? profileData?.fName : '',
        email: profileData ? profileData?.email : '',
        mobile: profileData ? profileData?.mobile : '',
        gender: profileData ? profileData?.sex : "",

    }

    const [visible, setVisible] = useState(false)

    const openVisible = () => {
        setVisible(true)
    }

    const closeVisible = () => {
        setVisible(false)
        dispatch(getAddress()).then((d) => {
            setAddressList(d.payload)
        })
    }

    const onchange: DatePickerProps['onChange'] = (date, dateString) => {
        setDob(dateString)
    }

    useEffect(() => {
        dispatch(getProfile())
        dispatch(getPersonalStore()).then((d) => {
            setStores(d.payload)
        })
        dispatch(getAddress()).then((d) => {
            setAddressList(d.payload)
        })
    }, [])

    useEffect(() => {
        const loadImage = () => {
            setImageUrl(profileData?.imgUrl)
        }
        loadImage()
    }, [profileData])

    const profileImageChange = async (fileChange) => {
        const file = fileChange.target.files[0];

        try {
            const data = new FormData();
            await data.append("image", file);
            setLoader(true)
            const resultAction = await dispatch(uploadImage(data))
            if (uploadImage.fulfilled.match(resultAction)) {
                const pd = {
                    imgUrl: resultAction?.payload
                }
                var resultResponse = await dispatch(updateProfile(pd))
                if (updateProfile.fulfilled.match(resultResponse)) {
                    dispatch(getProfile())
                    setLoader(false)
                    toast.success("Profile Image updated successfully");
                }
                else {
                    setLoader(false)
                    console.log("Error")
                }
            }
            else {
                console.log('Error')
            }
        }
        catch (e) {
            console.log({ e })
        }

    }

    const removeImage = () => {
        setImageUrl("")
    }


    const requestPassowrdChange = async () => {
        setLoader(true)
        const data = {
            email: profileData?.email
        }
        try {
            var resultAction = await dispatch(changePassword(data))
            if (changePassword.fulfilled.match(resultAction)) {
                localStorage.removeItem('activeId')
                localStorage.removeItem('token')
                localStorage.removeItem('activeName')
                setLoader(false)
                return router.push('/login')
            }
            else {
                console.log("error")
                setLoader(false)
            }
        }
        catch (e) {
            console.log({ e })
        }
    }

    const changeMode = (item) => {
        localStorage.setItem('mode', item)
        if (item === "Buyer") {
            return router.push('/')
        }
        else {
            return router.push('/my-store')
        }
    }


    const handleProfileUpdate = async (data) => {
        setLoader(true)
        const payload = {
            fName: data?.fName,
            lName: data?.lName,
            email: profileData?.email,
            dob: dob,
            sex: data?.gender,
            mobile: data?.mobile
        }
        try {
            var resultAction = await dispatch(updateProfile(payload))
            if (updateProfile.fulfilled.match(resultAction)) {
                dispatch(getProfile())
                setLoader(false)
                setEdit(false)
                toast.success("Profile updated successfully");
            }
            else {
                console.log("Error")
            }
        }
        catch (e) {
            setLoader(false)
            console.log(e)
        }
    }

    const updateDelivery = (data) => {

        const payload = {
            id: data?._id,
            state: data?.state,
            city: data?.city,
            street: data?.street,
            isDefault: data?.isDefault ? false : true
        }
        dispatch(updateAddress(payload)).then(() => {
            dispatch(getAddress()).then((d) => {
                setAddressList(d.payload)
            })
        })
    }


    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues,
            validationSchema: BuyerProfileFormSchema,
            onSubmit: (data: BuyerProfileFormData) => handleProfileUpdate(data),
            enableReinitialize: true
        });


    return (
        <Contain>
            <Paragraph text='Profile' fontSize={GlobalStyle.size.size24} fontWeight='700' />
            <br />
            <LinDiv>
                <Row>
                    <Col lg="3">
                        <Paragraph text='Basic Information' fontSize={GlobalStyle.size.size16} fontWeight='600' />
                    </Col>

                    <Col lg="9">
                        <RowStart>
                            <div>
                                {
                                    !imageUrl ? <div className="upload-btn-wrapper">
                                        <IconImage
                                            src={profile}
                                            width={100} height={100}
                                        />
                                        <input
                                            type="file"
                                            name="myfile"
                                            accept="image/*"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => profileImageChange(e)}
                                        />
                                    </div>
                                        :
                                        <div>
                                            <ImageContainer type='round' source={imageUrl} width={100} height={100} />
                                        </div>
                                }
                            </div>
                            <RowStart>
                                <div className="upload-btn-wrapper2" >
                                    <Paragraph text='Re-upload' margin='0px 0px 0px 10%' color={GlobalStyle.color.bazaraTint} />

                                    <input
                                        type="file"
                                        name="myfile"
                                        accept="image/*"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => profileImageChange(e)}
                                    />
                                </div>
                                <Paragraph text='Delete' margin='0px 0px 0px -10em' />
                            </RowStart>

                        </RowStart>
                        <br />
                        {
                            edit ?
                                <BigDiv>
                                    <RowBetween>
                                        <MinDiv2>
                                            <TextInput
                                                label='Surname'
                                                value={values.lName}
                                                required
                                                onChange={handleChange('lName')}
                                                errorMsg={touched.lName ? errors.lName : undefined}
                                            />
                                        </MinDiv2>
                                        <MinDiv2>
                                            <TextInput
                                                label='First name'
                                                required
                                                value={values.fName}
                                                onChange={handleChange('fName')}
                                                errorMsg={touched.fName ? errors.fName : undefined}
                                            />
                                        </MinDiv2>
                                        <MinDiv3>
                                            <Button children='Save' isLoading={loader} handlePress={() => handleSubmit()} />
                                        </MinDiv3>
                                    </RowBetween>
                                    <RowBetween>
                                        <MinDiv2>
                                            <Paragraph text='Email Address' />
                                            <Paragraph text={profileData?.email} />
                                        </MinDiv2>
                                        <MinDiv2>
                                            <TextInput
                                                label='Gender'
                                                required
                                                value={values.gender}
                                                onChange={handleChange('gender')}
                                                errorMsg={touched.gender ? errors.gender : undefined}
                                            />
                                        </MinDiv2>
                                        <MinDiv3>

                                        </MinDiv3>
                                    </RowBetween>
                                    <RowBetween>
                                        <MinDiv2>
                                            {/* <Paragraph text='Date of Birth' /> */}
                                            <Date onChange={onchange} value={dob} placeholder='Date of Birth' />
                                        </MinDiv2>
                                        <MinDiv2>
                                            <TextInput
                                                label='Phone number'
                                                required
                                                value={values.mobile}
                                                onChange={handleChange('mobile')}
                                                errorMsg={touched.mobile ? errors.mobile : undefined}
                                            />
                                        </MinDiv2>
                                        <MinDiv3>

                                        </MinDiv3>
                                    </RowBetween>
                                </BigDiv>
                                :
                                <>
                                    <RowBetween>
                                        <MinDiv>
                                            <Paragraph text='First Name' />
                                            <Paragraph text={profileData?.fName} />
                                        </MinDiv>
                                        <MinDiv>
                                            <Paragraph text='Last Name' />
                                            <Paragraph text={profileData?.lName} />
                                        </MinDiv>
                                        <MinDiv onClick={() => setEdit(true)}>
                                            <IconImage
                                                src={editIcon}
                                            />
                                        </MinDiv>
                                    </RowBetween>
                                    <RowBetween>
                                        <MinDiv>
                                            <Paragraph text='Email Address' />
                                            <Paragraph text={profileData?.email} />
                                        </MinDiv>
                                        <MinDiv>
                                            <Paragraph text='Gender' />
                                            <Paragraph text={profileData?.sex} />
                                        </MinDiv>
                                        <MinDiv>

                                        </MinDiv>
                                    </RowBetween>
                                    <RowBetween>
                                        <MinDiv>
                                            <Paragraph text='Date of Birth' />
                                            <Paragraph text={profileData?.dob === null ? "N/A" : profileData?.dob} />
                                        </MinDiv>
                                        <MinDiv>
                                            <Paragraph text='Phone Number' />
                                            <Paragraph text={profileData?.mobile} />
                                        </MinDiv>
                                        <MinDiv>

                                        </MinDiv>
                                    </RowBetween>
                                </>

                        }


                    </Col>
                </Row>
            </LinDiv>
            <LinDiv>
                <Row>
                    <Col lg="3">
                        <Paragraph text='Security' fontSize={GlobalStyle.size.size16} fontWeight='600' />
                    </Col>

                    <Col lg="9">
                        <RowStart>
                            <Paragraph text='************' fontSize={GlobalStyle.size.size16} fontWeight='600' />
                            <Div onClick={() => requestPassowrdChange()}>
                                <Paragraph text='Change password' fontSize={GlobalStyle.size.size16} color={GlobalStyle.color.bazaraTint} margin='0px 0px 0px 10em' fontWeight='600' />
                            </Div>
                        </RowStart>


                    </Col>
                </Row>
            </LinDiv>
            <LinDiv>
                <Row>
                    <Col lg="3">
                        <Paragraph text='Delivery' fontSize={GlobalStyle.size.size16} fontWeight='600' />
                    </Col>

                    <Col lg="9">
                        <Div1>
                            {
                                addressList?.locations?.map(data => {
                                    return <Cod>
                                        <RowStart>
                                            <Checkbox style={{ background: data?.isDefault ? GlobalStyle.color.bazaraTint : 'transparent' }} onClick={() => updateDelivery(data)}></Checkbox>
                                            <Paragraph text={data?.street + " " + data?.city + " " + data?.state} fontSize={GlobalStyle.size.size14} fontWeight='400' />
                                        </RowStart>
                                    </Cod>
                                })
                            }
                        </Div1>
                        <div onClick={() => openVisible()}>
                            <Paragraph text='+  Add delivery Address' fontSize={GlobalStyle.size.size16} color={GlobalStyle.color.bazaraTint} fontWeight='600' />
                        </div>


                    </Col>
                </Row>
            </LinDiv>
            {
                stores?.length > 0 && <LinDiv>
                    <Row>
                        <Col lg="3">
                            <Paragraph text='Switch to Sellers account' fontSize={GlobalStyle.size.size16} fontWeight='600' />
                        </Col>

                        <Col lg="9">
                            <Switch onChange={() => changeMode("Seller")} className='switched' />
                        </Col>
                    </Row>
                </LinDiv>
            }

            <DeliveryModal
                visible={visible}
                setVisible={closeVisible}
            />

            <ToastContainer />
        </Contain>
    )
}

export default DesktopBuyerProfile

const Contain = styled.div`
 padding: 10px 0px;
`
const MinDiv = styled.div`
   width: 300px;
   padding: 10px 0px;
`
const MinDiv2 = styled.div`
   width: 300px;
   padding: 1px 0px;
`
const MinDiv3 = styled.div`
   width: 100px;
   padding: 1px 0px;
`

const Date = styled(DatePicker)`
    background: transparent;
    padding: 15px;
    width: 100%;
    border: 0.5px solid ${GlobalStyle.color.lightGray};
    margin-top: -5px;
`
const BigDiv = styled.div`
    width: 80%; 
`
const LinDiv = styled.div`
    border-top: 1px solid ${GlobalStyle.color.lightwhite};
    padding: 20px 0px;
`

const Div = styled.div`
    cursor: pointer;
`
const Div1 = styled.div`

`
const Cod = styled.div`
    padding: 5px 0px;
`
const Checkbox = styled.div`
 width: 20px;
 height: 20px;
 border-radius: 50%;
 border: 1px solid ${GlobalStyle.color.bazaraTint};
 margin-right: 10px;
`