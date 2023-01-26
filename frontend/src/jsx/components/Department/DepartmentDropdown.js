import React, { Fragment, useEffect, useState } from "react";


// api call
async function getDepartments() {
    return fetch("http://localhost:8081/api/department/getall", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(),
    }).then((data) => data.json());
}

   
const DepartmentDropdown = (props) => {

    const [loading, setLoading] = useState(true);
    const [option, setOption] = useState();

    const callApi = async () =>{
        const response = await getDepartments();
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