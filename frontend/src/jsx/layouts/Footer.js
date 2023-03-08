import React from "react";
import {Link} from 'react-router-dom';

const Footer = () => {
	var d = new Date();
	return (
		<div className="footer">
			<div className="copyright">
				<p>Copyright © Designed &amp; Developed by{" "}
					<a href="" target="_blank"  rel="noreferrer">
						
					</a>{" "}
					2023
				</p>
			</div>
		</div>
	);
};

export default Footer;
