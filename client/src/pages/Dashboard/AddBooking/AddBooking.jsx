
import { FormRow, Alert, FormRowSelect } from "../../../components";
import { useAppContext } from "../../../context/appContext";
import Wrapper from "./DashboardFormPage.styles";


const AddBooking = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    name,
    id_no,
    applicationLocation,
    applicationType,
    applicationDate,
    applicationTypeOptions,
    applicationPreferences,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !id_no || !applicationLocation) {
      displayAlert();
      return;
    }

    if (isEditing) {
      editJob();
      return;
    }

    // else
    createJob();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // updating their values in the context
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit your information" : "Book your passport."} </h3>

        {showAlert && <Alert />}

        {/* position */}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="id_no"
            value={id_no}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type="text"
            labelText="Your location"
            name="applicationLocation"
            value={applicationLocation}
            handleChange={handleJobInput}
          />
          {/* application status */}
          <FormRowSelect
            name="ApplicantionPreferences"
            labelText="Booking preferences"
            value={applicationPreferences}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* application type */}
          <FormRowSelect
            name="applicationType"
            labelText="Passport type"
            value={applicationType}
            handleChange={handleJobInput}
            list={applicationTypeOptions}
          />

          {/* booking date */}
          <input
            name="applicationType"
            labelText="Booking date"
            value={applicationDate}
            type="date"
            handleChange={handleJobInput}
          />

          {/* ----------------BUTTONS---------------- */}
          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            {/* submit button */}
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault(); // to prevent submitting the form from this button (refreshing the page)
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddBooking;
