import React, { Component } from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { renderToStaticMarkup } from 'react-dom/server';
import { axe, toHaveNoViolations } from 'jest-axe';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);
global.shallow = Enzyme.shallow;
global.mount = Enzyme.mount;
global.render = Enzyme.render;
global.renderToHtml = renderToStaticMarkup;
global.axe = axe;