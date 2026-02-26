const ResultsTable = ({ results }) => {
  if (!results || !results.rows || results.rows.length === 0) {
    return <div className="results-table__empty">No results to display yet</div>;
  }

  const columns = results.fields || Object.keys(results.rows[0]);

  return (
    <div className="results-table">
      <h3 className="results-table__title">
        Results ({results.rowCount} row{results.rowCount !== 1 ? 's' : ''})
      </h3>
      <div className="results-table__wrapper">
        <table className="results-table__table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx}>{row[col] !== null ? String(row[col]) : 'NULL'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable