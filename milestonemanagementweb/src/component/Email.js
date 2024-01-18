import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCcEmail,
  setToEmail,
  setCcEmailType,
  setToEmailType,
} from "../Redux/emailSlice";
import { useState } from "react";
import baseURL from "../api";
import "../Custom.css";

function Email() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toEmail, ccEmail, toEmailType, ccEmailType } = useSelector(
    (state) => state.email
  );

  const [inbox, setInbox] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // const data = [
  //   {
  //     email: toEmailType,
  //     type: "TO",
  //     inbox: inbox,
  //   },
  // ];

  const handleSend = (event) => {
    event.preventDefault();
  
    if (!toEmailType) {
      setError("To Email cannot be empty");
      return;
    }

    const data = [
      {
        email: toEmailType,
        type: "TO",
        inbox: inbox,
      },
      {
        email: ccEmailType,
        type: "CC",
        inbox: inbox,
      },
    ];
  
    axios
      .post(`${baseURL}/v1/audience/add`, data)
      .then((res) => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/home");
        }, 1000);
      })
      .catch((err) => console.log(err));
  };
  

  const searchValue = (searchValue, list) => {
    return list.filter(
      (item) => item.includes(searchValue) || item.startsWith(searchValue)
    );
  };

  const handleToEmailChange = (value) => {
    axios.get(`${baseURL}/v1/audience/get/TO`).then((res) => {
      if (res.data) {
        const result = searchValue(value, res.data);
        dispatch(setToEmail(result));
      }
    });
  };

  const handleToEmail = (value, e) => {
    e.preventDefault();
    dispatch(setToEmailType(value));
    dispatch(setToEmail([]));
  };

  const handleCcEmailChange = (value) => {
    axios.get(`${baseURL}/v1/audience/get/CC`).then((res) => {
      const result = searchValue(value, res.data);
      dispatch(setCcEmail(result));
    });
  };

  const handleCcEmail = (value, e) => {
    e.preventDefault();
    dispatch(setCcEmailType(value));
    dispatch(setCcEmail([]));
  };

  return (
    <div className="tree d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-3 pt-3 pb-5 rounded">
        <h2 className="design">Email Form</h2>
        <form onSubmit={handleSend}>
          <div className="mb-2">
            <label htmlFor="email">To</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={toEmailType}
              placeholder="Add To Email..."
              onChange={(e) => {
                handleToEmailChange(e.target.value);
                dispatch(setToEmailType(e.target.value));
              }}
            />
            {toEmail.map((value) => (
              <input
                key={value}
                type="email"
                value={value}
                onClick={(e) => handleToEmail(value, e)}
              />
            ))}
          </div>
          <div className="mb-2">
            <label htmlFor="email">CC</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Add CC Email..."
              value={ccEmailType}
              onChange={(e) => {
                handleCcEmailChange(e.target.value);
                dispatch(setCcEmailType(e.target.value));
              }}
            />
            {ccEmail.map((value) => (
              <input
                key={value}
                type="email"
                value={value}
                onClick={(e) => handleCcEmail(value, e)}
              />
            ))}
          </div>
          <div className="mb-3">
            <label htmlFor="text">Inbox</label>
            <textarea
              value={inbox}
              onChange={(e) => setInbox(e.target.value)}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success" role="alert">
              Mail successfully sent!
            </div>
          )}
          <br />
          <button type="submit" className="btn btn-success">
            Send
          </button>
          <Link to="/home" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Email;

























