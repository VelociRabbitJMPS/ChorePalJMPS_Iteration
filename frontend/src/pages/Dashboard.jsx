import { useDispatch, useSelector } from 'react-redux';
import { fetchChores } from '../redux/choreSlice';
import { useEffect } from 'react';
import WeekView from '../components/WeekView';
import Navbar from '../components/Navbar';
import ProgressWeekly from '../utils/ProgressWeekly';

function Dashboard() {
  const dispatch = useDispatch();
  const { chores, loading, error } = useSelector((state) => state.chores);

  useEffect(() => {
    dispatch(fetchChores());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      {loading && <p>Loading chores...</p>}
      {error && <p>Error: {error}</p>}
      <WeekView chores={chores} />
      <br></br>
      <ProgressWeekly choreList={chores} />
    </div>
  );
}

export default Dashboard;
