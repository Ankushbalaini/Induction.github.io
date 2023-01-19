import React, { useState, useEffect }  from 'react';
import {Link} from 'react-router-dom';

import DropDownBlog  from './DropDownBlog';
//images
import acheiv from './../../../images/svg/achievement.svg';
import medal from './../../../images/medal.png';
import pic3 from './../../../images/courses/pic3.jpg';
import pic4 from './../../../images/courses/pic4.jpg';
import pic5 from './../../../images/courses/pic5.jpg';
import pic6 from './../../../images/courses/pic6.jpg';
import pic7 from './../../../images/courses/pic7.jpg';
import pic8 from './../../../images/courses/pic8.jpg';

const images = require.context('./../../../images/customers/', true);


const instructorsData1 = [
	{ title: 'Samantha William', image: pic8 },
	{ title: 'Nadila Adja', image: pic4},
	{ title: 'Johnny Ahmad', image: pic7},
	{ title: 'Angelina Crispy', image: pic5},
	{ title: 'Tony Soap', image: pic3},
	{ title: 'Jordan Nico', image: pic6},
];

// api call 
async function getInstructorApi (){
	return fetch("http://localhost:8081/api/instructor/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
}

const Instructors = (props) =>{
	const [loading, setLoading] = useState(true);
	const [instructorsData, setInstructorsData ] = useState();

	const getInstructors = async(e) => {
		const response = await getInstructorApi();
		if ("status" in response && response.status == true) {
			setInstructorsData(response.data);
			setLoading(false);
			
		}
	}

	useEffect(()=>{
		if(loading){
			getInstructors();
		}
	},[]);

	const loadImage = (imageName) => {
		return images(`./${imageName}`);
	}	




	const PageContent = loading ? <i className="fas fa-atom fa-spin"></i> :  
		<>
			
				{(instructorsData) ? instructorsData.map((user, index)=>(
					<div className="col-xl-4 col-xxl-6 col-md-6" key={index}>
						<div className="card instructors-box">
							<div className="card-header border-0">
								<DropDownBlog />
							</div>
							<div className="card-body text-center pb-3">
								<div className="instructors-media">
									
									<img src={ loadImage(`${user.profile.profilePhoto}`) } alt="" />
									{/* <img src={ loadImage(user.profile.profilePhoto) } alt="" /> */}

									<div className="instructors-media-info">
										<h4>{user.profile.name}</h4>
										<ul className="d-flex align-items-center raiting my-0 justify-content-center">
											<li><span className="font-w500">5.0</span><i className="fas fa-star text-orange ms-2"></i></li>
											<li>Review (1k)</li>
										</ul>
										<div className="custome-badge">
											<Link to={"#"}><span className="badge badge-xl">Users (10)</span></Link>
											<Link to={"#"}><span className="badge badge-xl">Inductions (2)</span></Link>
											<Link to={"#"}><span className="badge badge-xl">Departments (1)</span></Link>
										</div>
										
									</div>
								</div>
							</div>
							{/* <div className="card-footer pt-0 border-0">
								<Link to={"./instructor-liveclass"} className="btn btn-secondary  btn-block">View Class</Link>
							</div> */}
						</div>
					</div>
				)) : null }
		</>;


	

	return(
		<div className="row">{PageContent}		</div>
	)
}
export default Instructors;
