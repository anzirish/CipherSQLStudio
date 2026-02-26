import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await fetch(`${API_URL}/assignment`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setAssignments(data);
      } catch(error) {
        setError('Failed to load assignments', error);
     
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  if (loading) return <div className="loading">Loading assignments...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="assignment-list">
      <h2 className="assignment-list__title">SQL Assignments</h2>
      <div className="assignment-list__grid">
        {assignments.map((a) => (
          <div key={a._id} className="assignment-card" onClick={() => navigate(`/assignment/${a._id}`)}>
            <div className="assignment-card__header">
              <h3 className="assignment-card__title">{a.title}</h3>
              <span className={`assignment-card__difficulty assignment-card__difficulty--${a.difficulty.toLowerCase()}`}>
                {a.difficulty}
              </span>
            </div>
            <p className="assignment-card__description">{a.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
