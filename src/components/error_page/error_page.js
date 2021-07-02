import React from "react";
import './error_page.scss';

const ErrorPage = (error) => {
  return <div id="error-content">
    <div className="content">
      Something went wrong
      <p>{error}</p>
    </div>
  </div>
}

export default ErrorPage;