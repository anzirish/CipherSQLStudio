import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div onClick={() => navigate('/')}>
          <span className="navbar__title">CipherSQLStudio</span>
        </div>

        <div className="navbar__user">
          {user ? (
            <>
              <span className="navbar__username">{user.name}</span>
              <button onClick={handleLogout} className="navbar__button">Logout</button>
            </>
          ) : (
            <>
              <span className="navbar__guest">Guest</span>
              <button onClick={() => navigate('/auth')} className="navbar__button">Login</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};