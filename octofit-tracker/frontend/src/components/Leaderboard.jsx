import { useEffect, useState } from 'react';
import { extractItems, getApiBaseUrl } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadLeaderboard = async () => {
      setLoading(true);
      setError('');

      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
          : getApiBaseUrl('/api/leaderboard/');

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setEntries(extractItems(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        <p className="text-muted">Competitive standings from the backend.</p>

        {loading && <div className="alert alert-light">Loading leaderboard…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && entries.length === 0 && (
          <div className="alert alert-info">No leaderboard entries were returned.</div>
        )}

        {!loading && !error && entries.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id || entry.id}>
                    <td>{entry.rank || '—'}</td>
                    <td>{entry.name || entry.userName || 'Unknown'}</td>
                    <td>{entry.score || entry.points || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
