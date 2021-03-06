import Link from 'next/link';
import styled from 'styled-components';

const LinkedStyle = styled.a`
  margin-right: 15px;
  cursor: pointer;
`;

const Header = () => (
    <div>
        <Link href="/">
            <LinkedStyle>Home</LinkedStyle>
        </Link>
        <Link href="/recipes">
            <LinkedStyle>Recipes</LinkedStyle>
        </Link>
    </div>
);

export default Header;