import {Component} from "react";
import * as React from "react";

export interface HeaderSocialIconProps {
    link: string;
    img: string;
    alt: string;
}

export class HeaderSocialIcon extends Component<HeaderSocialIconProps> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="item">
                <a href={this.props.link}>
                    <img src={this.props.img} alt={this.props.alt}/>
                </a>
            </div>
        )
    }
}

/**
 * Header component
 */
export default class Header extends Component {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="container">
                <div className="logo-wrapper animated fadeIn">
                    <img className="logo hover-transition" src={"/img/logowhite.png"} alt={"Diego Ling logo"}/>
                    <div className="social-links no-select">
                        {/*<div style={{marginBottom: 30}}>*/}
                            {/*Diego Ling is the King of the Everything that can burn in black fire*/}
                        {/*</div>*/}
                        <HeaderSocialIcon
                            link={"https://www.instagram.com/diegoling33"}
                            img={"/img/soc/instagram.png"} alt={"Instagram link"}
                        />
                        <HeaderSocialIcon
                            link={"https://itunes.apple.com/ru/artist/diego-ling/1434980772"}
                            img={"/img/soc/apple-music.png"} alt={"Apple Music link"}
                        />
                        <HeaderSocialIcon
                            link={"https://vk.com/diegoling33"}
                            img={"/img/soc/vkontakte.png"} alt={"VK link"}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
