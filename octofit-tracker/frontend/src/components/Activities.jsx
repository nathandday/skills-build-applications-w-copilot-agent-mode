import { useEffect, useState } from 'react';
import { extractItems, getApiBaseUrl } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadActivities = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(getApiBaseUrl('https://urban-orbit-vjvxxq77gjp3x969-8000.github.dev/api/activities/'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setActivities(extractItems(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load activities.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        <p className="text-muted">
          Recent activity updates from the backend API.
        </p>

        {loading && <div className="alert alert-light">Loading activities…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && activities.length === 0 && (
          <div className="alert alert-info">No activities were returned.</div>
        )}

        {!loading && !error && activities.length > 0 && (
          <div className="list-group">
            {activities.map((activity) => (
              <div key={activity._id || activity.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div>
                    <strong>{activity.type || activity.name || 'Activity'}</strong>
                    <div className="text-muted small">
                      {activity.description || activity.notes || 'No description available.'}
                    </div>
                  </div>
                  <span className="badge bg-primary-subtle text-primary">
                    {activity.duration || activity.minutes || '—'}
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

export default Activities;
