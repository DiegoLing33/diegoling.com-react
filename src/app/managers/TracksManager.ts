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
    is_album?: boolean;

    promo?: {title: string, url: string};
}

/**
 * Менеджер треков
 */
export default class TracksManager extends ListLoadingManager<ITrack> {

    /**
     * Загружает лирику
     * @param track
     * @param callback
     */
    static loadLyrics(track: ITrack, callback: (text: string) => void): void{
        const rootName = track.album ? (track.album + "/" + track.name) : track.name  + "/lyrics";
        request("get", "/media/audio/" + rootName + ".txt").then(response => {
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
