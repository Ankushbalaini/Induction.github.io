import React  from 'react';
import {Link} from 'react-router-dom';
import DropDownBlog  from './DropDownBlog';
import {Tab, Nav} from 'react-bootstrap';


const TimeLineBlog1 =() =>{
	return(
		<>
			<li className="d-flex align-items-baseline">
				<h4 className="font-w400 time">10:10 AM</h4>
				<div className="panel">
					<Link to={"#"} className="timeline-panel text-muted d-flex align-items-center">
						<div className="badge badge-xl badge-warning">KH</div>
						<h4 className="mb-0"><strong>Jordan Nico </strong> has invited you to <strong className="text-warning"> Graphic Design</strong> Group Chat</h4>
					</Link>
				</div>	
			</li>
		</>
	)
}
const TimeLineBlog2 =() =>{
	return(
		<>
			<li className="d-flex align-items-baseline">
				<h4 className="font-w400 time">10:10 AM</h4>
				<div className="panel">
					<Link to={"#"} className="timeline-panel text-muted d-flex align-items-center">
						<div className="badge badge-xl badge-secondary">KH</div>
						<h4 className="mb-0"><strong>Johnny Ahmad </strong> accepted your invitation to <strong className="text-secondary">Fullstack Developer </strong> Courses</h4>
					</Link>
				</div>	
			</li>
		</>
	)
}

const Activity = () =>{
	return(
		<div>
			<div className="card">
				<Tab.Container defaultActiveKey='Follow'> 
					<div className="card-header border-0 flex-wrap">
						<div className="course-details-tab style-2 tab-lg">
							<Nav >
								<Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
									<Nav.Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow'  type="button">Following</Nav.Link>
									<Nav.Link as="button" className="nav-link" id="nav-you-tab" type="button" eventKey='You' >You</Nav.Link>
								</Nav.Item>
							</Nav>
							{/* <div className="tab-content" id="nav-tabContent">
							  <div className="tab-pane fade active show" id="nav-following" role="tabpanel" aria-labelledby="nav-following-tab">
								
							  </div>
							  <div className="tab-pane fade" id="nav-you" role="tabpanel" aria-labelledby="nav-you-tab">
								
							  </div>
							</div> */}
						</div>
						<DropDownBlog />
					</div>
				</Tab.Container>	
				<div className="card-body pt-0">
					<div id="DZ_W_TimeLine11" className="widget-timeline style-3 ">
						<h3 className="mt-3">Today</h3>
						<ul className="timeline-active">
							<li className="d-flex align-items-baseline">
								<h4 className="font-w400 time">10:10 AM</h4>
								<div className="panel">
									<Link to={"#"} className="timeline-panel text-muted d-flex align-items-center">
										<div className="badge badge-xl badge-primary">KH</div>
										<h4 className="mb-0"><strong>Karen Hope </strong> attach 2 files to <strong className="text-warning"> Graphic Design</strong>Courses</h4>
									</Link>
									<div className="modulel flex-wrap">
										<div className="d-flex me-4 sub-module">
											<span className="file">
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M19.4928 23.625C20.1153 23.625 20.6178 23.1225 20.6178 22.5V6.95247C20.6178 6.80251 20.5353 6.53247 20.5353 6.52501C20.4753 6.38251 20.3928 6.26248 20.2878 6.15747L14.8353 0.705C14.7303 0.599992 14.6103 0.5175 14.4678 0.457485C14.4603 0.457485 14.1828 0.374992 14.0403 0.374992H4.50781C3.8853 0.374992 3.38281 0.877477 3.38281 1.49999V22.5C3.38281 23.1225 3.8853 23.625 4.50781 23.625H19.4928V23.625ZM5.63281 2.625H12.9153V6.95247C12.9153 7.57499 13.4178 8.07747 14.0403 8.07747H18.3678V21.375H5.63281V2.625Z" fill="#374557"/>
												</svg>
											</span>
											<div className="ms-3">
												<h4 className="m-0 fs-14 font-w600">Module1_GraphicDesign.doc</h4>
												<span>1,5 Mb</span>
											</div>
										</div>
										<div className="d-flex me-md-2 me-0  sub-module">
											<span className="file">
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M19.4928 23.625C20.1153 23.625 20.6178 23.1225 20.6178 22.5V6.95247C20.6178 6.80251 20.5353 6.53247 20.5353 6.52501C20.4753 6.38251 20.3928 6.26248 20.2878 6.15747L14.8353 0.705C14.7303 0.599992 14.6103 0.5175 14.4678 0.457485C14.4603 0.457485 14.1828 0.374992 14.0403 0.374992H4.50781C3.8853 0.374992 3.38281 0.877477 3.38281 1.49999V22.5C3.38281 23.1225 3.8853 23.625 4.50781 23.625H19.4928V23.625ZM5.63281 2.625H12.9153V6.95247C12.9153 7.57499 13.4178 8.07747 14.0403 8.07747H18.3678V21.375H5.63281V2.625Z" fill="#374557"/>
												</svg>
											</span>
											<div className="ms-3">
												<h4 className="m-0 fs-14 font-w600">Module2_GraphicDesign.doc</h4>
												<span>1,5 Mb</span>
											</div>
										</div>
									</div>
								</div>	
							</li>
							<TimeLineBlog1 />
							<TimeLineBlog2 />
							<TimeLineBlog2 />
						</ul>
						<h3 className="mt-3">Yesterday</h3>
						<ul className="timeline-active">
							<li className="d-flex align-items-baseline">
								<h4 className="font-w400 time">10:10 AM</h4>
								<div className="panel">
									<Link to={"#"} className="timeline-panel text-muted d-flex align-items-center">
										<div className="badge badge-xl badge-primary">KH</div>
										<h4 className="mb-0"><strong>Karen Hope </strong> attach 2 files to <strong className="text-warning"> Graphic Design</strong>Courses</h4>
									</Link>
									
								</div>	
							</li>
							<TimeLineBlog1 />
							<TimeLineBlog2 />
							
						</ul>
					</div>	
				</div>
			</div>
		</div>
	)
}
export default Activity;