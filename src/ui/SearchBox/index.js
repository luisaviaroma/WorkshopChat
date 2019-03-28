import React from 'react';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);
const noop = () => {}
export const SearchContainer = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  background-color: #F8F7F7;
  align-items: center;
  height: 48px;
  padding-left: 16px;
  padding-right: 16px;
`;

const IconContainer = styled.div`
  width: 18px;
  height: 18px;
`;

const SearchInputContainer = styled.div`
  margin-left: 10px;
  flex: 1;
`;

export const SearchInput = styled.input`
  border: none;
  background: none;
  width: 100%;
  height: 25.6px;
  font-family: Arial;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #BABBC4;

  &:focus {
    outline: none;
  }
`;

const SearchBox = ({ placeholder, value, onChange, onSubmit }) => (
  <SearchContainer onSubmit={onSubmit} action="">
    <label aria-label="search" htmlFor="labChatSearchInput">
      <IconContainer>
        <FontAwesomeIcon icon="search" color="#BABBC4" />
      </IconContainer>
    </label>

    <SearchInputContainer>
      <SearchInput
        id="labChatSearchInput"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </SearchInputContainer>
  </SearchContainer>
);

SearchBox.defaultProps = {
  placeholder: '',
  value: '',
  onChange: noop,
  onSubmit: noop
};

export default SearchBox