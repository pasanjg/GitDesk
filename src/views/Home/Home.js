import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

export default function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <span>FontAwesome: </span><i className="fa fa-laptop"></i> <i className="fab fa-react"></i>
            <Link to="/about">
                <h4>Go to About Page</h4>
            </Link>
            <button className="btn btn-success">Click</button>
        </div>
    )
}
