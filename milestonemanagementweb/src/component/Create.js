import { useDispatch } from "react-redux";
import { createUser } from "../Redux/userSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Custom.css";

function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    empid: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    empid: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      empid: "",
      firstName: "",
      lastName: "",
      email: "",
    };

    if (!inputData.empid.trim()) {
      newErrors.empid = "Employee ID is required";
      isValid = false;
  } else if (!/^\d+$/.test(inputData.empid)) {
      newErrors.empid = "Invalid characters in Employee ID";
      isValid = false;
  } else if (parseInt(inputData.empid, 10) < 0) {
      newErrors.empid = "Employee ID should not be a negative value";
      isValid = false;
  }

    if (!inputData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(inputData.firstName.trim())) {
      newErrors.firstName = "Invalid characters in First Name";
      isValid = false;
    }

    if (!inputData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(inputData.lastName.trim())) {
      newErrors.lastName = "Invalid characters in Last Name";
      isValid = false;
    }

    if (!inputData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
        inputData.email.trim()
      )
    ) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      dispatch(createUser(inputData))
        .then(() => {
          alert("Data Posted Successfully!");
          navigate("/home");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="tree d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-3 pt-3 pb-5 rounded">
        <h1 className="design">Add a User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="empid">Employee ID:</label>
            <input
              type="number"
              name="number"
              className="form-control"
              placeholder="Enter Employee ID..."
              onChange={(e) =>
                setInputData({ ...inputData, empid: e.target.value })
              }
            />
            <div className="text-danger">{formErrors.empid}</div>
          </div>
          <div className="mb-2">
            <label htmlFor="name">First Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter First Name..."
              onChange={(e) =>
                setInputData({ ...inputData, firstName: e.target.value })
              }
            />
            <div className="text-danger">{formErrors.firstName}</div>
          </div>
          <div className="mb-2">
            <label htmlFor="name">Last Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Last Name..."
              onChange={(e) =>
                setInputData({ ...inputData, lastName: e.target.value })
              }
            />
            <div className="text-danger">{formErrors.lastName}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email..."
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
            />
            <div className="text-danger">{formErrors.email}</div>
          </div>
          <br />
          <button className="btn btn-success">Submit</button>
          <Link to="/home" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Create;
