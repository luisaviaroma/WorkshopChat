import React from 'react';

const bubbleMessage = ({ fill }) => <svg width="37" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M25.8 1.381c.43 1.385 2.346 5.392 10.637 9.774.426.226.636.619.533 1.003-.103.384-.498.686-1.008.77-.046.008-1.156.19-3.152.32-5.689.374-17.414.29-32.286-4.425C-.568 8.939 31.28-1.587 25.8 1.381z" fill={fill} fillRule="nonzero" /></svg>;

bubbleMessage.defaultProps = {
  fill: '#ffffff'
};

export default bubbleMessage