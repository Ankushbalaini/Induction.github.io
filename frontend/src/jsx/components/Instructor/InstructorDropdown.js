import React, { Fragment, useEffect, useState } from "react";


// api call
async function getInstructor() {
    return fetch("http://localhost:8081/api/instructor/list", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(),
    }).then((data) => data.json());
}

   
const InstructorDropdown = (props) => {

    const [loading, setLoading] = useState(true);
    const [option, setOption] = useState();

    const callApi = async () =>{
        const response = await getInstructor();
        if ("status" in response && response.status == true) {
            const rows = response.data.map((row, index) => (
                <option value={row._id}>{row.profile.name}</option>
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

export default InstructorDropdown;