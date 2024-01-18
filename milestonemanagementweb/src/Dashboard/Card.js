import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../Redux/projectSlice";
import { Link } from "react-router-dom";

const Card = (props) => {
  const dispatch = useDispatch();
  const projectsList = useSelector((state) => state.projects.projects);

  useEffect(() => {
    dispatch(getAllProjects(props.searchText));
  }, []);

  return projectsList.length === 0 ? (
    <>
      <h2>No Project found with : {props.searchText}</h2>
    </>
  ) : (
    <>
      <div>
        <section>
          <div className="container">
            <div className="d-flex flex-wrap">
              {projectsList.map((card, i) => (
                <div key={i} className="card m-2" style={{background: 'rgb(236, 205, 166)'}}>
                  <h6>Project Name: {card.projectName}</h6>
                  <h6>Project End Date: {card.projectEndDate}</h6>
                  <h6>Milestone Name: {card.nextMilestone || "N/A"}</h6>
                  <h6>Milestone End Date: {card.milestoneEndDate || "N/A"}</h6>
                  <h6>Project Status: {card.status}</h6>
                  <Link
                    to={"/user/update/" + card.id}
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

export default Card;
