import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Paragraph from '../Paragraph'
import * as CurrencyFormat from "react-currency-format"
import { GlobalStyle } from '../../utils/themes/themes'
import { useRouter } from "next/router"
import { categoryDisplay } from '../../utils/constants/categories'
import ProductContainer from '../ProductContainer'
import { useAppDispatch } from '../../app/hook'
import { getAllCategories } from '../../slices/CategorySlice'

function DesktopCategory() {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const itemType = router?.query?.cate as string


    const [filteredList, setFilteredList] = useState(null)
    useEffect(() => {
        dispatch(getAllCategories()).then(data => {
            console.log({data})
            setFilteredList(data?.payload)
        })
    }, [itemType])



    return (
        <>
            <Paragraph text={itemType === "all" ? "" : itemType} fontSize={GlobalStyle.size.size24} textTransform='capitalize' fontWeight='700' margin='10px 0px' />

            {
                itemType === 'all' && <Grid>
                    {
                        categoryDisplay?.map(data => {
                            return <ProductDiv onClick={() => router.push(`/store/${data?.name}`)}>
                                <ProdDiv>
                                    <ContainerImage2 src={data?.image ? data?.image : "https://res.cloudinary.com/doouwbecx/image/upload/v1660556942/download_fcyeex.png"} />
                                    <Paragraph text={data?.name?.length > 15 ? `${data?.name.substring(0, 15)}...` : data?.name} fontSize={GlobalStyle.size.size16} margin='4px 0px 0px 10px' />
                                </ProdDiv>
                            </ProductDiv>
                        })
                    }
                </Grid>
            }

{
            itemType !== 'all' && <Grid>
            {
                categoryDisplay?.map(data => {
                    return <ProductDiv onClick={() => router.push(`/store/${data?.name}`)}>
                        <ProdDiv>
                            <ContainerImage2 src={data?.image ? data?.image : "https://res.cloudinary.com/doouwbecx/image/upload/v1660556942/download_fcyeex.png"} />
                            <Paragraph text={data?.name?.length > 15 ? `${data?.name.substring(0, 15)}...` : data?.name} fontSize={GlobalStyle.size.size16} margin='4px 0px 0px 10px' />
                        </ProdDiv>
                    </ProductDiv>
                })
            }
        </Grid>
        }
        </>
    )
}

export default DesktopCategory

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