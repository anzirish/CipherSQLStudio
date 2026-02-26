import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AssignmentAttempt } from './components/AssignmentAttempt.jsx';
import { AssignmentList } from './components/AssignmentList.jsx';
import { Auth } from './components/Auth.jsx';
import { Navbar } from './components/Navbar.jsx';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="app__main">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<AssignmentList />} />
            <Route path="/assignment/:id" element={<AssignmentAttempt />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
