import {Component} from "react";
import * as React from "react";
import {Row} from "react-bootstrap";
import TracksManager from "../../app/managers/TracksManager";
import TrackVideoNode from "../track/TrackVideoNode";
import Application from "../../app/Application";
import TrackNode from "../track/TrackNode";
import CardView from "../CardView";

/**
 * Страница трека
 */
export default class TrackPage extends Component<any> {
    trackName: string = "";

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
        const tracks   = Application.managers.tracksManager.list();
        for (const track of tracks) if (track.name === this.trackName) {
            let promoView = undefined;
            if (track.promo) {
                promoView = <TrackVideoNode title={track.promo.title} url={track.promo.url}/>;
            }
            this.setState({
                trackInfo: TrackNode.createByData({...track, index: 1}),
                promoView,
            }, () => {
                TracksManager.loadLyrics(this.trackName, text => {
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
                <CardView title={"Lyrics"}>
                    <div className="card-body" style={{textAlign: "center", padding: 15}}>
                        {this.state.lyricsText || "Loading..."}
                    </div>
                </CardView>
            </div>
        </Row>
    }
}
