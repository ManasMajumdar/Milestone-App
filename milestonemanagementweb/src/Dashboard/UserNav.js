import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProjects } from "../Redux/projectSlice";

function UserNav(props) {
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    const searchText = e.target.value;
    dispatch(getAllProjects(searchText));
    props.setSearchText(searchText);
  };
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={props.searchText}
              onChange={handleSearch}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
          <form className="d-flex">
            <Link to="/home" className="btn btn-outline-primary m-2">
              Back
            </Link>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default UserNav;
