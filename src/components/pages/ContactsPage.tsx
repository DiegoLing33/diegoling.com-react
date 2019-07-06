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
 *   Файл создан: 2019-07-06 14:43
 *
 *   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */
import {Component} from "react";
import * as React from "react";
import {Row} from "react-bootstrap";
import CardView from "../CardView";

/**
 * Страница с контакстами
 */
export default class ContactsPage extends Component {

    public render(): React.ReactNode {
        return <CardView title={"Contacts"}>
            <div style={{padding: 15}}>
                <div>Mail:</div>
                <div>diegoling33@gmail.com</div>
            </div>
        </CardView>;
    }

}
