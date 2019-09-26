import React, { useState } from 'react';
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const styles = {
	divStyles: {
		marginBottom: '15px',
		display: 'flex',
		alignItems: 'center'
	},
	labelStyles: {
		color: '#828282',
		fontSize: '13px',
		fontWeight: 'bold',
		marginRight: '7px'
	},
	inputStyles: {
		width: '400px',
		padding: '5px'
	}
}

const POST_MUTATION = gql`
	mutation PostCreate($data: PostCreateInput!){
		postCreate(data: $data){
			id
		}
	}`

export default function PostForm ( { history } ) {
	const [post, setPost] = useState( {
		url: '',
		description: ''
	} )
	const onFormSubmit = async createPost => {
		const data = {
			variables: {
				data: post
			}
		};
		const response = await createPost( data );
		if ( response.data.postCreate.id ) {
			history.push( "/" )
		}
	}
	return (
		<Mutation mutation={POST_MUTATION}>
			{postCreate => (
				<form onSubmit={e => { e.preventDefault(); onFormSubmit( postCreate ) }}>
					<div style={{ backgroundColor: '#f6f6f6', padding: '10px 8px 15px' }}>
						<div style={styles.divStyles}>
							<label htmlFor="url" style={styles.labelStyles}>url</label>
							<input className="mb2"
								value={post.url}
								onChange={e => setPost( { ...post, url: e.target.value } )}
								type="text"
								id="url"
								placeholder="url for link"
							/>
						</div>
						<div style={styles.divStyles}>
							<label htmlFor="description" style={styles.labelStyles}>text</label>
							<textarea className="mb2"
								value={post.description}
								onChange={e => setPost( { ...post, description: e.target.value } )}
								placeholder="Description..."
								rows={4}
								id="description"
							/>
						</div>
						<button type="submit">Submit</button>
					</div>
				</form>
			)}
		</Mutation>

	)
}