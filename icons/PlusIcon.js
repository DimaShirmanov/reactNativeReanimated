import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlusIcon = (props = {}) => {
    return (
        <Svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          enableBackground="new 0 0 512 512"
          version="1.1"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
        >
          <circle cx="256" cy="256" r="256" fill="#0043C6"></circle>
          <g fill="#FFF">
            <path d="M240 120H272V392H240z"></path>
            <path d="M120 240H392V272H120z"></path>
          </g>
        </Svg>
      );
}

export default PlusIcon;