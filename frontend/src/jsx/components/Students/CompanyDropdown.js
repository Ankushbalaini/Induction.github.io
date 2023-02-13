import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getData } from "../APIs";


async function getDepartments(token, company) {
    return fetch("http://localhost:8081/api/department/getDepartmentByComp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token" : token
        },
        body : JSON.stringify({ "parentCompany" : company})
    }).then((data) => data.json());
}

// get all active companies in dropdown
const CompanyDropdown = ({ selectedVal , selectedDeptVal }) => {

    const token = useSelector((state) => state.auth.auth.token);
    const [loading, setLoading] = useState(true);
    const [option, setOption] = useState();
    const [deptOption, setDeptOption] = useState();

    // call to api
    const getCompanyData = async () =>{
        const response  = await getData("http://localhost:8081/api/company/list", token);
        if ("status" in response && response.status == true) {
            const rows = response.data.map((row, index) => (
                <option value={row.userID}>{row.name}</option>
            ));
            setOption(rows);
            setLoading(false);
        }
    }

    // 
    const handleCompanyChange = (e) =>{

        //setLoading(true);

        // deptOption
        const selectedCompanyVal = e.target.value;
        
        const response = getDepartments(token, selectedCompanyVal);
        if ("status" in response && response.status == true) {
            const rows = response.data.map((row, index) => (
                <option value={row._id}>{row.name}</option>
            ));
            setDeptOption(rows);
            //setLoading(false);
        }
    }

    
    useEffect(()=>{
        getCompanyData();
    }, [loading, deptOption]);


    return (
        <>
            <div className="col-lg-12">
                <div className="form-group mb-3">
                    <label htmlFor="first_name" className="text-black font-w600">
                        {" "}
                        Select Company <span className="required">*</span>{" "}
                    </label>
                    <select
                        name="parentCompany"
                        className="form-control"
                        onChange={(e)=>handleCompanyChange(e)}
                        value={selectedVal}
                    >
                        {option}
                    </select>
                </div>
            </div>

            <div className="col-lg-12">
                <div className="form-group mb-3">
                    <label htmlFor="first_name" className="text-black font-w600">
                        {" "}
                        Select Department-- {deptOption} <span className="required">*</span>{" "}
                    </label>
                    <select
                        name="deptID"
                        className="form-control"
                        value={selectedDeptVal}
                    >
                        {deptOption}
                    </select>
                </div>
            </div>
        </>



        
    );
}

export default CompanyDropdown;