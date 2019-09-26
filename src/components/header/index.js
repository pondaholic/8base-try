import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

export default function Header () {
	return (
		<header id="news-header">
			<section>
				<b className="brand">
					<NavLink to="/">News</NavLink>
				</b>
				<div className="nav">
					<ul>
						<li>
							<NavLink to="/">Stuffs</NavLink>
						</li>
						<li>
							<NavLink to="/submit">Submit</NavLink>
						</li>
					</ul>
				</div>
			</section>
			<div className="auth">
				<div>
					<NavLink to="/login">Login/Logout</NavLink>
				</div>
			</div>
		</header>
	)
}