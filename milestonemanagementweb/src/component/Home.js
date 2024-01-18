import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers, updateUserStatus } from "../Redux/userSlice";
import { deleteSearchResults, setSearchResults } from "../Redux/searchSlice";
import baseURL from "../api";
import Footer from "./Footer";
import "../Custom.css";

function Home({ handleLogout }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.user);
  const searchResults = useSelector((state) => state.search.searchResults);
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    searchResults.length > 0 && searchTerm.length !== 0
      ? searchResults.slice(indexOfFirstItem, indexOfLastItem)
      : users.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleLogoutClick = () => {
    handleLogout();
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const fetchUsersWithToken = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${baseURL}/api/user`,
          {
            method: "GET",
            cors: "disabled",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data)
        dispatch(fetchUsers(data));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsersWithToken();
  }, [dispatch]);

  const handleDelete = (userId) => {
    const confirmDelete = window.confirm("Would you like to delete this user?");
    if (confirmDelete) {
      dispatch(deleteUser(userId));
      dispatch(deleteSearchResults(userId));
    }
  };

  const handleActive = (e, userId, status) => {
    e.preventDefault();
    status = !status;
    dispatch(updateUserStatus({ userId, status }));
    dispatch(setSearchResults({ userId, status }));
  };

  return (
    <div className="tree">
      <div className="d-flex flex-column justify-content-center align-item-center bg-light vh-50">
        <h1 className="justify-content-center align-item-center design">
          List of Users
        </h1>
        <NavItem />
        <div className="w-100 rounded bg-white border shadow p-4">
          <div className="d-flex justify-content-end">
            <Link to="/create" className="btn btn-success me-2">
              Add User
            </Link>

            <button className="btn btn-success" onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>EmpID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
              {searchResults.length > 0 && searchTerm.length !== 0
                ? searchResults.map((user, i) => (
                    <tr key={i}>
                      {/* <td>{user.id}</td> */}
                      <td>{user.empid}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                        <button
                          onClick={(e) =>
                            handleActive(e, user.id, user.isActive, i)
                          }
                          className={`btn btn-sm btn-${
                            user.isActive === false ? "warning" : "success"
                          } ms-2`}
                        >
                          {user.isActive === false ? "inactive" : "active"}
                        </button>
                      </td>
                    </tr>
                  ))
                : currentItems.map((user, i) => (
                    <tr key={i}>
                      {/* <td>{user.id}</td> */}
                      <td>{user.empid}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                        <button
                          onClick={(e) =>
                            handleActive(e, user.id, user.isActive)
                          }
                          className={`btn btn-sm btn-${
                            user.isActive === false ? "warning" : "success"
                          } ms-2`}
                        >
                          {user.isActive === false ? "inactive" : "active"}
                        </button>
                      </td>
                    </tr>
                  ))}
              <tbody></tbody>
            </thead>
          </table>
          <div className="d-flex justify-content-center mt-3">
            <ul className="pagination">
              {[
                ...Array(
                  Math.ceil(
                    (searchResults.length > 0
                      ? searchResults.length
                      : users.length) / itemsPerPage
                  )
                ).keys(),
              ].map((pageNumber) => (
                <li
                  key={pageNumber}
                  className={`page-item ${
                    pageNumber + 1 === currentPage ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => paginate(pageNumber + 1)}
                    className="page-link"
                  >
                    {pageNumber + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
