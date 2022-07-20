import { useState, useContext } from "react";
import { toast } from "react-toastify";
import goalsService from "../goalsServices";
import LoadingContext from "../context/appLoadingContext";

export default function UpdatePopup({
  togglePopup,
  userGoals,
  setUserGoals,
  targetGoal,
  token,
}) {
  const { setLoading } = useContext(LoadingContext);
  const [newGoal, setNewGoal] = useState(userGoals[targetGoal].text);
  const [validationErr, setvalidationErr] = useState({});

  const onSubmit = async (eve) => {
    let errors = {};
    try {
      eve.preventDefault();
      setLoading(true);
      await goalsService.updateGoal(
        { goal: newGoal },
        userGoals[targetGoal]._id,
        token
      );
      setNewGoal("");
      setvalidationErr(errors);
      setLoading(false);
      togglePopup(null);
      toast.success("Goal Updated Successfully");
      let updatedGoals = [...userGoals];
      updatedGoals[targetGoal].text = newGoal;
      setUserGoals(updatedGoals);
    } catch (err) {
      setLoading(false);
      if (Array.isArray(err)) {
        for (const eachErr of err) {
          errors[eachErr.param] = eachErr.msg;
        }
      } else {
        toast.error(err.msg);
      }
      setvalidationErr(errors);
    }
  };

  return (
    <div className="popup-box">
      <div className="box">
        <button className="close-icon" onClick={() => togglePopup(null)}>
          x
        </button>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={newGoal}
                placeholder="Enter your Goal"
                onChange={(e) => setNewGoal(e.target.value)}
                required
              />
              {validationErr.goal && (
                <h4 className="error">{validationErr.goal}</h4>
              )}
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Update Goal
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
