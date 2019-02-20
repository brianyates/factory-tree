import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import App from './components/App';
import './stylesheets/index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
