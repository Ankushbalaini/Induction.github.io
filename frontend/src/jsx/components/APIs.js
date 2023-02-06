import { useSelector } from "react-redux";

export function get_all_user(){
    // rest of code


}
  
// get Induction By ID 
export async function getInduction(id, token){
    // const token = useSelector((state) => state.auth.auth.token);

    return await fetch("http://localhost:8081/api/induction/" + id, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "x-access-token" : token
        },
    })
    .then((data) => data.json())
    .then((data) => {
        return data;
    });
}




