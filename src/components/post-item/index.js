import React from 'react';
import './index.css'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
// import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

const VOTE_MUTATION = gql`
	mutation PostUpdate($data: PostUpdateInput!){
		postUpdate(data: $data){
			id
		}
	}`

export default function PostItem ( { post, refetch } ) {
	const upVotePost = async ( vote, post ) => {
		const data = {
			variables: {
				data: {
					id: post.id,
					url: post.url,
					description: post.description,
					votes: post.votes + 1
				}
			}
		}
		await vote( data );
		refetch()
	}
	return (
		<article className="post">
			<section className="upvote">
				<Mutation mutation={VOTE_MUTATION}>
					{postUpdate => <button onClick={e => upVotePost( postUpdate, post )}>UP</button>}
				</Mutation>
			</section>
			<section className="body">
				<div className="title">
					<a href={post.url}>
						{post.description}
					</a>
				</div>
				<div className="meta">
					<span>
						{post.votes} vote{post.votes > 1 ? "s" : ""}
					</span>
					{/* <span>{distanceInWordsToNow( post.createdAt )} age</span> */}
				</div>
			</section>
		</article >
	)
}