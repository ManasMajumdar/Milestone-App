import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchTerm, fetchSearchResults } from "../Redux/searchSlice";
import { useEffect } from "react";
 
function NavItem() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.searchTerm);
 
  useEffect(() => {
    dispatch(fetchSearchResults(searchTerm));
  }, [searchTerm]);
 
  const handleSearchTermChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
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
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <button className="btn btn-outline-success" type="button">
              Search
            </button>
          </form>
          <form className="d-flex">
            <Link to="/email" className="btn btn-outline-primary me-2">
              Send an Email
            </Link>
            <Link to="/user" className="btn btn-outline-primary">
              Admin Dashboard
            </Link>
          </form>
        </div>
      </nav>
    </div>
  );
}
 
export default NavItem;
 