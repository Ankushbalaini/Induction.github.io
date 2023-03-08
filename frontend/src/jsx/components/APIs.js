import { useSelector } from "react-redux";
import { API_ROOT_URL } from "../constants";


// get Induction By ID 
export async function getInduction(id, token){
    // const token = useSelector((state) => state.auth.auth.token);

    return await fetch(`${API_ROOT_URL}/induction/${id}`, {
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


export async function getUsers(token) {

    return await fetch(`${API_ROOT_URL}/students/` , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token" : token,
      },
    }).then((data) => data.json());

}


export async function getData(URL, Token) {
    return await fetch( URL , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token" : Token,
      },
    }).then((data) => data.json());
}


