import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMilestonesById, updatedMilestones } from "../Redux/milestoneSlice";
import { getProjectById, updateProject } from "../Redux/projectSlice";
import { MilestonesModal } from "../Modal/MilestonesModal";
import "../Custom.css";

const UpdateProjectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const project = useSelector((state) => state.projects.project);
  const milestones = useSelector((state) => state.milestones.milestones);
  const [showMilestones, setShowMilestones] = useState(false);
  const [selectedMilestones, setSelectedMilestones] = useState([]);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    owner: "",
    status: "",
  });

  const [milestoneData, setMilestoneData] = useState([]);

  useEffect(() => {
    dispatch(getProjectById(id));
    dispatch(getMilestonesById(id));
  }, []);

  const [dueDateChanged, setDueDateChanged] = useState(
    Array(milestones.length).fill(false)
  );
  // const [setStatusChanged]=useState(Array(milestones.length).fill(false));

  useEffect(() => {
    setProjectData({
      name: project[0]?.name || "",
      description: project[0]?.description || "",
      startDate: project[0]?.startDate || "",
      endDate: project[0]?.endDate || "",
      owner: project[0]?.owner || "",
      status: project[0]?.status || "",
    });
  }, [project]);

  useEffect(() => {
    setMilestoneData(
      milestones.map((milestone) => ({
        id: milestone.id,
        dueDate: milestone.dueDate,
        dueDateReason: milestone.dueDateReason,
        status: milestone.status,
      }))
    );
    setDueDateChanged(Array(milestones.length).fill(false));
  }, [milestones]);

  function handleUpdate(e) {
    e.preventDefault();
    dispatch(updatedMilestones({ id, milestoneData }));
    alert("Milestone updated Successfully!");
    navigate("/user-page");
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateProject({ id, projectData }));
    alert("Project updated Successfully!");
  }

  function handleOnClick(e) {
    e.preventDefault();
    navigate("/user-page");
  }

  function addButton(e) {
    e.preventDefault();
    setShowMilestones(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const areProjectFieldsValid =
      projectData.name &&
      projectData.startDate &&
      projectData.endDate &&
      projectData.status &&
      projectData.owner !== null;

    const isEndDateValid =
      new Date(projectData.endDate) >= new Date(projectData.startDate);

    if (!areProjectFieldsValid) {
      alert("Please fill in all project fields");
      return;
    }

    if (!isEndDateValid) {
      alert("End date must be greater than or equal to start date");
      return;
    }
    dispatch(updateProject({ id, projectData }));
    alert("Project updated Successfully!");
  }

  function handleUpdate(e) {
    e.preventDefault();

    const isValidMilestoneDate = milestoneData.every((item) => {
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

    dispatch(updatedMilestones({ id, milestoneData }));
    alert("Milestone updated Successfully!");
    navigate("/user-page");
  }

  return (
    <div className="tree">
      <div className="d-flex align-items-center flex-column">
        <h1 className="mb-4">Update Project</h1>
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
                />
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
              to="/user-page"
              className="btn btn-success mb-3 me-5"
            >
              Save
            </Link>
            <Link
              onClick={handleOnClick}
              to="/user-page"
              className="btn btn-warning mb-3"
            >
              back
            </Link>
          </div>
        </div>
        <div className="w-75 rounded bg-light border shadow p-4">
          <div className="container-fluid mb-4">
            <h4>Update Project Milestones</h4>
          </div>

          {milestones.length > 0 ? (
            <>
              {milestones.map((value, index) => (
                <div key={index} className="d-flex justify-content-between">
                  <div>{value.name}</div>

                  <select
                    id={`status-${index}`}
                    className="form-select ms-5 mb-2 w-25"
                    value={
                      milestoneData[index]?.status || milestones[index].status
                    }
                    onChange={(e) => {
                      const updatedMilestoneData = [...milestoneData];
                      updatedMilestoneData[index] = {
                        ...updatedMilestoneData[index],
                        id: milestones[index].id,
                        status: e.target.value,
                      };
                      setMilestoneData(updatedMilestoneData);
                      if (e.target.value === "Inprogress") {
                        const updatedMilestones = milestones.map(
                          (milestone, i) => {
                            if (i !== index) {
                              return { ...milestone, status: "Pending" };
                            }
                            return milestone;
                          }
                        );
                        dispatch(
                          updatedMilestones({
                            id,
                            milestoneData: updatedMilestones,
                          })
                        );
                      } else {
                        dispatch(
                          updatedMilestones({
                            id,
                            milestoneData: updatedMilestoneData,
                          })
                        );
                      }
                    }}
                  >
                    <option value="Inprogress">Inprogress</option>
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                  </select>
                  <input
                    type="date"
                    className="form-control ms-5 mb-2 w-25"
                    value={
                      milestoneData[index]?.dueDate || milestones[index].dueDate
                    }
                    onChange={(e) => {
                      const updatedMilestoneData = [...milestoneData];
                      updatedMilestoneData[index] = {
                        ...updatedMilestoneData[index],
                        id: milestones[index].id,
                        dueDate: e.target.value,
                      };
                      setMilestoneData(updatedMilestoneData);
                      setDueDateChanged((prev) => {
                        const newDueDateChanged = [...prev];
                        newDueDateChanged[index] = true;
                        return newDueDateChanged;
                      });
                    }}
                  />
                  <input
                    type="text"
                    className="form-control ms-4 mb-2 w-25"
                    value={
                      milestoneData[index]?.dueDateReason ||
                      milestones[index].dueDateReason
                    }
                    onChange={(e) => {
                      const updatedMilestoneData = [...milestoneData];
                      updatedMilestoneData[index] = {
                        ...updatedMilestoneData[index],
                        id: milestones[index].id,
                        dueDateReason: e.target.value,
                      };
                      setMilestoneData(updatedMilestoneData);
                    }}
                    disabled={!dueDateChanged[index]}
                  />
                </div>
              ))}
            </>
          ) : null}
          <Link onClick={handleUpdate} className="btn btn-success mb-3 mt-3">
            Update
          </Link>
          {showMilestones && (
            <MilestonesModal
              show={showMilestones}
              onHide={() => {
                setShowMilestones(false);
              }}
            />
          )}
          {/* <button className="btn btn-primary ms-5" onClick={(e) => addButton(e)}>
          Add
        </button> */}
          <div>
            {selectedMilestones &&
              selectedMilestones.map((item, index) => (
                <div className="row g-3 align-items-center" key={index}>
                  <div className="col-6">
                    <li>{item.name}</li>
                  </div>
                  <div className="col-auto">
                    <label
                      htmlFor={`dueDate-${index}`}
                      className="col-form-label"
                    >
                      Due Date
                    </label>
                  </div>
                  <div className="col-auto">
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
};

export default UpdateProjectPage;
