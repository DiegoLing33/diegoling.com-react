import {Component} from "react";
import {Row} from "react-bootstrap";
import * as React from "react";
import TracksManager from "../../app/TracksManager";
import TrackThumbView from "./TrackThumbView";

/**
 * Список треков
 */
export default class IndexTracksWrapper extends Component {

    state = {
        tracks: null,
    };

    /**
     * Компонент загружен
     */
    componentDidMount(): void {
        TracksManager.loadTracks()
            .then(tracks => {
                this.setState({
                    tracks: tracks.map((value, index) =>
                        TrackThumbView.createByData({...value, index: index + 1}))
                });
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