import Header from './Header'
import styled from 'styled-components'

const LayoutStyle = styled.div`
    margin: 20;
    padding: 20;
    border: '1px solid #DDD';
`;

const Layout = (props) => (
    <LayoutStyle>
        <Header />
        {props.children}
    </LayoutStyle>
)

export default Layout;