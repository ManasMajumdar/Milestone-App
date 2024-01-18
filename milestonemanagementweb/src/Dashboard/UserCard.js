import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectsByOwner } from "../Redux/projectSlice";
import { Link } from "react-router-dom";

const UserCard = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.owner.owner);
  const projectsList = useSelector((state) => state.projects.projects);
  console.log(projectsList);

  useEffect(() => {
    if (email) {
      dispatch(getAllProjectsByOwner(email));
    }
  }, [dispatch, email]);

  return projectsList.length === 0 ? (
    <>
      <h2>No Project found with: {email}</h2>
    </>
  ) : (
    <>
      <div>
        <section>
          <div className="container">
            <div className="d-flex flex-wrap">
              {projectsList.map((card, i) => (
                <div key={i} className="card m-2" style={{ background: 'rgb(236, 205, 166)' }}>
                  <h6>Project Name: {card.name}</h6>
                  <h6>Project End Date: {card.endDate}</h6>
                  <h6>Milestone Name: {card.milestoneName || "N/A"}</h6>
                  <h6>
                    Milestone End Date: {card.milestoneEndDate || "N/A"}
                  </h6>
                  <h6>Project Status: {card.status}</h6>
                  <Link
                    to={"/user-page/update/" + card.id}
                    className="btn btn-success"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserCard;
