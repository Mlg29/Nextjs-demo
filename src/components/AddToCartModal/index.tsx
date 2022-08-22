import { Modal } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { cancel } from '../../assets'
import { RowBetween } from '../../utils/StyledComponent'
import Button from '../Button'
import { IconImage } from '../mobileComponents/Styled'
import Paragraph from '../Paragraph'

function AddToCartModal({visible, setVisible,handleAdd, handleDelete}) {

    const getCartFromStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')) : null

  return (
    <ModalCard
        visible={visible}
        onOk={() =>setVisible()}
        onCancel={() => setVisible()}
        footer={null}
        title={null}
        centered
        width={600}
    >
        <Contain>
            <RowBetween>
                <Paragraph text='Action Required' />

                <div onClick={() => setVisible()}>
                        <IconImage src={cancel} />
                    </div>
            </RowBetween>
            <br/>
            <Paragraph text={`You have ${getCartFromStorage?.length} Item about to be added to your cart`} />
            <br/>
            <Button type='cancel' children='Delete' handlePress={handleDelete} />
            <br/>
            <br/>
            <Button children='Add' handlePress={handleAdd} />
        </Contain>

    </ModalCard>
  )
}

export default AddToCartModal

const ModalCard = styled(Modal)`


`

const Contain = styled.div`

`