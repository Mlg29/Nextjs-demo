import React from 'react'
import styled from 'styled-components'

import TabletBuyerNavigation from '../TabletBuyerNavigation'
import TabletFooter from '../TabletFooter'



const TabletBuyerLayouts = ({ children }) => {
  return (
    <Container>
      <Div>
        <TabletBuyerNavigation />
        <View>
          {children}
        </View>
      </Div>
      <TabletFooter />
    </Container>
  )
}

export default TabletBuyerLayouts


const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Div = styled.div`
    width: 100%;
    padding: 0% 20px;

`

const View = styled.div`
    width: 100%;

`