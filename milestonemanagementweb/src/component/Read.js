import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
        <div className="w-50 border bg-white shadow px-5 pb-3 rounded">
          <h3>Detail of User</h3>
          <div className="mb-2">
            <strong>First Name: {data.firstName}</strong>
          </div>
          <div className="mb-2">
            <strong>Last Name: {data.lastName}</strong>
          </div>
          <div className="mb-3">
            <strong>Email: {data.email}</strong>
          </div>
          <Link to={`/update/${id}`} className="btn btn-success">
            Edit
          </Link>
          <Link to="/home" className="btn btn-primary ms-3">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Read;
