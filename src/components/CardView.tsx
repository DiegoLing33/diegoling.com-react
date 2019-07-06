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
 *   Файл создан: 2019-07-06 18:22
 *
 *   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */

import {Component} from "react";
import * as React from "react";

/**
 *  Совства карточки
 */
interface ICardViewProps {
    title: string | React.ReactNode;
    footer?: React.ReactNode|React.ReactNode[]|any;
}

/**
 * Элемент карточки
 */
export default class CardView extends Component<ICardViewProps> {
    public render(): React.ReactNode {
        return (
            <div className={"card card-song text-white bg-primary"}>
                <div className={"card-header"}>
                    {this.props.title}
                </div>
                <div className={"card-body"}>
                    {this.props.children}
                </div>
                {this.props.footer ? this.props.footer : ""}
            </div>
        )
    }
}
