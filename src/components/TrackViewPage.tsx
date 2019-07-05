import {Component} from "react";
import * as React from "react";
import {Col, Row} from "react-bootstrap";
import TracksManager from "../app/TracksManager";
import TrackThumbView from "./Music/TrackThumbView";

/**
 * Промо трека
 */
export class TrackPromoVideoComponent extends Component<{ title: string, url: string }> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Col md={12}>
                <div className="card card-song text-white bg-primary" style={{width: "100%", marginBottom: 20}}>
                    <div className="card-header">
                        {this.props.title}
                    </div>
                    <div className="card-body">
                        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                        <iframe width="100%" height="200" src={this.props.url} frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                    </div>
                    <div className="list-group list-group-flush">
                    </div>
                </div>
            </Col>);
    }
}

export default class TrackViewPage extends Component<any> {
    trackName: string = "";

    state: { trackInfo: any, promoView: any, lyricsText: any } = {
        trackInfo: undefined,
        promoView: undefined,
        lyricsText: undefined,
    };

    /**
     * Компонент подклчен
     */
    componentDidMount(): void {
        this.trackName = this.props.match.params.track;
        TracksManager.loadTracks().then(tracks => {
            for (const track of tracks) if (track.name === this.trackName) {
                let promoView = undefined;
                if (track.promo) {
                    promoView = <Row><TrackPromoVideoComponent title={track.promo.title} url={track.promo.url}/></Row>;
                }
                this.setState({
                    trackInfo: <Row>{TrackThumbView.createByData({...track, index: 1}, 12)}</Row>,
                    promoView,
                }, ()=>{
                    TracksManager.loadLyrics(this.trackName).then(text => {
                        text = text.replace(/\n/g, "<br />");
                        this.setState({lyricsText: <span dangerouslySetInnerHTML={{__html: text }} />})
                    });
                });
                break;
            }
        });
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <Row>
            <div className={"col-md-4 order-md-1"}>
                {this.state.trackInfo}
                {this.state.promoView}
            </div>

            <div className="col-md-8 order-md-0">
                <div className="card card-song text-white bg-primary" style={{width: "100%", marginBottom: 20}}>
                    <div className="card-header">
                        Lyrics
                    </div>
                    <div className="card-body" style={{textAlign: "center", padding: 15}}>
                        {this.state.lyricsText || "Loading..."}
                    </div>
                </div>
            </div>
        </Row>
    }
}