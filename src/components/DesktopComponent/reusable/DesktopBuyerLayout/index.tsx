import React from 'react'
import styled from 'styled-components'
import Footer from '../../../Footer'
import DesktopBuyerNavigation from '../DesktopBuyerNavigation'



const DesktopBuyerLayouts = ({ children }) => {
  return (
    <Container>
      <Div>
        <DesktopBuyerNavigation />
        <View>
          {children}
        </View>
      </Div>
      <Footer />
    </Container>
  )
}

export default DesktopBuyerLayouts


const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Div = styled.div`
    width: 100%;
    padding: 0% 60px;

`

const View = styled.div`
    width: 100%;

`