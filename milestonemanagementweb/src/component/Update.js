import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get("" + id)
      .then((res) => setInputData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put("", inputData)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="d-flex w-100 vh-100
    justify-content-center align-items-center bg-light"
    >
      <div className="w-50 border bg-white shadow px-3 pt-3 pb-5 rounded">
        <h1 className="design">Update User</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label htmlFor="name">First Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter First Name..."
              value={setInputData.firstName}
              onChange={(e) =>
                setInputData({ ...inputData, firstName: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="name">Last Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Last Name..."
              value={setInputData.lastName}
              onChange={(e) =>
                setInputData({ ...inputData, lastName: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email..."
              value={setInputData.email}
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
            />
          </div>
          <br />
          <button className="btn btn-success">update</button>
          <Link to="/home" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Update;
