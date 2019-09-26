import React from 'react';
// import { withLogout } from '@8base/react-sdk';

export default function LogoutButton ( { auth, client } ) {
	const logout = async () => {
		await client.clearStore();
		auth.authClient.logout();
	}
	return (
		<button onClick={logout}>Logout</button>
	)
}
