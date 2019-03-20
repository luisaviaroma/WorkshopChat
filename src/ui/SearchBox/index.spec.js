import React from 'react';
import SearchBox, { SearchInput, SearchContainer } from './';

describe('<SeachBox />', () => {
    it('should call on submit', () => {
        const onChangeMock = jest.fn();
        const onSubmitMock = jest.fn();
        const wrapper = mount(
            <SearchBox
                value=''
                onChange={onChangeMock}
                onSubmit={onSubmitMock}
                placeholder='search'
                autoComplete='off'
            />);
        const form = wrapper.find(SearchContainer);
        const input = wrapper.find(SearchInput);
        expect(form.length).toBe(1);
        /** 
         * event does not propagate if you use shallow
         */
        // input.simulate('keyup', { keyCode: 13, key: 'Enter' });
        input.simulate('submit', { key: 'Enter', keyCode: 13 });
        expect(onSubmitMock).toHaveBeenCalled();
        // expect(onChangeMock).toHaveBeenCalled();
    });

    it('should call on onChange', () => {
        const onChangeMock = jest.fn();
        const onSubmitMock = jest.fn();
        const wrapper = mount(
            <SearchBox
                value=''
                onChange={onChangeMock}
                onSubmit={onSubmitMock}
                placeholder='search'
                autoComplete='off'
            />);
        // const form = wrapper.find(SearchContainer);
        const input = wrapper.find(SearchInput);
        /** 
         * event does not propagate if you use shallow
         */
        input.simulate('change', { target: { value: 'Hello' } });
        expect(onChangeMock).toHaveBeenCalled();
    });

   it('should meet accessibility guidelines', async () => {
        const wrapper = renderToHtml(<SearchBox />);
        //console.log('wrapper', wrapper);
		const actual = await axe(wrapper);
        //console.log(actual);
        expect(actual).toHaveNoViolations();
	});
});