import React, { useEffect } from 'react';
import { withAuth, gql } from '@8base/react-sdk';
import { withApollo, Query } from 'react-apollo';
import { compose } from 'recompose'
import { clientId } from '../../config'

const CURRENT_USER_INFO = gql`
	query CurrentUser{
		user{
			id
			email
		}
	}`

const USER_SIGNUP = gql`
	mutation UserSignUp($user: UserCreateInput!, $authProfileId: ID){
		userSignUpWithToken(user: $user, authProfileId: $authProfileId){
			id
			email
		}
	}`

const Hello = compose( withAuth, withApollo )( ( { auth, client } ) => {
	const logout = async () => {
		await client.clearStore();
		auth.authClient.logout();
	}
	return (
		<Query query={CURRENT_USER_INFO}>
			{( { loading, data } ) => {
				if ( loading ) {
					return <p> Loading...</p>
				}
				return (
					<div>
						<button onClick={logout}>Logout</button>
					</div>
				)
			}}
		</Query>
	)
} )

export const Authorization = compose( withApollo, withAuth )( ( { auth, client } ) => {
	if ( auth.isAuthorized ) {
		return <Hello />
	}
	const authorize = () => {
		auth.authClient.authorize();
	}
	if ( !document.location.hash.includes( 'access_token' ) ) {
		return (
			<div>
				<p>Log in!</p>
				<button onClick={authorize}>Login</button>
			</div>
		)
	}

	useEffect( () => {
		const processAuthorizationResult = async () => {
			const { idToken, email } = await auth.authCLient.getAuthorizedData();
			const context = {
				headers: {
					authoriation: `Bearer ${idToken}`
				}
			}
			await client.query( {
				query: CURRENT_USER_INFO,
				context
			} ).catch( () => client.mutate( {
				mutation: USER_SIGNUP,
				variables: {
					user: { email },
					authProfileId: clientId
				},
				context
			} ) );
			auth.authClient.setState( {
				token: idToken
			} )
		}
		processAuthorizationResult();
	} )
	return <p> Authorizing</p>
} );
