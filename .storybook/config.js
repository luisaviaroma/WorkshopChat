import React from 'react';
import { createGlobalStyle } from 'styled-components';

// import { configure, addDecorator } from '@storybook/react';
import { configure, getStorybook, setAddon, addDecorator } from '@storybook/react';
import createPercyAddon from '@percy-io/percy-storybook';

const { percyAddon, serializeStories } = createPercyAddon();

setAddon(percyAddon);


const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;


const styles = {
  // .main-wrapper
  transparentWrapper: {
    backgroundImage:
      "linear-gradient(45deg, #efefef 25%, transparent 25%, transparent 75%, #efefef 75%, #efefef), linear-gradient(45deg, #efefef 25%, transparent 25%, transparent 75%, #efefef 75%, #efefef)",
    backgroundPosition: "0 0, 10px 10px",
    backgroundSize: "20px 20px"
  }
}

// center the damn thing
const withStoryStyles = storyFn => {
  return (
    <div
      style={{
        padding: '20px',
        width: '100%',
        height: '100vh',
        ...styles.transparentWrapper
      }}
    >
      <GlobalStyle />
      {storyFn()}
    </div>
  );
};



// automatically import all files ending in *.stories.js
const req = require.context('../src/ui/stories', true, /.stories.js$/);
function loadStories() {
  addDecorator(withStoryStyles);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
serializeStories(getStorybook);