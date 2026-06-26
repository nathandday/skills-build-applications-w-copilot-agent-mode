import { useEffect, useState } from 'react';
import { extractItems, getApiBaseUrl } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      setLoading(true);
      setError('');

      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/users/`
          : getApiBaseUrl('/api/users/');

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setUsers(extractItems(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load users.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        <p className="text-muted">People connected to the OctoFit experience.</p>

        {loading && <div className="alert alert-light">Loading users…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && users.length === 0 && (
          <div className="alert alert-info">No users were returned.</div>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="list-group">
            {users.map((user) => (
              <div key={user._id || user.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div>
                    <strong>{user.name || user.username || 'User'}</strong>
                    <div className="text-muted small">{user.email || user.role || 'No details available.'}</div>
                  </div>
                  <span className="badge bg-success-subtle text-success">{user.level || 'Member'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
