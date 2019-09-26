import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { AppProvider } from '@8base/react-sdk'
import { Auth, AUTH_STRATEGIES } from '@8base/auth'
import { clientId, URL } from './config'

const URI = URL

const authClient = Auth.createClient( {
	strategy: AUTH_STRATEGIES.WEB_AUTH0,
	subscribable: true
}, {
	domain: 'secure.8base.com',
	clientId: clientId,
	redirectUri: `${window.location.origin}/auth/callback`,
	logoutRedirectUri: `${window.location.origin}/`
} )
const client = new ApolloClient( {
	uri: URL
} )

ReactDOM.render(
	<ApolloProvider client={client}>
		<AppProvider uri={URI} authClient={authClient}>
			{( { loading } ) => {
				if ( loading ) {
					return (
						<p>Please wait...</p>
					)
				}
				return <App />
			}}
		</AppProvider>
	</ApolloProvider>, document.getElementById( 'root' ) );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
