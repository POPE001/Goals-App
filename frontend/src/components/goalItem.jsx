import { FaTrash, FaEdit } from "react-icons/fa";

export default function GoalItem({ goal, deleteGoal, togglePopup, index }) {
  return (
    <div className="goal">
      <h2>{goal.text}</h2>
      <div className="icon-box">
        <button
          className="icon"
          title="Edit"
          onClick={() => togglePopup(index)}
        >
          <FaEdit />
        </button>
        <button
          onClick={() => deleteGoal(goal._id)}
          className="icon"
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
