import {Component} from "react";
import * as React from "react";
import {Button, Row} from "react-bootstrap";
import TracksManager from "../../app/managers/TracksManager";
import TrackVideoNode from "../track/TrackVideoNode";
import Application from "../../app/Application";
import TrackNode from "../track/TrackNode";
import CardView from "../CardView";
import {Link} from "react-router-dom";

/**
 * Страница трека
 */
export default class TrackPage extends Component<any> {
    trackName: string = "";
    albumName?: string;

    state: { trackInfo: any, promoView: any, lyricsText: any } = {
        trackInfo:  undefined,
        promoView:  undefined,
        lyricsText: undefined,
    };

    /**
     * Компонент подклчен
     */
    componentDidMount(): void {
        this.trackName = this.props.match.params.track;
        this.albumName = this.props.match.params.album || undefined;

        let tracks = this.albumName ?
            Application.managers.albumsManager.items()[this.albumName].tracks
            : Application.managers.tracksManager.list();
        for (const track of tracks) if (track.name === this.trackName) {
            track.album = this.albumName;
            let promoView = undefined;
            if (track.promo) {
                promoView = <TrackVideoNode title={track.promo.title} url={track.promo.url}/>;
            }
            this.setState({
                trackInfo: TrackNode.createByData({...track, index: 1}),
                promoView,
            }, () => {
                TracksManager.loadLyrics(track, text => {
                    text = text.replace(/\n/g, "<br />");
                    this.setState({lyricsText: <span dangerouslySetInnerHTML={{__html: text}}/>})
                });
            });
            break;
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <Row>
            <div className={"col-md-4 order-md-1"}>
                {this.state.trackInfo}
                {this.state.promoView}
            </div>

            <div className="col-md-8 order-md-0">
                {this.albumName ? <Link to={"/a/" + this.albumName}><Button block>Back to album</Button></Link>: null}
                <CardView title={"Lyrics"}>
                    <h2 style={{textAlign: "center", color: "#fefefe", paddingTop: 15}}>{this.trackName}</h2>
                    <div className="card-body" style={{textAlign: "center", padding: 15}}>
                        {this.state.lyricsText || "Loading..."}
                    </div>
                </CardView>
                {this.albumName ? <Link to={"/a/" + this.albumName}><Button block>Back to album</Button></Link>: null}
            </div>
        </Row>
    }
}
