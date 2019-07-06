import {Component} from "react";
import * as React from "react";
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class NavigationBar extends Component{
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <Nav className={"navbar navbar-expand-lg navbar-dark bg-primary navbar-fixed-top fixed-top"}>
            <Link className="navbar-brand" to={"/"}>Diego Ling</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto" style={{zIndex: 1}}>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/releases">Releases</Link>
                    </li>
                </ul>
            </div>
        </Nav>
    }
}
