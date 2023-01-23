import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { Dropdown } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";


import LogoutPage from './Logout';

import United from "../../../images/United.png";
import avatar from "../../../images/avatar/1.jpg";
import profile from "../../../images/profile/pic1.jpg";

const RightSideBar = ({onNote}) =>{
	const [rightSelect, setRightSelect] = useState('Eng');
	return(
		<>
			<div className="dlab-side-menu">


				<ul>
					<Dropdown as="li" className="nav-item dropdown header-profile">
						<Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
							<img src={profile} width={20} alt="" />

							
						</Dropdown.Toggle>
						<Dropdown.Menu align="right" className="dropdown-menu dropdown-menu-end">
							<Link to="/profile" className="dropdown-item ai-icon">
								<svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary me-1" width={18} height={18} viewBox="0 0 24 24" fill="none"
									stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
								>
									<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
									<circle cx={12} cy={7} r={4} />
								</svg>
								<span className="ms-2">Profile </span>
							</Link>
							
							<LogoutPage />
						</Dropdown.Menu>
					</Dropdown> 	
				</ul>
				
			</div>
		</>
	)
}
export default RightSideBar;