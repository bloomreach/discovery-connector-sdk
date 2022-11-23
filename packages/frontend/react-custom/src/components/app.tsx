import type { FunctionalComponent } from 'preact';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { h } from 'preact';
import { Route, Router } from 'preact-router';
import Home from '../routes/home/index';
import Profile from '../routes/profile/index';
import NotFoundPage from '../routes/notfound/index';
import HeaderComponent from './header/index';
import 'preact/debug'; // attaches the preact devTools

const App: FunctionalComponent = ():h.JSX.Element => {
    return (
        <div id="preact_root">
            <HeaderComponent />
            <Router>
                <Route path="/" component={Home} />
                <Route path="/profile/" component={Profile} user="me" />
                <Route path="/profile/:user" component={Profile} />
                <NotFoundPage default />
            </Router>
        </div>
    );
};
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

export default App;

