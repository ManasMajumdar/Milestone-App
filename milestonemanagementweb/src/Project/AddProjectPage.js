import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MilestonesModal } from "../Modal/MilestonesModal";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../Redux/projectSlice";
import { addMilestones } from "../Redux/milestoneSlice";
import { fetchUsers } from "../Redux/userSlice";
import "../Custom.css";

function ProjectPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMilestones, setShowMilestones] = useState(false);
  const [projectId, setProjectId] = useState();
  const [usersEmail, setUsersEmail] = useState(
    useSelector((state) => state.user.user)
  );
  const [isProjectSaved, setIsProjectSaved] = useState(false);
  const [areMilestonesAdded, setAreMilestonesAdded] = useState(false);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    endDate: "",
    startDate: "",
    owner: "",
    status: "",
  });
  const [selectedMilestones, setSelectedMilestones] = useState([]);
  const [showEmail, setShowEmail] = useState(false);
  const [projectSaved, setProjectSaved] = useState(false);
  const projectsList = useSelector((state) => state.projects.projects);

  function handleSubmit(e) {
    e.preventDefault();

    const areProjectFieldsValid =
      projectData.name &&
      projectData.startDate &&
      projectData.endDate &&
      projectData.status &&
      projectData.owner !== null;

    const isEndDateValid =
      new Date(projectData.endDate) > new Date(projectData.startDate);

    if (!areProjectFieldsValid) {
      alert("Please fill in all project fields, including status");
      return;
    }

    if (!isEndDateValid) {
      alert("End date must be greater than start date");
      return;
    }

    const isProjectNameUnique = projectsList.every(
      (existingProject) => existingProject.name !== projectData.name
    );

    if (!isProjectNameUnique) {
      alert("Project name must be unique");
      return;
    }

    dispatch(addProject(projectData)).then((action) => {
      setProjectId(action.payload.id);
      setIsProjectSaved(true);
      setProjectSaved(true);
    });

    alert("Project added Successfully!");
  }

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  function handleShow(e) {
    setShowMilestones(true);
    e.preventDefault();

    if (!selectedMilestones) {
      setSelectedMilestones([]);
    }
  }

  function handleOnClick(e) {
    e.preventDefault();

    const missingDueDate = selectedMilestones.some((item) => !item.dueDate);

    if (!projectId) {
      alert("Project ID is not defined. Please add a project first.");
      return;
    }

    if (missingDueDate) {
      alert("Please provide a due date for all milestones.");
      return;
    }

    dispatch(addMilestones({ projectId, selectedMilestones }));
    setAreMilestonesAdded(true);
    alert("Milestone added Successfully!");
    navigate("/user");
  }

  function handleOnBack(e) {
    e.preventDefault();
    navigate("/user");
  }

  function handleOnClick(e) {
    e.preventDefault();

    const missingDueDate = selectedMilestones.some((item) => !item.dueDate);

    if (!projectId) {
      alert("Project ID is not defined. Please add a project first.");
      return;
    }

    if (missingDueDate) {
      alert("Please provide a due date for all milestones.");
      return;
    }

    const isValidMilestoneDate = selectedMilestones.every((item) => {
      const milestoneDueDate = new Date(item.dueDate);
      const projectStartDate = new Date(projectData.startDate);
      const projectEndDate = new Date(projectData.endDate);

      return (
        milestoneDueDate >= projectStartDate &&
        milestoneDueDate <= projectEndDate
      );
    });

    if (!isValidMilestoneDate) {
      alert(
        "Milestone end date should be between project start date and end date."
      );
      return;
    }

    dispatch(addMilestones({ projectId, selectedMilestones }));
    setAreMilestonesAdded(true);
    alert("Milestone added Successfully!");
    navigate("/user");
  }

  function handleEmailClick(e) {
    e.preventDefault();
    setProjectData({ ...projectData, owner: e.target.value });
    setUsersEmail([]);
  }

  return (
    <div className="tree">
      <div className="d-flex align-items-center flex-column">
        <h1 className="mb-4">Add Project</h1>
        <div className="w-75 rounded bg-light border shadow p-4 mb-4">
          <div className="container-fluid">
            <form className="row g-3 mb-4">
              <div className="col-md-6">
                <label htmlFor="Project_Name" className="form-label">
                  Project Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Project_Name"
                  value={projectData.name}
                  onChange={(e) =>
                    setProjectData({ ...projectData, name: e.target.value })
                  }
                  disabled={projectSaved}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="Description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="Description"
                  rows="3"
                  value={projectData.description}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      description: e.target.value,
                    })
                  }
                  disabled={projectSaved}
                ></textarea>
              </div>
              <div className="col-6">
                <label htmlFor="Start_Date" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="Start_Date"
                  placeholder="DD/MM/YYYY"
                  value={projectData.startDate}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      startDate: e.target.value,
                    })
                  }
                  disabled={projectSaved}
                />
              </div>
              <div className="col-6">
                <label htmlFor="End_Date" className="form-label">
                  End Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="End_Date"
                  placeholder="DD/MM/YYYY"
                  value={projectData.endDate}
                  onChange={(e) =>
                    setProjectData({ ...projectData, endDate: e.target.value })
                  }
                  disabled={projectSaved}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="Owner_Email" className="form-label">
                  Owner
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="Owner_Email"
                  placeholder="email@.com"
                  value={projectData.owner}
                  onChange={(e) => {
                    setProjectData({ ...projectData, owner: e.target.value });
                    setShowEmail(true);
                  }}
                  disabled={projectSaved}
                />
                <ul>
                  {showEmail &&
                    usersEmail.map((user, index) => (
                      <input
                        type="email"
                        key={index}
                        value={user.email}
                        onClick={handleEmailClick}
                      ></input>
                    ))}
                </ul>
              </div>
              <div className="col-md-6">
                <label htmlFor="Status" className="form-label">
                  Status
                </label>
                <select
                  id="Status"
                  className="form-select"
                  value={projectData.status}
                  onChange={(e) =>
                    setProjectData({ ...projectData, status: e.target.value })
                  }
                  disabled={projectSaved}
                >
                  <option value="" selected>
                    Choose...
                  </option>
                  <option value="Inprogress">Inprogress</option>
                  <option value="Pending">Pending</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </form>
            <Link
              onClick={handleSubmit}
              to="/user"
              className={`btn btn-success mb-3 ${projectSaved && "disabled"}`}
            >
              Save
            </Link>
            {(!isProjectSaved || areMilestonesAdded) && (
              <Link
                onClick={handleOnBack}
                to="/user"
                className={`btn btn-warning mb-3 ms-5 ${
                  projectSaved && "disabled"
                }`}
              >
                Back
              </Link>
            )}
          </div>
        </div>
        {showMilestones && (
          <MilestonesModal
            show={showMilestones}
            onHide={() => {
              setShowMilestones(false);
            }}
            setSelectedMilestones={setSelectedMilestones}
            selectedMilestones={selectedMilestones}
          />
        )}
        <div className="w-75 rounded bg-light border shadow p-4 ">
          <div className="d-flex">
            <div className="container-fluid ">
              <h4>Add Project Milestones</h4>
            </div>
            <div>
              <button
                className={`btn btn-primary ${
                  areMilestonesAdded && "disabled"
                }`}
                onClick={(e) => handleShow(e)}
                disabled={areMilestonesAdded}
              >
                Add
              </button>
            </div>
          </div>
          <div>
            {selectedMilestones &&
              selectedMilestones.map((item, index) => (
                <div className="row g-3 align-items-center" key={index}>
                  <div className="col-md-4">
                    <li>{item.name}</li>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor={`dueDate-${index}`}
                        className="col-form-label"
                      >
                        Due Date
                      </label>
                      <input
                        type="date"
                        id={`dueDate-${index}`}
                        className="form-control"
                        value={item.dueDate}
                        onChange={(e) => {
                          const updatedMilestones = [...selectedMilestones];
                          updatedMilestones[index].dueDate = e.target.value;
                          setSelectedMilestones(updatedMilestones);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor={`status-${index}`}
                        className="col-form-label"
                      >
                        Status
                      </label>
                      <select
                        id={`status-${index}`}
                        className="form-select"
                        value={item.status}
                        onChange={(e) => {
                          const updatedMilestones = [...selectedMilestones];
                          updatedMilestones[index].status = e.target.value;
                          setSelectedMilestones(updatedMilestones);
                        }}
                      >
                        <option value="" selected>
                          Choose...
                        </option>
                        <option value="Inprogress">Inprogress</option>
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {selectedMilestones.length > 0 ? (
            <button className="btn btn-success" onClick={handleOnClick}>
              Save
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
