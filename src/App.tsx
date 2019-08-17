import React, {Component} from 'react';
import Header from "./components/Header";
import Container from "./components/Container";
import IndexPage from "./components/pages/IndexPage";
import {Route, Switch} from "react-router";
import TrackPage from "./components/pages/TrackPage";
import NavigationBar from "./components/NavigationBar";
import Application from "./app/Application";
import ReleasesPage from "./components/pages/ReleasesPage";
import AlbumPage from "./components/pages/AlbumPage";

/**
 * Состояния приложения
 */
export interface IAppStates {
    ready: boolean;
}

export default class App extends Component<any, IAppStates> {

    /**
     * Состояния
     */
    state: IAppStates = {
        ready: false
    };

    /**
     * Цикл загрузки
     */
    protected __loadingLoop: any;

    /**
     * Компонент загружен
     */
    public componentDidMount(): void {
        console.log("Data loading...");
        Application.startManagersLoading();
        if (this.__loadingLoop) clearInterval(this.__loadingLoop);
        this.__loadingLoop = setInterval(() => {
            if(Application.isEveryManagerReady()) {
                this.setState({ready: true});
                clearInterval(this.__loadingLoop);
            }
        }, 100);
    }

    /**
     * Отрисовка
     */
    public render(): React.ReactNode {
        if (this.state.ready) {
            return (
                <div>
                    <NavigationBar/>
                    <div className="wrapper">
                        <Header/>
                        <Container>
                            <Switch>
                                <Route exact path={"/"} component={IndexPage}/>
                                <Route exact path={"/track/:track"} component={TrackPage}/>
                                <Route exact path={"/track/:album/:track"} component={TrackPage}/>
                                <Route exact path={"/a/:album"} component={AlbumPage}/>
                                <Route exact path={"/releases"} component={ReleasesPage}/>
                                <Route>
                                    <h2 style={{textAlign: "center", color: "#fefefe", paddingTop: 15}}>
                                        Page not found.
                                    </h2>
                                </Route>
                            </Switch>
                        </Container>
                    </div>
                </div>
            );
        } else {
            return <div>Loading...</div>;
        }
    }
}
