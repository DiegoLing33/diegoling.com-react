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
 *   Файл создан: 2019-07-06 18:35
 *
 *   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */

import {Component} from "react";
import * as React from "react";
import CardView from "../CardView";
import {Col, Row} from "react-bootstrap";
import {ITrack} from "../../app/managers/TracksManager";
import Application from "../../app/Application";
import {Link} from "react-router-dom";

function ReleasesPageGridItem(props: ITrack) {
    let url = props.is_album ? "/a/" + props.name : "/track/" + props.name;
    return (<Col md={3} style={{textAlign: "center", marginBottom: 20}}>
        <Link className={"release-grid-item"} to={url}>
            <img src={"/media/audio/" + props.name + "/artwork.jpg"} alt={props.name + " Artwork"} />
            <div style={{fontSize: 18}}>{props.name}</div>
            <div style={{fontSize: 11, opacity: 0.7}}>{props.release}</div>
        </Link>
    </Col>);
}

/**
 * Страница с релизами
 */
export default class ReleasesPage extends Component {
    /**
     * Отрисовка
     */
    public render(): React.ReactNode {
        return (
            <CardView title={"Releases"}>
                <div style={{padding: 15}}>
                    <Row>
                        {Application.managers.tracksManager.list().map(value => <ReleasesPageGridItem {...value} />)}
                    </Row>
                </div>
            </CardView>
        );
    }
}
