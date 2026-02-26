import { useState } from 'react';

const SampleDataViewer = ({ data }) => {
  const tables = Object.keys(data);
  const [selected, setSelected] = useState(tables[0] || '');

  if (!tables.length) return <div className="sample-data__empty">No sample data available</div>;

  const rows = data[selected] || [];
  const cols = rows.length ? Object.keys(rows[0]) : [];

  return (
    <div className="sample-data">
      <h3 className="sample-data__title">Sample Data</h3>
      <div className="sample-data__tabs">
        {tables.map((t) => (
          <button
            key={t}
            className={`sample-data__tab ${selected === t ? 'sample-data__tab--active' : ''}`}
            onClick={() => setSelected(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="sample-data__content">
        {rows.length ? (
          <table className="sample-data__table">
            <thead>
              <tr>
                {cols.map((c, i) => <th key={i}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {cols.map((c, j) => <td key={j}>{row[c] ?? 'NULL'}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data in this table</p>
        )}
      </div>
    </div>
  );
};

export default SampleDataViewer;