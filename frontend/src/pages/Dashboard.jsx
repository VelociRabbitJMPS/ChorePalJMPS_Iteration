import { useDispatch, useSelector } from 'react-redux';
import { fetchChores } from '../redux/choreSlice';
import { useEffect } from 'react';
import WeekView from '../components/WeekView';

function Dashboard() {
  const dispatch = useDispatch();
  const { chores, loading, error } = useSelector((state) => state.chores);

  useEffect(() => {
    dispatch(fetchChores());
  }, [dispatch]);

  if (loading) return <p>Loading chores...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <WeekView chores={chores} />
    </div>
  );
}

export default Dashboard;
