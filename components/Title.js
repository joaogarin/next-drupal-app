import styled from 'styled-components';

const TitleHeader = styled.h1`
  font-size: 20px;
  border-bottom: 1px solid #dedede;
  padding-bottom: 1rem;
`;

const Title = (props) => (
    <TitleHeader>
        {props.children}
    </TitleHeader>
);

export default Title;