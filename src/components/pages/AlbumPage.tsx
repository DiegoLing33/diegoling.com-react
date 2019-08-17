import React from "react";
import CardView from "../CardView";
import {Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import Application from "../../app/Application";
import TrackVideoNode from "../track/TrackVideoNode";
import TrackNode from "../track/TrackNode";

/*
 *
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 *  ,--. o                   |    o
 *  |   |.,---.,---.,---.    |    .,---.,---.
 *  |   |||---'|   ||   |    |    ||   ||   |
 *  `--' ``---'`---|`---'    `---'``   '`---|
 *             `---'                    `---'
 *
 *   Copyright (C) 2016-2017, Yakov Panov (Yakov Ling)
 *   Mail: <diegoling33@gmail.com>
 *
 *   Это программное обеспечение имеет лицензию, как это сказано в файле
 *   COPYING, который Вы должны были получить в рамках распространения ПО.
 *
 *   Использование, изменение, копирование, распространение, обмен/продажа
 *   могут выполняться исключительно в согласии с условиями файла COPYING.
 *
 *   Файл создан: 2019-07-20 13:35
 *
 *   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */

export default class AlbumPage extends React.Component<any> {

    albumName: string = "";

    state: { trackInfo: any, promoView: any, lyricsText: any, tracks: any } = {
        trackInfo:  undefined,
        promoView:  undefined,
        lyricsText: undefined,
        tracks: "",
    };

    /**
     * Компонент подклчен
     */
    componentDidMount(): void {
        this.albumName = this.props.match.params.album;
        const tracks   = Application.managers.tracksManager.list();
        for (const track of tracks) if (track.name === this.albumName && track.is_album) {
            let promoView = undefined;
            if (track.promo) {
                promoView = <TrackVideoNode title={track.promo.title} url={track.promo.url}/>;
            }
            this.setState({
                trackInfo: TrackNode.createByData({...track, index: 1}),
                promoView,
                tracks: this.getTracks(),
            });
            break;
        }
    }

    /**
     * Формирует компонент треков альбома
     */
    public getTracks() {
        let tracks = Application.managers.albumsManager.items()[this.albumName].tracks;
        return tracks.map((value, index) =>
            <Col md={6} key={value.name}>{TrackNode.createByData({...value, album: this.albumName , index: index + 1})}</Col>);
    }

    public render(): React.ReactNode {
        return <Row>
            <div className={"col-md-4 order-md-1"}>
                {this.state.trackInfo}
                {this.state.promoView}
            </div>

            <div className="col-md-8 order-md-0">
                <CardView title={this.albumName + " TRACKS"}>
                    <div className="card-body">
                        <Row>
                            {this.state.tracks}
                        </Row>
                    </div>
                </CardView>
            </div>
        </Row>;
    }
}
