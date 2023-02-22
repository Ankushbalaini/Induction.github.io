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
    const [currentCompany, setCurrentCompany] = useState(selectedVal);
    const [currentDepartment, setCurrentDepartment] = useState(selectedDeptVal);

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
            
        }

        if(currentCompany !== '' ){
            const resp = await getDepartments(token, currentCompany);
            if ("status" in resp && resp.status == true) {

                const rows = resp.data.map((row, index) => (
                    <option value={row._id} >{row.name}</option>
                ));
                setDeptOption(rows);
                setLoading(false);
            }
        }
        
    }

    // 
    const handleCompanyChange = async (e) =>{

        const selectedCompany = e.target.value;
        setCurrentCompany(selectedCompany);
        if(selectedCompany === ''){
            return false;
        }
        const response = await getDepartments(token, selectedCompany);
        if ("status" in response && response.status == true) {
            const rows = response.data.map((row, index) => (
                <option value={row._id}>{row.name}</option>
            ));
            setDeptOption(rows);
        }
        
    }

    
    useEffect(()=>{
        getCompanyData();
    }, [loading]);


    return (
        <>
            <div className="col-lg-12">
                <div className="form-group mb-3">
                    <label htmlFor="parentCompany" className="text-black font-w600">
                        {" "}
                        Select Company <span className="required">*</span>{" "}
                    </label>
                    <select
                        name="parentCompany"
                        className="form-control"
                        onChange={(e)=>handleCompanyChange(e)}
                        value={currentCompany}
                        required
                    >
                        <option value=''>Select</option>
                        {option}
                    </select>
                </div>
            </div>

            <div className="col-lg-12">
                <div className="form-group mb-3">
                    <label htmlFor="deptID" className="text-black font-w600">
                        {" "}
                        Select Department <span className="required">*</span>{" "}
                    </label>
                    <select
                        name="deptID"
                        className="form-control"
                        value={currentDepartment}
                        onChange={(e)=> setCurrentDepartment(e.target.value) }
                        required
                    >
                        <option value=''>Select</option>
                        { deptOption }
                    </select>
                </div>
            </div>
        </>



        
    );
}

export default CompanyDropdown;