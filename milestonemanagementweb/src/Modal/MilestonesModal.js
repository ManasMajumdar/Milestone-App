import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getMilestones } from "../Redux/milestoneSlice";
import "../Custom.css";

export const MilestonesModal = (props) => {
  const milestonesData = useSelector((state) => state.milestones.milestones);
  const [tempMilestones, setTempMilestones] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMilestones());
    setTempMilestones(props.selectedMilestones);
  }, [dispatch, props.selectedMilestones]);

  function handleSaveButton() {
    props.onHide();
    props.setSelectedMilestones(tempMilestones);
  }

  function handleOnChange(milestone) {
    const dueDate = "";
    const name = milestone;

    const isMilestoneSelected = tempMilestones.some(
      (item) => item.name === milestone
    );

    const updatedMilestones = isMilestoneSelected
      ? tempMilestones.filter((item) => item.name !== milestone)
      : [...tempMilestones, { name, dueDate }];

    setTempMilestones(updatedMilestones);
  }

  return (
    <div className="tree">
      <div>
        <Modal centered show={props.show} onHide={props.onHide}>
          <Modal.Header>
            <Modal.Title>Add Milestones</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul className="list-group list-group-flush">
              {milestonesData.map((milestone, index) => (
                <li key={index} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <label
                      className="form-check-label"
                      htmlFor={`flexCheckDefault-${index}`}
                    >
                      {milestone}
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id={`flexCheckDefault-${index}`}
                      onChange={() => handleOnChange(milestone)}
                      checked={tempMilestones.some(
                        (item) => item.name === milestone
                      )}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" onClick={handleSaveButton}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
