import {Component} from "react";
import * as React from "react";
import {Col, Container as BootstapContainer, Row} from "react-bootstrap";

export default class Container extends Component {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (

            <BootstapContainer fluid={true} style={{maxWidth: 1200}}>
                <Row>
                    <Col md={12}>
                        {this.props.children}
                    </Col>
                    <Col md={12} style={{textAlign: "center", marginBottom: 20, opacity: 0.2, cursor: "default"}}>
                        Powered And Developed By <a className="text-info" href="https://vk.com/diegoling33">Diego
                        Ling</a><br/>
                        <small>2015-2019 &COPY; All Right Reserved</small>
                    </Col>
                </Row>
            </BootstapContainer>
        )
    }
}