import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import PostItem from '../post-item'
import './index.css';

const POST_QUERY = gql`
	query {
		postsList{
			items{
				id
				createdAt
				url
				description
				votes
			}
		}
	}`

const PostList = ( { loading, posts, refetch } ) => {
	if ( loading ) {
		return <p>Loading...</p>
	}
	// console.log( posts )

	return posts.map( post => {
		console.log( post )
		return (
			< PostItem key={post.id} post={post} refetch={refetch} />
		);
	} )
}

export default graphql( POST_QUERY, {
	props ( result ) {
		const { data } = result;
		const { loading, refetch } = data;
		let posts = [];
		if ( data && data.postsList ) posts = data.postsList.items;
		return {
			loading,
			posts,
			refetch
		}
	}
} )( PostList );