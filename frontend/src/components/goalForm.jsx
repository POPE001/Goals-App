import { useState, useContext } from "react";
import { toast } from "react-toastify";
import goalsService from "../goalsServices";
import LoadingContext from "../context/appLoadingContext";

export default function GoalForm({ token, userGoals, setUserGoals }) {
  const { setLoading } = useContext(LoadingContext);
  const [goal, setGoal] = useState("");
  const [validationErr, setvalidationErr] = useState({});

  const onSubmit = async (eve) => {
    let errors = {};
    try {
      eve.preventDefault();
      setLoading(true);
      const newGoal = await goalsService.createGoal({ goal: goal }, token);
      setvalidationErr(errors);
      setGoal("");
      setLoading(false);
      toast.success("Goal Added Successfully");
      setUserGoals([...userGoals, newGoal]);
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
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={goal}
            placeholder="Enter your Goal"
            onChange={(e) => setGoal(e.target.value)}
            required
          />
          {validationErr.goal && (
            <h4 className="error">{validationErr.goal}</h4>
          )}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}
