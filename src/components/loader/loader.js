import React from "react";
import './loader.scss';

import octocatSpinner from '../../assets/images/octocat-spinner.gif';

const Loader = () => {
  return <div id="loader-content">
    <div className="octocat-spinner">
      <img src={octocatSpinner} alt="octocat" width="60" />
    </div>
  </div>
}

export default Loader;
