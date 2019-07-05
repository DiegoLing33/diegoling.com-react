import React from 'react';
import Header from "./components/Header";
import Container from "./components/Container";
import IndexTracksWrapper from "./components/Music/IndexTracksWrapper";
import {Route, Switch} from "react-router";
import TrackViewPage from "./components/TrackViewPage";
import NavigationBar from "./components/NavigationBar";

const App: React.FC = () => {
    return (
        <div>
            <NavigationBar/>
            <div className="wrapper">
                <Header/>
                <Container>
                    <Switch>
                        <Route exact path={"/"} component={IndexTracksWrapper}/>
                        <Route exact path={"/track/:track"} component={TrackViewPage}/>
                    </Switch>
                </Container>
            </div>
        </div>
    );
};

export default App;
