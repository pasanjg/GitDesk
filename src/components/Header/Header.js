import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import appLogo from "../../assets/images/appLogo.svg";
import packageJson from '../../../package.json';

import './Header.scss';

export default function Header() {

  const lightIcon = "fa-sun";
  const darkIcon = "fa-moon";

  const [search, setSearch] = useState("");
  const iconClass = localStorage.getItem("mode") === "dark" ? darkIcon : lightIcon;

  useEffect(() => {
    if (localStorage.getItem("mode") === "dark") {
      document.body.classList.add('dark');
      localStorage.setItem('mode', 'dark');
    }
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (search === null || search === "") {
      window.location.href = `/search`;
    } else {
      window.location.href = `/search?q=${search}`;
    }
  }

  function handleMode() {
    if (localStorage.getItem("mode") === "dark") {
      localStorage.setItem("mode", "light");
      document.getElementById("toggle").classList.toggle(lightIcon);
    } else {
      localStorage.setItem("mode", "dark")
      document.getElementById("toggle").classList.toggle(darkIcon);
    }
    document.body.classList.toggle('dark');
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
