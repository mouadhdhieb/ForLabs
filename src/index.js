import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/';
import logUser from './actions/';
import * as firebase from  'firebase'
import myaccount from './components/Myaccount';
import Medecin from './components/Medecin';
import signup from './components/signUp';
import signin from './components/signIn';
import FileForm from './components/FileForm';
import history from './components/history';
import chart from './components/chart';
import AlertForm from './components/AlertForm';
import App from './app';
import App2 from './components/app';
import ReactGA from 'react-ga';
const store = createStore(reducer);

    var config = {
        apiKey: "AIzaSyDZfHsjWfKM6Owzi0iTGtFJkhX9UgOAzVY",
        authDomain: "forlabs-2093e.firebaseapp.com",
        databaseURL: "https://forlabs-2093e.firebaseio.com",
        projectId: "forlabs-2093e",
        storageBucket: "forlabs-2093e.appspot.com",
        messagingSenderId: "299450065959"
};
firebase.initializeApp(config);
// setting up GA
ReactGA.initialize('UA-105570018-1');
function fireTracking() {
  ReactGA.pageview(window.location.pathname);
     ReactGA.set({ page: window.location.pathname });
    
   
}

ReactDOM.render(
    <Provider store={store}>
        <Router onUpdate={fireTracking}  path="/" history={browserHistory} >
            <Route path="/" component={App} >
                <IndexRoute component={App} />
                <Route path="/signin" component={signin} />
                <Route path="/signup" component={signup} />

                <Route path="/MainPage" component={App2}>
                    <Route path="/MainPage" component={App2} />
                    <Route path="/myaccount" component={myaccount} />
                    <Route path="/addDoctor" component={Medecin} />
                    <Route path="/addFile" component={FileForm} />
                    <Route path="/addAlert" component={AlertForm} />
                    <Route path="/checkhistory" component={history} />
                     <Route path="/analytics" component={chart} />
                </Route>
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();

