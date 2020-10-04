import React from "react";
import { css } from "@emotion/core";
import AppLoader from "react-spinners/RingLoader";
import './loader.scss';

const loaderColor = "#64ffda";
const override = css`
  display: block;
  margin: 2 auto;
  border-color: ${loaderColor};
`;

const Loader = ()=>{
    return  <div id="loader-content">
        <div className="sweet-loader">
        <AppLoader
            css={override}
            size={60}
            color={loaderColor}
            loading={true}
        />
        </div>
    </div>
}

export default Loader