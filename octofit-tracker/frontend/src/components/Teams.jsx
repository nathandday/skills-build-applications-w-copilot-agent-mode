import { useEffect, useState } from 'react';
import { extractItems, getApiBaseUrl } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadTeams = async () => {
      setLoading(true);
      setError('');

      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
          : getApiBaseUrl('/api/teams/');

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setTeams(extractItems(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load teams.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        <p className="text-muted">Collaborative groups and their current focus.</p>

        {loading && <div className="alert alert-light">Loading teams…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && teams.length === 0 && (
          <div className="alert alert-info">No teams were returned.</div>
        )}

        {!loading && !error && teams.length > 0 && (
          <div className="list-group">
            {teams.map((team) => (
              <div key={team._id || team.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div>
                    <strong>{team.name || 'Team'}</strong>
                    <div className="text-muted small">
                      {team.description || team.motto || 'No description available.'}
                    </div>
                  </div>
                  <span className="badge bg-info-subtle text-info">{team.members?.length || 0} members</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
