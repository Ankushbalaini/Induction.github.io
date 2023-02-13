import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

// api call
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

   
const DepartmentByCompany = (props) => {
    const token = useSelector((state) => state.auth.auth.token);
    const [loading, setLoading] = useState(true);
    const [option, setOption] = useState();
    const [parentCompany, setParentCompany] = useState(props.parentCompany);
    const [defaultSelectedVal, setDefaultSelectedVal] = useState(props.prevSelected);

    const callApi = async (token, company) =>{
        const response = await getDepartments(token, company);
        if ("status" in response && response.status == true) {
            const rows = response.data.map((row, index) => (
                <option value={row._id}>{row.name}</option>
            ));
            setOption(rows);
            setLoading(false);
        }
    }

    useEffect(()=>{
        //if(loading){
            callApi(token, props.parentCompany);
        //}
    },[props.parentCompany]);
    const pageContent = (loading) ? <option>Loading</option> : <>{option}</>;
    return(
        <>
        {pageContent}
        </>
    )
};

export default DepartmentByCompany;