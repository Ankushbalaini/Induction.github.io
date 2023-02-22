import React, { Fragment, useState, useRef,useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const AddCompany = () => {
  const navigate = useHistory();
  
  // const intialState = {
  //   email:'',
  //   password:'',
  //   name:'',
  //   companyID: '',
  //   image:'',
  //   address:'',
  //   aboutCompany: '',
  //   logo: {
  //     preview:'',
  //     data:''
  //   }
  // }
  // // useState 
  // const [state, setState] = useState(intialState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [companyID, setCompanyID] = useState("");
  // const [logo, setLogo] = useState();
  const [image, setImage] = useState({preview:'', data:''})
  const [address, setAddress] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");

   // validation messages
   let errorObj = { 
    email: "",
    password: "",
    name: "",
    companyID:"",
    logo:"",
    address: "",
    
 };

 const [errors, setErrors] = useState(errorObj);


  // on file change
  const handleFileChange = async (e) => {
    const image = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    // setLogo({logo : img.data });
    setImage(image)
  }



  // on form submit
  let handleSubmit = async (e) => {
    e.preventDefault();

    let error = false;
    const errorObj1 = { ...errorObj }

    if (email === "") {
      errorObj1.email = "Email is required";
      error = true;
    }
    if (password === "") {
      errorObj1.password = "Password is required";
      error = true;
    }
    if (name === "") {
      errorObj1.name = "Name is required";
      error = true;
    }
    if (companyID  === "") {
      errorObj1.companyID = "Slug is required";
      error = true;
    }
    if (image  === "") {
      errorObj1.image = "Logo is required";
      error = true;
    }
    if (address === "") {
      errorObj1.address = "Company address is required";
      error = true;
    }
    
    
    setErrors(errorObj1);

    if (error) return ;


    // alert( JSON.stringify(state) );

    // const data = new FormData(e.target);

    // const response = await fetch("http://localhost:8081/api/company/add", {
    //   method: "POST",
    //   body: data,
    // }).then((data) => data.json());

    // if ("status" in response && response.status == true) {
    //   return swal("Success", response.message, "success", {
    //     buttons: false,
    //     timer: 2000,
    //   }).then((value) => {
    //     // return <Navigate to="/inductions" />;
    //     navigate.push("/companies");
    //   });
    // } else {
    //   return swal("Failed", "Error message", "error");
    // }


    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('companyID', companyID);
    data.append('logo', image.data);
    data.append('address', address);
    data.append('aboutCompany', aboutCompany);
    // let formData = new FormData();
    const response = await fetch("http://localhost:8081/api/company/add", {
      method: "POST",
      body: data,
    }).then((data) => data.json());
    if ("status" in response && response.status == true) {
      return swal("Company has been created successfully!", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        // return <Navigate to="/inductions" />;
        navigate.push("/companies");
      });
    } else {
      return swal("Failed", "Error message", "error");
    }
    
  };

  function handleKeyPress(e) {
    var key = e.key;
   if (key == key) {
        setErrors((errorObj == false))
    }
}


   //css for button
   const buttonStyle = {
    margin: "auto",
    display: "flex",
    float: 'right'
  };

  useEffect(() => {}, [errors]);

  return (
    <Fragment>
      <PageTitle activeMenu="Add Company" motherMenu="Company" />

      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-titlhandleSubmite">Add Company</h4>
          </div>
          <div className="card-body">
            <div className="basic-form">
              <form
                onSubmit={(e)=>handleSubmit(e)}
                method="POST"
                enctype="multipart/form-data"
              >
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    Company Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e)}

                      value={email}
                    />
                    {errors.email && (
                      <div Style="color:red;font-weight:400">
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    Company Password
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value) }
                      onKeyPress={(e) => handleKeyPress(e)}

                      value={password}
                    />
                    {errors.password && (
                      <div Style="color:red;font-weight:400">
                        {errors.password}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    Company Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value) }
                      value={name}
                      onKeyPress={(e) => handleKeyPress(e)}
                    />
                    {errors.name && (
                      <div Style="color:red;font-weight:400">
                        {errors.name}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Slug</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="companyID"
                      onChange={(e) => setCompanyID( e.target.value) }
                      value={companyID}
                    />
                    {errors.companyID && (
                      <div Style="color:red;font-weight:400">
                        {errors.companyID}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    Company Logo
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="file"
                      className="form-control"
                      name="logo"
                      onChange={handleFileChange}
                      accept="image/png,image/jpeg,image/jpg"
                    />
                    {errors.logo && (
                      <div Style="color:red;font-weight:400">
                        {errors.logo}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Address</label>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      name="address"
                      placeholder=""
                      onChange={(e) => setAddress( e.target.value) }
                    >
                      {address}
                    </textarea>
                    {errors.address && (
                      <div Style="color:red;font-weight:400">
                        {errors.address}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    About Company
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      name="aboutCompany"
                      placeholder=""
                      onChange={(e) => setAboutCompany(e.target.value) }
                    >
                      {aboutCompany}
                    </textarea>
                   
                   
                  </div>
                </div>

                <div className="mb-12 row">
                  <div className="col-sm-12">
                    <button className="btn btn-success" type="submit" style={buttonStyle}>
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCompany;