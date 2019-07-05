/**
 * Площадки размещения трека
 */
import {request} from "./Request";

export interface ITrackStores {
    itunes?: string;
    spotify?: string;
    boom?: string;
    yandexmusic?: string;
}

/**
 * Площадка
 */
export interface ITtackStore {
    name: string;
    icon: string;
    url: string;
}

/**
 * Трек
 */
export interface ITrack {
    name: string;
    stores: ITrackStores;
    lyrics?: boolean;
    story?: string;
    album?: string;

    promo?: {title: string, url: string};
}

/**
 * Менеджер треков
 */
export default class TracksManager {

    /**
     * Загружает лирику
     * @param name
     */
    static loadLyrics(name: string): Promise<string>{
        return new Promise<string>(resolve => {
           request("get", "/media/audio/" + name + "/lyrics.txt").then(response => {
               resolve(response.data);
           }) ;
        });
    }

    static loadTracks(): Promise<ITrack[]> {
        return new Promise<ITrack[]>(resolve => {
            request("get", "/data/tracks.json", {}, null, {ignoreCache: true})
                .then(response => {
                    resolve(response.json<ITrack[]>());
                });
        });
    }

}