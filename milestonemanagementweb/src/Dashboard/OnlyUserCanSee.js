import { useState } from "react";
import UserNav from "./UserNav";
import Alerts from "./Alerts";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import "../Custom.css";

function OnlyUserCanSee() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="tree">
      <div className="tree d-flex flex-column justify-content-center align-item-center bg-light vh-50">
        <h1 className="justify-content-center align-item-center design">
          User Dashboard
        </h1>
        {/* <UserNav searchText={searchText} setSearchText={setSearchText} /> */}
        <div className="w-100 rounded bg-white border shadow p-4">
          <div className="d-flex justify-content-end">
            <div className="ms-2">
            <Link to="/project-page" className="btn btn-success m-2">
              Add Project
            </Link>
            <Link to="/" className="btn btn-success">
              Logout
            </Link>
              {/* <Alerts /> */}
            </div>
          </div>
          <div>
            <UserCard searchText={searchText} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OnlyUserCanSee;
