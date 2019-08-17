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
 *   Файл создан: 2019-07-06 14:56
 *
 *   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */

import {Component} from "react";
import * as React from "react";
import Application from "../../app/Application";
import {ITrack} from "../../app/managers/TracksManager";
import CardView from "../CardView";
import {Link} from "react-router-dom";

/**
 * Свойства блока трека
 */
export interface TrackNodeProps extends ITrack {
    img: string;
    audio: string;
    index?: number;
    stores: { [key: string]: string };
}

/**
 * Компонент ссылки в блоке трека
 * @param props
 * @constructor
 */
export function TrackNodeLink(props: { link: string, title: string, icon: string }) {
    const className = "list-group-item " + (props.link.endsWith("#") ? "disabled" : "");
    return (
        props.link.startsWith("/") ?
            <Link className={className} to={props.link}><i className={props.icon}/> {props.title}</Link>
            :
            <a className={className} href={props.link}><i className={props.icon}/> {props.title}</a>
    );
}

/**
 * Блок трека
 */
export default class TrackNode extends Component<TrackNodeProps> {

    /**
     * Создает объект по значению
     */
    static createByData(value: ITrack & { index: number }) {
        const rootName = value.album ? value.album : value.name;
        return <TrackNode {...value} img={`/media/audio/${rootName}/artwork.jpg`}
                          audio={`/media/audio/${rootName}/${value.name}.mp3`} key={value.name}/>
    }

    /**
     * Создает кнопку Lyrics & Info
     * @param track
     */
    static createLyricsButton(track: ITrack): React.ReactNode {
        const rootName = track.album ? track.album + "/" + track.name : track.name;
        if(track.is_album)
            return <TrackNodeLink link={"/a/" + track.name} title={"ALBUM & INFO"} icon={"fas fa-book"} key={"album"}/>
        return <TrackNodeLink link={"/track/" + rootName} title={"LYRICS & INFO"} icon={"fas fa-book"} key={"lyrics"}/>
    }

    /**
     * Возвращает ссылки на площадки
     */
    getStoresLinks(): any {
        const stores = Application.managers.storesManager.items();
        let children = [];
        for (const key in stores)
            if (stores.hasOwnProperty(key)) {
                let store = stores[key];
                if (this.props.stores.hasOwnProperty(key))
                    children.push(<TrackNodeLink {...{...store, link: store.url + this.props.stores[key], key}}/>);
            }
        if (window.location.href.indexOf("/track/") === -1 && window.location.href.indexOf("/a/") === -1) {
            children.push(TrackNode.createLyricsButton(this.props));
        }else if(this.props.album){
            children.push(TrackNode.createLyricsButton(this.props));
        }
        return children;
    }

    /**
     * Выполняет отрисовку
     */
    public render(): React.ReactNode {
        let style = {};
        let displayName = this.props.name;
        if(this.props.stores.itunes === "#") {
            style = {filter: "blur(11px)", "--webkit-filter": "blur(11px)"};
            displayName = "[IN PROGRESS TO RELEASE]"
        }
        return (
            <CardView
                title={<span><span className="text-muted">#{this.props.index}</span> {displayName}</span>}
                footer={<div className="list-group list-group-flush">{this.getStoresLinks()}</div>}
            >
                <img style={style} src={this.props.img} alt={this.props.name + " Artwork"}/>
                {window.location.href.indexOf("localhost") > -1 ? "" :
                    <audio preload="none" src={this.props.audio}/>}
            </CardView>
        );
    }
}
