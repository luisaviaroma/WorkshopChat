import React from 'react';
import SendBox, { MessageInput } from './';
/* 
    enzyme docs: 
        - https://airbnb.io/enzyme/docs/api/ 
*/
/*
    jest docs:
        - https://jestjs.io/
        - https://jestjs.io/docs/en/expect
*/

function createEvent(params) {
    return {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        ...params
    };
}

describe('<SendBox />', () => {
    beforeEach(() => {

    });
    it('should call all functions', () => {
        const onChangeMock = jest.fn();
        const onSubmitMock = jest.fn();
        const onAttachClick = jest.fn();
        const onMicClick = jest.fn();
        const preventDefault = jest.fn();
        const wrapper = mount(
            <SendBox
                placeholder='placeholder'
                value='prova'
                onAttachClick={onAttachClick}
                onChange={onChangeMock}
                onMicClick={onMicClick}
                onSubmit={onSubmitMock}
           />);
        

        let mockedEvent = createEvent({ target: { value: 'qualcosa altro' }});
        
        let input = wrapper.find(MessageInput)
        // console.log(input.debug());
        // here is missing somenthing
        // use .simulate to trigger events
        // https://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html
        let eventMocked = createEvent({ target: { value: 'qualcosa' } })
        // add here input.simulate...
        expect(onChangeMock).toHaveBeenCalled();
        expect(mockedEvent.preventDefault).not.toHaveBeenCalled();
        expect(mockedEvent.stopPropagation).not.toHaveBeenCalled();
    });

    it('should call on onChange', () => {
        const onChangeMock = jest.fn();
        const onSubmitMock = jest.fn();
        const onAttachClick = jest.fn();
        const onMicClick = jest.fn();
        const wrapper = mount(
            <SendBox
                placeholder='placeholder'
                value='prova'
                onAttachClick={onAttachClick}
                onChange={onChangeMock}
                onMicClick={onMicClick}
                onSubmit={onSubmitMock}
            />);
        
        expect(onChangeMock).toHaveBeenCalled();
    });

    it('should meet accessibility guidelines and snapshot', async () => {
        const noop = () => {};
        const wrapper = renderToHtml(<SendBox 
            value='example'
            onChange={noop}
            onSubmit={noop}
            placeholder='search'
            autoComplete='off'
        />);
		const actual = await axe(wrapper);
        expect(actual).toHaveNoViolations();
        expect(wrapper).toMatchSnapshot();
	});
});