import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_ROOT_URL } from "../../constants";
// api call
async function getDepartments(token, parentCompany) {
    return fetch(`${API_ROOT_URL}/department/getAllActive`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token" : token
        },
        body : JSON.stringify({ "parentCompany" : parentCompany})
    }).then((data) => data.json());
}

   
const DepartmentDropdown = (props) => {
    const token = useSelector((state) => state.auth.auth.token);
    const [loading, setLoading] = useState(true);
    const [option, setOption] = useState();
    const [parentCompany, setParentCompany] = useState(props.parentCompany);
    const [defaultSelectedVal, setDefaultSelectedVal] = useState(props.prevSelected);

    const callApi = async () =>{
        const response = await getDepartments(token, parentCompany);
        if ("status" in response && response.status == true) {
            const rows = response.data.map((row, index) => (
                <option value={row._id}>{row.name}</option>
            ));
            setOption(rows);
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(loading){
            callApi();
        }
    },[parentCompany]);
    const pageContent = (loading) ? <option>Loading</option> : <>{option}</>;
    return(
        <>
        {pageContent}
        </>
    )
};

export default DepartmentDropdown;