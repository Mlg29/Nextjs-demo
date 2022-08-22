import React, { useState, useEffect } from 'react'
import { chevronLeft } from '../../assets'
import MobileHeader from './Header'
import { Container } from './Styled'
import { GlobalStyle } from '../../utils/themes/themes'
import { useRouter } from "next/router"
import styled from 'styled-components'
import Paragraph from '../Paragraph'
import * as CurrencyFormat from "react-currency-format"
import { categoryDisplay } from '../../utils/constants/categories'
import ProductContainer from '../ProductContainer'
import {useAppDispatch, useAppSelector} from "../../app/hook"
import { categoryData, getAllCategories, getByCategories, storeByCategory } from '../../slices/CategorySlice'

function MobileStoreAll() {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const itemType = router?.query?.cate as string

   const [filteredList, setFilteredList] = useState(null)
    useEffect(() => {
        dispatch(getByCategories(itemType)).then(data => {
                setFilteredList(data?.payload)
        })
    }, [itemType])



  return (
    <Container>
        <MobileHeader 
            icon={chevronLeft}
            header={`See All ${itemType === "all" ? "" : itemType}`}
        />
        
        <Paragraph text={itemType === "all" ? "" : itemType} fontSize={GlobalStyle.size.size16} textTransform='capitalize' fontWeight='700' margin='10px 0px' />
        {
            itemType === 'all' && <Grid>
            {
                categoryDisplay?.map(data => {
                    return  <ProductDiv  onClick={() => router.push(`/store/${data?.name}`)}>
                    <ProdDiv>
                        <ContainerImage2 src={data?.image} />
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
                    return  <ProductDiv  onClick={() => router.push(`/store/${data?.name}`)}>
                    <ProdDiv>
                        <ContainerImage2 src={data?.image} />
                        <Paragraph text={data?.name?.length > 15 ? `${data?.name.substring(0, 15)}...` : data?.name} fontSize={GlobalStyle.size.size16} margin='4px 0px 0px 10px' />
                    </ProdDiv>
                </ProductDiv>
                })
            }
        </Grid>
        }
    </Container>
  )
}

export default MobileStoreAll


const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
    `

const ProductDiv = styled.div`

`
const ProdDiv = styled.div`

`
const ContainerImage2 = styled.img`
    width: 100%;
    height: 160px;
`