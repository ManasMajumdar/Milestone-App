import { Button } from "react-bootstrap";

function Alerts() {
  return (
    <>
      <Button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Alerts
      </Button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                All Alerts Details
              </h5>
            </div>
            <div className="modal-body">Hello, this is an alert!</div>
            <div className="modal-footer">
              <Button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Alerts;
