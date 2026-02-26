import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SQLEditor from './SQLEditor';
import ResultsTable from './ResultsTable';
import SampleDataViewer from './SampleDataViewer';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AssignmentAttempt = () => {
  const { id } = useParams();
  const [data, setData] = useState({ assignment: null, sampleData: {}, loading: true });
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [hint, setHint] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState({ execute: false, hint: false });

  useEffect(() => {
  const fetchAssignment = async () => {
    try {
      const res = await fetch(`${API_URL}/assignment/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();

      setData({
        ...data,
        loading: false,
      });
    } catch  {
      setData({
        assignment: null,
        sampleData: {},
        loading: false,
      });
    }
  };

  fetchAssignment();
}, [id]);

  const executeQuery = async () => {
    if (!query.trim()) return setError('Please enter a query');
    
    setLoading(prev => ({ ...prev, execute: true }));
    setError('');
    setResults(null);

    try {
      const res = await fetch(`${API_URL}/query/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, assignmentId: id }),
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setResults(data);
      } else {
        setError(data.error || 'query failed');
      }
    } catch {
      setError('Query execution failed');
    } finally {
      setLoading(prev => ({ ...prev, execute: false }));
    }
  };

  const getHint = async () => {
    setLoading(prev => ({ ...prev, hint: true }));
    setHint('');
    setError('');

    try {
      const res = await fetch(`${API_URL}/hints/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: data.assignment.question,
          userQuery: query,
          schema: data.assignment.expectedSchema,
        }),
      });
      const result = await res.json();
      
      if (res.ok && result.hint) {
        setHint(result.hint);
      } else {
        setError(result.error || 'Failed to generate hint');
      }
    } catch {
      setError('Failed to generate hint');
    } finally {
      setLoading(prev => ({ ...prev, hint: false }));
    }
  };

  if (data.loading) return <div className="loading">Loading...</div>;
  if (!data.assignment) return <div className="error">Assignment not found</div>;

  return (
    <div className="assignment-attempt">
      <div className="assignment-attempt__question">
        <h2 className="assignment-attempt__title">{data.assignment.title}</h2>
        <p className="assignment-attempt__description">{data.assignment.question}</p>
        <button className="assignment-attempt__hint-btn" onClick={getHint} disabled={loading.hint}>
          {loading.hint ? 'Getting hint...' : 'Get Hint'}
        </button>
        {hint && (
          <div className="assignment-attempt__hint">Hint: {hint}</div>
        )}
      </div>

      <SampleDataViewer data={data.sampleData} />

      <div className="assignment-attempt__editor">
        <h3>SQL Editor</h3>
        <SQLEditor value={query} onChange={setQuery} />
        <button className="assignment-attempt__execute-btn" onClick={executeQuery} disabled={loading.execute}>
          {loading.execute ? 'Executing...' : 'Execute Query'}
        </button>
      </div>

      {error && <div className="assignment-attempt__error">{error}</div>}
      {results && <ResultsTable results={results} />}
    </div>
  );
};