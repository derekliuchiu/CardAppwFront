import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify';
import awsExports from "./aws-exports";
const config = require('./config.json');


Amplify.configure({
    Auth:
    {
        mandatorySignId: true,
        region: config.cognito.REGION,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }, 
    Storage: config.Storage
});

Amplify.configure(awsExports);


ReactDOM.render(<React.StrictMode> <App /> </React.StrictMode>, document.getElementById('root'));
