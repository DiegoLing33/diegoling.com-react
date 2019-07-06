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
 *   Файл создан: 2019-07-06 14:51
 *
 *   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */

import {Component} from "react";
import * as React from "react";

/**
 * Параметры видео в разделе трека
 */
interface TrackVideoNodeProps {
    readonly title: string;
    readonly url: string;
}

/**
 * Видео запись в разделе трека
 */
export default class TrackVideoNode extends Component<TrackVideoNodeProps> {

    /**
     * Отрисовка
     */
    public render(): React.ReactNode {
        return <div className="card card-song text-white bg-primary" style={{width: "100%", marginBottom: 20}}>
            <div className="card-header">
                {this.props.title}
            </div>
            <div className="card-body">
                {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                <iframe width="100%" height="200" src={this.props.url} frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
            </div>
            <div className="list-group list-group-flush">
            </div>
        </div>
    }
}
