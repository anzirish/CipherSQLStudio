import Editor from '@monaco-editor/react';

const SQLEditor = ({ value, onChange }) => {
  return (
    <div className="sql-editor">
      <Editor
        height="200px"
        defaultLanguage="sql"
        value={value}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default SQLEditor;