import styled from 'styled-components';

const SampleComponent = styled.button`
  color: black;
  background-color: ${props => props.focused ? 'pink' : 'lightblue'};
  padding: 30px;
`;

SampleComponent.defaultProps = {
  onClick: () => { },
  focused: false
};

export default SampleComponent