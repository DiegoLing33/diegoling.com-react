import {Component} from "react";
import {Col, Row} from "react-bootstrap";
import * as React from "react";
import Application from "../../app/Application";
import TrackNode from "../track/TrackNode";

/**
 * Список треков
 */
export default class IndexPage extends Component {

    state = {
        tracks: null,
    };

    /**
     * Компонент загружен
     */
    componentDidMount(): void {
        this.setState({
            tracks: Application.managers.tracksManager.list().map((value, index) =>
                <Col md={4} key={value.name}>{TrackNode.createByData({...value, index: index + 1})}</Col>)
        });
    }

    /**
     * Отрисовка
     */
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Row>
                {this.state.tracks}
            </Row>
        );
    }

}
