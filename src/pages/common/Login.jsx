import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
// import { Alert } from "reactstrap";
import Styled from "styled-components";
import { useDispatch } from "react-redux";
import { MdHelp } from "react-icons/md";
import {
  superAdmin,
  admin,
  pcPm,
  teamLead,
  user,
  reviewer,
  author,
} from "../../redux/slices/appInfoSlice";
import Axios from "../../utils/api";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const [seconderror, setseconderror] = useState({});
  const [visible, setvisible] = useState(false);
  const [role, setRole] = useState("Author");
  useEffect(() => {
    // console.log(formErrors);
    // if (Object.keys(formErrors).length === 0 && isSubmit) {
    //   console.log(email, password);
    // }
  }, []);

  async function UserLogin(e) {
    e.preventDefault();
    //  if( validate(email,password)){

    setformErrors(validate(email, password));
    if (validate(email, password)) return;
    console.log("validated");
    setisSubmit(true);
    const error = {};
    try {
      const response = await Axios.post("/users/login", { email, password });
      console.log(response);
      const data = response.data.user;
      const { _id, FirstName } = response.data.user;
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      console.log(data);
      if (data) {
        // var login_obj = {
        //   _id: data.user._id,
        //   role: data.user.role,
        //   email: data.user.email,
        // };

        // localStorage.setItem("token", JSON.stringify(login_obj));
        // alert("login sccessfull")

        if (data.role === "author") {
          dispatch(author());
          navigate("/author");
          // window.location.href("/admin/dashboard")
        } else if (data.role === "reviewer") {
          console.log("inside user");
          dispatch(reviewer());
          navigate("/reviewer");
        } else {
          // history.push("/admin/projectlist");
          navigate("/admin/");
        }
        // window.location.href ="/";
      }
      //  }
      else {
        // alert("please check your username and password")
        const error = {};
        error.msg = "please check your credentials";
        setseconderror(error);
        setvisible(true);
      }
    } catch (error) {
      console.log(error);
      const err = {};
      err.msg = "please check your credentials or register";
      setseconderror(err);
    }
  }

  const updateSelect = (e) => {
    console.log(e.target.name, e.target.value);
    setRole(e.target.value);
  };

  const validate = (email, password) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)*$/;
    if (!email) {
      errors.email = "email is required!";
    } else if (!regex.test(email)) {
      errors.email = "Please enter valid email!";
    }
    if (!password) {
      errors.password = "password is required!";
    }
    if (Object.keys(errors).length < 1) {
      return false;
    }
    return errors;
  };
  return (
    <Wrapper>
      <div className="row top-container w-100">
        <div className="col-sm-3 col-xs-3"></div>
        <div className="col-md-4 col-sm-7">
          <div className="card-login-form ">
            <div className="row top-container">
              <div className="col-sm-3 "></div>
              <div className="col-sm-8 text-start">
                {/* <Alert
              color="info"
              isOpen={visible}
              toggle={() => setvisible(false)}
            >
              {seconderror.msg}
            </Alert> */}
                <p></p>
                <fieldset>
                  <h3 className="loginhead text-center mb-4 fw-bold">Login</h3>

                  <form onSubmit={UserLogin} className="w-80">
                    <div className="form-group ">
                      <label htmlFor="exampleInputEmail1" className="fw-bold">
                        Email Address
                      </label>
                      <input
                        type="text"
                        className="form-control shadow-none  text-mute"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                      <p className="text-danger ">{formErrors.email}</p>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="fw-bold"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control shadow-none  text-mute"
                        id="exampleInputPassword1"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                      />
                      <p className="text-danger  mb-2">{formErrors.password}</p>
                    </div>

                    <div className="text-danger "> {seconderror.msg}</div>
                    {/* <div className="login-btn-container">
                      <div className="login-btn-inner-container">
                        <button className=" login-button">admin Login</button>
                      </div>
                      <div className="login-btn-inner-container">
                        <button className=" login-button">user Login</button>
                      </div>
                    </div> */}
                    <div className="d-flex justify-content-center">
                      <Form.Select
                        aria-label="Default select example"
                        className="align-self-center shadow-none"
                        name={"role"}
                        value={role}
                        onChange={updateSelect}
                      >
                        <option value="Author">Author</option>
                        <option value="Reviewer">Reviewer</option>
                        <option value="Publisher">Publisher</option>
                        <option value="Editor">Editor</option>
                      </Form.Select>
                      <button
                        className="login-button"
                        onClick={(e) => {
                          UserLogin(e);
                          // if (role === "Author") {
                          //   dispatch(author());
                          //   navigate("/author");
                          // }
                          // if (role === "Reviewer") {
                          //   dispatch(reviewer());
                          //   navigate("/reviewer");
                          // }
                        }}
                      >
                        Login
                      </button>
                    </div>

                    <div className="d-flex justify-content-center ">
                      <Link
                        to="/register"
                        className=" mb-3 me-2"
                        style={{ color: "#000" }}
                      >
                        Register
                      </Link>
                      <Link
                        // to="/reset"
                        className=" mb-3"
                        style={{ color: "#000" }}
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <div className="d-flex justify-content-center align-items-center ">
                      <Link
                        // to="/reset"
                        className=" mb-3 me-2"
                        style={{ color: "#000" }}
                      >
                        Login Help
                        <MdHelp />
                      </Link>
                    </div>

                    {/* <a href="/reset">Forget Password</a>
                <a href="/trynew">try</a> */}
                  </form>
                </fieldset>
              </div>
              <div className="col-sm-2"></div>
            </div>
          </div>
        </div>
        <div className="col-md-4  extra-login-content">
          <img
            src={require("../../assets/images/himalya.jpg")}
            alt="background-image"
          />
        </div>
        <div className="col-md-1"></div>
      </div>
    </Wrapper>
  );
}
export default LoginForm;

const Wrapper = Styled.div`
.select-ltype{
  justify-self:center;
  align-self:center;
}
width:100%;
height:100vh;
display:flex;
justify-content:center;
align-items:center;

background-color:#F0F0F0;
.card-login-form{
  background-color: #FEFEFE;


  color:#000;
  /* width:500px; */
  /* -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75); */
   
}
.row{
  --bs-gutter-x:0;
}

.login-btn-container{
  display:flex;
  justify-content:center;
 
@media(max-width:1200px){
  display:block;
}

}


.login-button{
  
    width:150px;
    text-align:center;
    text-transform:capitalize;
    padding:10px 0px;
    flex-shrink:0;
    border: none;
    border-radius: 10px;
    margin: 10px;
    background-color: darkslategray;
    color: #fff;
   
}
.login-button:hover{
  background-color:#05445E;
}

.form-control{
    color:grey;
    font-weight:bold;
    
  }

  .extra-login-content{
    background-color:var(--toggle-color);
    
  }
  .extra-login-content img{
    width:100%;
    height:100%;
    background-size:contain;
    background-position:center;

    @media(max-width:767px){
      display:none;
    }
  }

@media(max-width:1200px){
  .login-btn-inner-container{
    display:flex;
    justify-content:center;
  }
 
}

@media(max-width:576px){
  .card-login-form{
    width:100%;
   
  }
  .top-container{
    min-height:100vh;
  }
  .extra-login-content{
display:none;    
  }

 

  .form-group{
    width:70%;
    margin:0 50px;
  }
 
}

@media(max-width:300px){
  .card-login-form{
    width:100%;
  }

  .form-group{
    width:90%;
    margin:0 20px;
  }
 
}


`;
