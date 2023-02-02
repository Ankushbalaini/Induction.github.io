import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

// api call
async function getDepartments(token) {
    return fetch("http://localhost:8081/api/department/getAllActive", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "x-access-token" : token
        },
        body: JSON.stringify(),
    }).then((data) => data.json());
}

   
const DepartmentDropdown = (props) => {
    const token = useSelector((state) => state.auth.auth.token);
    const [loading, setLoading] = useState(true);
    const [option, setOption] = useState();
    const [defaultSelectedVal, setDefaultSelectedVal] = useState(props.prevSelected);

    const callApi = async () =>{
        const response = await getDepartments(token);
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
    },[]);
    const pageContent = (loading) ? <option>Loading</option> : <>{option}</>;
    return(
        <>
        {pageContent}
        </>
    )
};

export default DepartmentDropdown;