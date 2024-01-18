import { useState } from "react";
import UserNav from "./UserNav";
import { Link } from "react-router-dom";
import Card from "./Card";
import Alerts from "./Alerts";
import Footer from "../component/Footer";
import "../Custom.css";

function UserDashboard() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="tree">
      <div className="d-flex flex-column justify-content-center align-item-center bg-light vh-50">
        <h1 className="justify-content-center align-item-center design">
         Admin Dashboard
        </h1>
        <UserNav searchText={searchText} setSearchText={setSearchText} />
        <div className="w-100 rounded bg-white border shadow p-4">
          <div className="d-flex justify-content-end">
            <Link to="/project" className="btn btn-success mb-3">
              Add Project
            </Link>
            <div className="ms-2">
              <Alerts />
            </div>
          </div>
          <div>
            <Card searchText={searchText} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserDashboard;
