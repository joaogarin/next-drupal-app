import Header from './Header'
import styled from 'styled-components'

const layoutStyle = styled.div`
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
`

const Layout = (props) => (
    <layoutStyle>
        <Header />
        {props.children}
    </layoutStyle>
)

export default Layout;