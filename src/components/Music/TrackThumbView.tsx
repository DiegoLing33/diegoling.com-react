import {Component} from "react";
import * as React from "react";
import {Col} from "react-bootstrap";
import {ITrack, ITrackStores} from "../../app/TracksManager";

export interface IndexSongItemProps extends ITrack{
    img: string;
    audio: string;
    index?: number;

    stores: ITrackStores & any;
}

/**
 * Элемент трека
 */
class TrackThumbViewLink extends Component<{ link: string, text: string, icon: string }> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const className = "list-group-item " + (this.props.link === "#" ? "disabled" : "");
        return (
            <a className={className} href={this.props.link}><i className={this.props.icon}/> {this.props.text}</a>
        )
    }
}

/**
 * Трек
 */
export default class TrackThumbView extends Component<IndexSongItemProps & {offset?: number}> {

    /**
     * Создает объект по индексу
     */
    static createByData(value: ITrack & { index: number }, offset?: number) {
        return <TrackThumbView name={value.name} img={`/media/audio/${value.name}/artwork.jpg`}
                               audio={`/media/audio/${value.name}/${value.name}.mp3`}
                               stores={value.stores} index={value.index} key={value.name} lyrics={value.lyrics} offset={offset}/>
    }

    /**
     * Иагазины
     */
    static storesTemplates: { [key: string]: { icon: string, text: string } } = {
        itunes: {icon: "fab fa-itunes-note", text: "iTunes"},
        spotify: {icon: "fab fa-spotify", text: "Spotify"},
        boom: {icon: "fab fa-vk", text: "Boom"},
        yandexmusic: {icon: "fab fa-yandex", text: "Яндекс Музыка"},
    };

    /**
     * Оторабражет контент магазинов
     */
    getStoresContent(): any {
        let children = [];
        for (const key in TrackThumbView.storesTemplates)
            if (TrackThumbView.storesTemplates.hasOwnProperty(key)) {
                if (this.props.stores.hasOwnProperty(key)) {
                    children.push(<TrackThumbViewLink link={this.props.stores[key]}
                                                     text={TrackThumbView.storesTemplates[key].text}
                                                     icon={TrackThumbView.storesTemplates[key].icon}
                                                     key={key}
                    />);
                }
            }

        if (this.props.lyrics && window.location.href.indexOf("/track/") === -1) {
            children.push(<TrackThumbViewLink link={"/track/" + this.props.name}
                                             text={"LYRICS & INFO"}
                                             icon={"fas fa-book"}
                                             key={"lyrics"}
            />);
        }
        return children;
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Col md={this.props.offset || 4}>
                <div className="card card-song text-white bg-primary" style={{width: "100%", marginBottom: 20}}>
                    <div className="card-header">
                        <span className="text-muted">#{this.props.index}</span> {this.props.name}
                    </div>
                    <div className="card-body">
                        <img src={this.props.img} alt={this.props.name + " Artwork"}/>
                        {/*<audio preload="none" src={this.props.audio} />*/}
                    </div>
                    <div className="list-group list-group-flush">
                        {this.getStoresContent()}

                    </div>
                </div>
            </Col>
        );
    }
}