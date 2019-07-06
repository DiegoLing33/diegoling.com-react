import {Component} from "react";
import * as React from "react";
import {Col, Container as BootstapContainer, Row} from "react-bootstrap";

export default class Container extends Component<any> {
    render(): React.ReactNode {
        return (
            <BootstapContainer fluid={true} style={{maxWidth: "100%", width: 1000}}>
                <Row>
                    <Col md={12}>
                        {this.props.children}
                    </Col>
                    <Col md={12} style={{textAlign: "center", marginBottom: 20, opacity: 0.5, cursor: "default"}}>
                        Powered And Developed By <a className="text-info" href="https://vk.com/diegoling33">Diego
                        Ling</a><br/>
                        <small>2015-2019 &COPY; All Right Reserved</small>
                    </Col>
                </Row>
            </BootstapContainer>
        )
    }
}
