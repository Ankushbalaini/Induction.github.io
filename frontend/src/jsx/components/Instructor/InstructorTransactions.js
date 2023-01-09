import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

//import EarningsChartBar from './Instructor/EarningsChartBar';
//import TransactionsEarningCourses from './Instructor/TransactionsEarningCourses';
import {chartBlog} from './InstructorCourses';

const EarningsChartBar = loadable(() =>
	pMinDelay(import("./Instructor/EarningsChartBar"), 1000)
);
const TransactionsEarningCourses = loadable(() =>
	pMinDelay(import("./Instructor/TransactionsEarningCourses"), 1000)
);


const TransactionsTable = [
	{title: 'Samantha William', amount:'60.00', status:'Completed', changeClass:'badge-success'},
	{title: 'Jordan Nico', amount:'50.00', status:'Pending', changeClass:'badge-warning'},
	{title: 'Nadila Adja', amount:'20.00', status:'Canceled', changeClass:'badge-danger'},
];

const InstructorTransactions = () =>{
	return(
		<>
			<div className="row">
				<div className="col-xl-9 col-xxl-8">
					<div className="row">
						<div className="col-xl-12">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-xl-3 col-lg-3">
											<div className="rae-chart">
												<div>
													<h4>Earnings</h4>
													<span className="fs-18">Dec 1 - Dec 31, 2021</span>
												</div>	
												<div className="student-earning">
													<h6 className="fw-light mb-1">This Month</h6>
													<h2 className="mb-1 fw-bold">$53.678</h2>
													<span className="text-secondary fs-18">
														<svg className="me-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M23.25 12C23.25 5.775 18.225 0.75 12 0.75C5.775 0.749999 0.75 5.775 0.75 12C0.749999 18.225 5.775 23.25 12 23.25C18.225 23.25 23.25 18.225 23.25 12ZM11.25 16.575L11.25 9.675L9.3 11.4C8.85 11.775 8.25 11.7 7.875 11.325C7.725 11.1 7.65 10.875 7.65 10.65C7.65 10.35 7.8 10.05 8.025 9.9L11.625 6.75C11.7 6.675 11.775 6.675 11.85 6.6C11.925 6.6 11.925 6.6 12 6.525C12.075 6.525 12.075 6.525 12.15 6.525L12.225 6.525C12.3 6.525 12.3 6.525 12.375 6.525L12.45 6.525C12.525 6.525 12.525 6.525 12.6 6.6C12.6 6.6 12.675 6.6 12.675 6.675L12.75 6.75C12.75 6.75 12.75 6.75 12.825 6.825L15.975 10.05C16.35 10.425 16.35 11.1 15.975 11.475C15.6 11.85 14.925 11.85 14.55 11.475L13.125 9.975L13.125 16.65C13.125 17.175 12.675 17.7 12.075 17.7C11.7 17.55 11.25 17.1 11.25 16.575Z" fill="var(--secondary)"></path>
														</svg>
													+15%</span>
												</div>
											</div>
										</div>
										<div className="col-xl-9 custome-tooltip col-lg-9">
											<EarningsChartBar />
										</div>	
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-12">
							<div className="card students-list">
								<div className="card-header border-0 pb-0">
									<h4>Lastest Transaction</h4>
									<Link to={"#"} className="btn btn-primary btn-sm">View all</Link>
								</div>
								<div className="card-body pt-0">
									<div className="table-responsive">
										<table className="table display mb-4 dataTablesCard order-table card-table text-black dataTable  application" id="example5">
											<thead>
												<tr>
													<th>Date</th>
													<th>Name</th>
													<th>Amount</th>
													<th>Status</th>
													<th>Invoice</th>
												</tr>
											</thead>
											<tbody>
												{TransactionsTable.map((data, ind)=>(
													<tr key={ind}>
														<td>January 2, 2020</td>
														<td>{data.title}</td>
														<td>$ {data.amount}</td>
														<td><span className={`badge light ${data.changeClass}`}>{data.status}</span></td>
														<td>
															<Link to={"#"}>Download 
																<svg className="ms-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M19.9453 14.8324C19.9453 15.3622 19.9453 15.892 19.9453 16.4219C19.9453 16.7646 19.9453 17.1072 19.9453 17.4499C19.9453 17.6649 19.9522 17.8812 19.9274 18.095C19.926 18.1057 19.9246 18.1163 19.9232 18.127C19.9369 18.0252 19.9506 17.9234 19.9642 17.8217C19.9341 18.0312 19.8782 18.2339 19.7964 18.4291C19.835 18.3377 19.8736 18.2463 19.9122 18.1548C19.8297 18.3445 19.7251 18.5215 19.5987 18.6853C19.6586 18.6078 19.7184 18.5303 19.7783 18.4528C19.6571 18.6059 19.5199 18.743 19.3669 18.8643C19.4444 18.8044 19.5218 18.7445 19.5993 18.6847C19.4355 18.811 19.2586 18.9156 19.0688 18.9981C19.1603 18.9595 19.2518 18.9209 19.3432 18.8823C19.1479 18.9642 18.9453 19.0201 18.7357 19.0502C18.8375 19.0365 18.9393 19.0228 19.041 19.0092C18.795 19.0411 18.5437 19.0312 18.2961 19.0312C17.8658 19.0312 17.4356 19.0312 17.0054 19.0312C15.6224 19.0312 14.2395 19.0312 12.8565 19.0312C11.3673 19.0312 9.87803 19.0312 8.38881 19.0312C7.50177 19.0312 6.61473 19.0312 5.72769 19.0312C5.57387 19.0312 5.42169 19.0291 5.26841 19.0092C5.37018 19.0228 5.47194 19.0365 5.57371 19.0502C5.36415 19.0201 5.16151 18.9642 4.96625 18.8823C5.05771 18.9209 5.14916 18.9595 5.24059 18.9981C5.05086 18.9156 4.87396 18.811 4.71015 18.6847C4.78764 18.7445 4.8651 18.8044 4.94258 18.8643C4.78954 18.743 4.65238 18.6059 4.53116 18.4528C4.59102 18.5303 4.65088 18.6078 4.71074 18.6853C4.58439 18.5215 4.47979 18.3445 4.39731 18.1548C4.43591 18.2463 4.47449 18.3377 4.51309 18.4291C4.43127 18.2339 4.37535 18.0312 4.34523 17.8217C4.35889 17.9235 4.37258 18.0252 4.38625 18.127C4.35772 17.9075 4.36417 17.6863 4.36417 17.4655C4.36417 17.1254 4.36417 16.7852 4.36417 16.4451C4.36417 15.9076 4.36417 15.3701 4.36417 14.8326C4.36417 14.8325 4.36417 14.8324 4.36417 14.8323C4.36417 14.2063 3.84177 13.6839 3.21573 13.6839C2.58969 13.6839 2.06729 14.2063 2.06729 14.8323C2.06729 15.3621 2.06729 15.892 2.06729 16.4218C2.06729 16.7645 2.06729 17.1072 2.06729 17.4499C2.06729 17.6648 2.06038 17.8811 2.08522 18.095C2.11058 18.3133 2.13725 18.5317 2.19467 18.7441C2.25294 18.9597 2.34817 19.1688 2.4392 19.3709C2.57949 19.6824 2.79908 19.9661 3.02596 20.2175C3.48022 20.721 4.1435 21.0966 4.80529 21.2379C5.19597 21.3213 5.56963 21.328 5.96115 21.328C7.00056 21.328 8.03995 21.328 9.07933 21.328C10.6005 21.328 12.1216 21.328 13.6428 21.328C14.9372 21.328 16.2316 21.328 17.5261 21.328C17.8669 21.328 18.2077 21.328 18.5485 21.328C19.2558 21.328 19.9477 21.186 20.5571 20.8092C20.846 20.6306 21.1226 20.4071 21.3443 20.1484C21.4805 19.9894 21.6106 19.8202 21.7233 19.643C21.8437 19.4538 21.9248 19.2459 22.0112 19.0397C22.1847 18.6257 22.2421 18.1657 22.2421 17.7193C22.2421 17.0729 22.2421 16.4264 22.2421 15.78C22.2421 15.4641 22.2421 15.1482 22.2421 14.8323C22.2421 14.2062 21.7197 13.6838 21.0937 13.6838C20.4676 13.6838 19.9453 14.2063 19.9453 14.8324Z" fill="#A098AE"/>
																	<path d="M11.0059 3.89038C11.0059 4.58272 11.0059 5.27506 11.0059 5.96738C11.0059 7.43473 11.0059 8.9021 11.0059 10.3695C11.0059 11.6973 11.0059 13.0252 11.0059 14.3531C11.0059 14.71 11.0059 15.0669 11.0059 15.4238C11.0059 16.0498 11.5283 16.5722 12.1543 16.5722C12.7803 16.5722 13.3027 16.0498 13.3027 15.4238C13.3027 14.7314 13.3027 14.0391 13.3027 13.3468C13.3027 11.8794 13.3027 10.412 13.3027 8.94469C13.3027 7.61679 13.3027 6.2889 13.3027 4.96098C13.3027 4.60412 13.3027 4.24724 13.3027 3.89038C13.3027 3.26434 12.7803 2.74194 12.1543 2.74194C11.5283 2.74194 11.0059 3.26434 11.0059 3.89038Z" fill="#A098AE"/>
																	<path d="M12.9667 16.2358C13.7341 15.4685 14.5014 14.7011 15.2688 13.9337C15.8385 13.3641 16.4081 12.7944 16.9778 12.2248C17.4202 11.7823 17.4202 11.0431 16.9778 10.6006C16.5353 10.1582 15.7961 10.1582 15.3536 10.6006C14.5863 11.368 13.8189 12.1353 13.0516 12.9027C12.4819 13.4724 11.9122 14.042 11.3426 14.6117C10.9001 15.0541 10.9001 15.7934 11.3426 16.2358C11.7851 16.6783 12.5243 16.6783 12.9667 16.2358Z" fill="#A098AE"/>
																	<path d="M12.9661 14.6117C12.1987 13.8443 11.4314 13.077 10.664 12.3096C10.0943 11.74 9.52467 11.1703 8.95502 10.6006C8.51257 10.1582 7.77334 10.1582 7.33086 10.6006C6.88841 11.0431 6.88841 11.7823 7.33086 12.2248C8.09824 12.9921 8.86561 13.7595 9.63298 14.5268C10.2026 15.0965 10.7723 15.6662 11.342 16.2358C11.7844 16.6783 12.5237 16.6783 12.9661 16.2358C13.4086 15.7934 13.4086 15.0541 12.9661 14.6117Z" fill="#A098AE"/>
																</svg>

															</Link>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>	
				<div className="col-xl-3 col-xxl-4">
					<div className="row">
						<div className="col-xl-12 col-sm-6">
							<div className="card total-order">
								<div className="card-body">
									<h6 className="mb-2 fw-light">Total Order</h6>
									<div className="d-flex align-items-center mb-3">
										<h2 className="m-0 fw-bold">317,642</h2>
										<span className="text-secondary fs-18 ms-3">
											<svg className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M23.25 12C23.25 5.775 18.225 0.75 12 0.75C5.775 0.749999 0.75 5.775 0.75 12C0.749999 18.225 5.775 23.25 12 23.25C18.225 23.25 23.25 18.225 23.25 12ZM11.25 16.575L11.25 9.675L9.3 11.4C8.85 11.775 8.25 11.7 7.875 11.325C7.725 11.1 7.65 10.875 7.65 10.65C7.65 10.35 7.8 10.05 8.025 9.9L11.625 6.75C11.7 6.675 11.775 6.675 11.85 6.6C11.925 6.6 11.925 6.6 12 6.525C12.075 6.525 12.075 6.525 12.15 6.525L12.225 6.525C12.3 6.525 12.3 6.525 12.375 6.525L12.45 6.525C12.525 6.525 12.525 6.525 12.6 6.6C12.6 6.6 12.675 6.6 12.675 6.675L12.75 6.75C12.75 6.75 12.75 6.75 12.825 6.825L15.975 10.05C16.35 10.425 16.35 11.1 15.975 11.475C15.6 11.85 14.925 11.85 14.55 11.475L13.125 9.975L13.125 16.65C13.125 17.175 12.675 17.7 12.075 17.7C11.7 17.55 11.25 17.1 11.25 16.575Z" fill="var(--secondary)"></path>
											</svg>
										+15%</span>
									</div>
									<p className="fs-14 font-w400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
								</div>
							</div>
						</div>	
						<div className="col-xl-12 col-sm-6">
							<div className="card earning-courses">
								<div className="card-header border-0 pb-0">
									<div>
										<h4>Earning Courses</h4>
										<h6 className="mb-1 fw-light">This Month</h6>
										<h2 className="fw-bold">$53.678</h2>
									</div>	
									
								</div>
								<div className="card-body">
										<TransactionsEarningCourses />
									<div className="mb-3 mt-4">
										{chartBlog.map((item, ind)=>(
											<div className="d-flex justify-content-between mb-2" key={ind}>	
												<span>
													<svg className="me-3" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="20" height="20" rx="6" fill={item.color} />
													</svg>
													{item.title} ({item.percent}%)
												</span>
												<h6>{item.status}</h6>
											</div>
										))}
									</div>
								</div>	
							</div>
						</div>
					</div>
				</div>
				
			</div>	
		</>
		
	)
}
export default InstructorTransactions;