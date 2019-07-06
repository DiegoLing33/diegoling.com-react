/**
 * Площадки размещения трека
 */
import {request} from "../Request";
import {ListLoadingManager} from "./CoreLoadingManager";

/**
 * Трек
 */
export interface ITrack {
    name: string;
    stores: {[name: string] : string};
    lyrics?: boolean;
    story?: string;
    album?: string;
    release?: string;

    promo?: {title: string, url: string};
}

/**
 * Менеджер треков
 */
export default class TracksManager extends ListLoadingManager<ITrack> {

    /**
     * Загружает лирику
     * @param name
     * @param callback
     */
    static loadLyrics(name: string, callback: (text: string) => void): void{
        request("get", "/media/audio/" + name + "/lyrics.txt").then(response => {
            callback(response.data);
        }) ;
    }

    /**
     * Возвращает путь до файла треков
     */
    public path(): string {
        return "/data/tracks.json";
    }

}
