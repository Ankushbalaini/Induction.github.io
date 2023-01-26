import React, { useState, useEffect }  from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import DropDownBlog  from './DropDownBlog';


const images = require.context("../../../../../images/profile/", true);

// api call 
async function getInstructorApi (role,companyID){
	var getInstructorsApi = "http://localhost:8081/api/instructor/list";
	if(role =='company'){
		var getInstructorsApi = "http://localhost:8081/api/instructor/listByCompany?role=company&parentCompany="+companyID;
	}
	return fetch(getInstructorsApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then((data) => data.json());
}

const Instructors = (props) =>{
	const role = useSelector((state) => state.auth.auth.role);
	const parentCompany = useSelector((state) => state.auth.auth.id);


	const [loading, setLoading] = useState(true);
	const [instructorsData, setInstructorsData ] = useState();

	const getInstructors = async(e) => {
		
		const response = await getInstructorApi(role,parentCompany);

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
			
				{ instructorsData.map((user, index)=>(
					<div className="col-xl-3 col-xxl-4 col-md-4" key={index}>
						<div className="card instructors-box">
							<div className="card-header border-0">
								<DropDownBlog />
							</div>
							<div className="card-body text-center pb-3">
								<div className="instructors-media">
									
									
									<img src={ loadImage(user.profile.profilePhoto) } alt="" />

									{/* <img src={ loadImage(user.profile.profilePhoto) } alt="" /> */}

									<div className="instructors-media-info">
										<h4>{user.profile.name}</h4>
										<h5>{user.email}</h5>

										<h4>Parent company name</h4>

										<h4>Department Name</h4>
										{/* <h5>{user.parentCompany}</h5> */}
										{/* <ul className="d-flex align-items-center raiting my-0 justify-content-center">
											<li><span className="font-w500">5.0</span><i className="fas fa-star text-orange ms-2"></i></li>
											<li>Review (1k)</li>
										</ul> */}
										{/* <div className="custome-badge">
											<Link to={"#"}><span className="badge badge-xl">Users (10)</span></Link>
											<Link to={"#"}><span className="badge badge-xl">Inductions (2)</span></Link>
											<Link to={"#"}><span className="badge badge-xl">Departments (1)</span></Link>
										</div> */}
										
									</div>
								</div>
							</div>
							{/* <div className="card-footer pt-0 border-0">
								<Link to={"./instructor-liveclass"} className="btn btn-secondary  btn-block">View Class</Link>
							</div> */}
						</div>
					</div>
				))}
		</>;


	

	return(
		<div className="row">{PageContent}	</div>
	)
}
export default Instructors;
