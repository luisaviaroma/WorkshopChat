import styled from 'styled-components';

const SampleComponent = styled.button`
  color: black;
  border: 1px solid black;
  background-color: ${props => props.focused ? 'pink' : 'lightblue'};
  padding: 10px;
`;

SampleComponent.defaultProps = {
  onClick: () => { },
  focused: false
};

export default SampleComponent