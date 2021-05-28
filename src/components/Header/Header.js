import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLocalStorage, setLocalStorage } from '../../utils/Util';

import appLogo from "../../assets/images/appLogo.svg";
import packageJson from '../../../package.json';

import './Header.scss';

export default function Header() {

  const lightIcon = "fa-sun";
  const darkIcon = "fa-moon";

  const [search, setSearch] = useState("");
  const [iconClass, setIconClass] = useState(lightIcon)

  useEffect(() => {
    getLocalStorage("mode") === "dark" ? setIconClass(darkIcon) : setIconClass(lightIcon);
  }, [search])

  function handleSearch(e) {
    // Todo:
    e.preventDefault();
    if (search === null || search === "") {
      window.location.href = `/search`;
    } else {
      window.location.href = `/search?q=${search}`;
    }
  }

  function handleMode() {
    if (getLocalStorage("mode") === "dark") {
      // Todo:
      setLocalStorage("mode", "light")
      document.getElementById("toggle").classList.toggle(lightIcon);
    } else {
      setLocalStorage("mode", "dark")
      document.getElementById("toggle").classList.toggle(darkIcon);
    }
  }

  return (
    <div className="header-content">
      <Link to="/dashboard">
        <div className="logo">
          <img src={appLogo} alt="" width="45" />
          <div className="logo-title">
            <span>GitDesk</span>
            <span className="version text-muted">v{packageJson.version}</span>
          </div>
        </div>
      </Link>
      <div className="search">
        <form onSubmit={(e) => handleSearch(e)}>
          <input className="search-input" name="q" value={search ? search : ""} type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
          <button type="submit" className="btn search-btn">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div className="search-filter">
        {/* <h3>Search Filters</h3> */}
      </div>
      <div className="toggle-mode">
        <div onClick={handleMode} className="mode-icon">
          <i id="toggle" className={`fa ${iconClass}`}></i>
        </div>
      </div>
    </div>
  );
}
