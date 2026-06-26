import { useEffect, useState } from 'react';
import { extractItems, getApiBaseUrl } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadWorkouts = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(getApiBaseUrl('/api/workouts/'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setWorkouts(extractItems(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load workouts.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        <p className="text-muted">Suggested routines and planned sessions.</p>

        {loading && <div className="alert alert-light">Loading workouts…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && workouts.length === 0 && (
          <div className="alert alert-info">No workouts were returned.</div>
        )}

        {!loading && !error && workouts.length > 0 && (
          <div className="list-group">
            {workouts.map((workout) => (
              <div key={workout._id || workout.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div>
                    <strong>{workout.name || workout.title || 'Workout'}</strong>
                    <div className="text-muted small">
                      {workout.description || workout.focus || 'No details available.'}
                    </div>
                  </div>
                  <span className="badge bg-warning-subtle text-warning">
                    {workout.duration || workout.minutes || '—'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
