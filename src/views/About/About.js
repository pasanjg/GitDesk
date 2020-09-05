import React from 'react';
import { Link } from 'react-router-dom';


export default function About() {
    return (
        <div>
            <Link to="/">
                <i className="fa fa-arrow-left"></i>
                <span>Go Back</span>
            </Link>
            <h1>About Page</h1>
        </div>
    )
}
