import { useState, useEffect, useContext } from "react";
import GoalForm from "../components/goalForm";
import goalsService from "../goalsServices";
import { toast } from "react-toastify";
import GoalItem from "../components/goalItem";
import UpdatePopup from "../components/updatePopup";
import UserContext from "../context/userContext";
import LoadingContext from "../context/appLoadingContext";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const { token, name } = user;
  const [userGoals, setUserGoals] = useState([]);
  const [isPopup, setIspopup] = useState(false);
  const [targetGoal, setTargetGoal] = useState(null);

  useEffect(() => {
    if (token) {
      const fetchUserGoals = async () => {
        try {
          setLoading(true);
          const goals = await goalsService.getGoals(token);
          setLoading(false);
          setUserGoals(goals);
        } catch (err) {
          setLoading(false);
          toast.error(err.msg);
        }
      };
      fetchUserGoals();
    } else {
      setUserGoals([]);
    }
  }, [token, setLoading]);

  //Delete Goal Logic
  const deleteGoal = async (goalId) => {
    try {
      setLoading(true);
      await goalsService.deleteGoal(goalId, token);
      setLoading(false);
      const newUserGoals = userGoals.filter((goal) => {
        return goal._id !== goalId;
      });
      setUserGoals(newUserGoals);
      toast.success("Goal Deleted Successfully");
    } catch (err) {
      setLoading(false);
      toast.error(err.msg);
    }
  };

  //open popup
  const togglePopup = (goalIndex) => {
    setIspopup(!isPopup);
    setTargetGoal(goalIndex);
  };

  return (
    <>
      {user ? (
        <>
          <section className="heading">
            <h4>
              Welcome {name.charAt(0).toUpperCase() + name.slice(1)}, Start
              Setting Your Goals
            </h4>
          </section>
          <GoalForm
            token={token}
            userGoals={userGoals}
            setUserGoals={setUserGoals}
          />
          <section className="content">
            {userGoals.length ? (
              <div className="goals">
                {userGoals.map((goal, index) => (
                  <GoalItem
                    key={goal._id}
                    goal={goal}
                    deleteGoal={deleteGoal}
                    togglePopup={togglePopup}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              !loading && <h3>You have not set any goals</h3>
            )}
          </section>
          {isPopup && (
            <UpdatePopup
              togglePopup={togglePopup}
              userGoals={userGoals}
              setUserGoals={setUserGoals}
              targetGoal={targetGoal}
              token={token}
            />
          )}
        </>
      ) : (
        <h2>Please Login or Register to Start Setting Goals</h2>
      )}
    </>
  );
}
