import React from "react";
import {Link} from 'react-router-dom';

const Footer = () => {
	var d = new Date();
	return (
		<div className="footer">
			<div className="copyright">
				<p>Copyright © Designed &amp; Developed by{" "}
					<a href="http://dexignzone.com/" target="_blank"  rel="noreferrer">
						DexignZone
					</a>{" "}
					2022
				</p>
			</div>
		</div>
	);
};

export default Footer;
