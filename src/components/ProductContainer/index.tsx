import React from 'react'
import styled from 'styled-components'
import Paragraph from '../Paragraph'
import * as CurrencyFormat from 'react-currency-format';
import { useRouter } from "next/router"
import { GlobalStyle } from '../../utils/themes/themes';
import { ProductContainerType } from '../../utils/types';


const ProductContainer:React.FC<ProductContainerType> = ({ data, mini, name, slug }) => {
    const router = useRouter()

    return (
        <ProductDiv>
            <ProdDiv onClick={mini ? () => router.push(`/category/${data?.name}`) : name?.length > 0 ? () => router.push(`/product/${slug}`) : null}>
                {
                    mini ? <ContainerImageMini src={data?.image} /> : <ContainerImage2 src={name?.length > 0 ? data?.variantImg : data?.image} />
                }

                {
                    name?.length > 1 ?  <Paragraph text={name?.length > 15 ? `${name.substring(0, 15)}...` : name} fontSize={GlobalStyle.size.size16} margin='4px 0px 0px 10px' />
                    :  <Paragraph text={data?.name?.length > 15 ? `${data?.name.substring(0, 15)}...` : data?.name} fontSize={GlobalStyle.size.size16} margin='4px 0px 0px 10px' />
                }
               
               {
                !mini && name?.length < 1 &&  <CurrencyFormat value={name?.length > 0 ? data?.spec[0]?.price: data?.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph margin='0px 0px 0px 10px' text={`${value}`} fontSize={GlobalStyle.size.size16} color={GlobalStyle.color.accent} fontWeight='700' />} />
               }
            </ProdDiv>
        </ProductDiv>
    )
}

export default ProductContainer

const MiniImg = styled.img`
   
`

const ProductDiv = styled.div`

`
const ProdDiv = styled.div`

`
const ContainerImage2 = styled.img`
    width: 300px;
    height: 300px;
    margin: 10px;

    @media screen and (min-width: 320px) and (max-width: 640px) {
        width: 200px;
        height: 200px;
    }

    @media screen and (min-width: 641px) and (max-width: 1007px) {
        width: 205px;
        height: 300px;
        margin: 5px;
    }
`
const ContainerImageMini = styled.img`
width: 150px;
height: 150px;
margin: 5px;
`