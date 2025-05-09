import { useDispatch, useSelector } from 'react-redux';
import { fetchChores } from '../redux/choreSlice';
import { useEffect, useState } from 'react';
import WeekView from '../components/WeekView';
import Navbar from '../components/Navbar';
import ProgressWeekly from '../utils/ProgressWeekly';

function Dashboard() {
  const dispatch = useDispatch();
  //Current chores are loaded from Redux store
  const { chores, loading, error } = useSelector((state) => state.chores);
  const [lowestUser, setLowestUser] = useState(null);

  //when the component mounts, it dispatches fetchChores(), which populates the Redux store with chore data
  useEffect(() => {
    dispatch(fetchChores());
  }, [dispatch]);

  useEffect(() => {
    if (!chores || chores.length === 0) {
      setLowestUser(null);
      return;
    }

    const worseChild = (choreList) => {
      console.log('choreList', choreList);
      // Step 1: Group chores by child name
      const choresByChild = {};
      for (let i = 0; i < choreList.length; i++) {
        const chore = choreList[i];
        const childName = chore.childName?.trim();
        if (!childName) continue;

        if (!choresByChild[childName]) {
          choresByChild[childName] = [];
        }
        choresByChild[childName].push(chore);
      }
      console.log('choresByChild', choresByChild);
      // Step 2: Find the child with the fewest completed chores

      let worstChild = null;
      let fewestCompletedPercentage = 100;
      for (const child in choresByChild) {
        const childChores = choresByChild[child];
        let completedCount = 0;
        let totalChores = childChores.length;
        for (let i = 0; i < childChores.length; i++) {
          if (childChores[i].status === 'Completed') {
            completedCount++;
          }
        }
        let percentageOfChoresCompleted = Math.floor(
          (completedCount / totalChores) * 100
        );

        if (percentageOfChoresCompleted < fewestCompletedPercentage) {
          fewestCompletedPercentage = percentageOfChoresCompleted;
          worstChild = child;
        }
      }
      setLowestUser(worstChild);
    };

    worseChild(chores);
  }, [chores]);

  return (
    <div>
      <Navbar wantedUser={lowestUser} />
      {loading && <p>Loading chores...</p>}
      {error && <p>Error: {error}</p>}
      <WeekView chores={chores} />
      <br />
      <ProgressWeekly choreList={chores} />
    </div>
  );
}

export default Dashboard;
