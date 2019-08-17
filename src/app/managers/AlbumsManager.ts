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
 *   Файл создан: 2019-07-20 13:42
 *
 *   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */


import {EntitiesLoadingManager} from "./CoreLoadingManager";
import {ITrack} from "./TracksManager";

export interface IAlbum {
    title: string;
    release: string;
    stores: {[name: string] : string};
    tracks: ITrack[];
}

/**
 * Менеджер альбомов
 */
export default class AlbumsManager extends EntitiesLoadingManager<IAlbum>{
    public path(): string {
        return "/data/albums.json";
    }

}
