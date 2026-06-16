const Header = ({ setView }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo" onClick={() => setView('feed')}>
          📷 Instagram
        </h1>
        <nav className="nav-icons">
          <button onClick={() => setView('feed')} style={{ fontSize: '24px' }}>🏠</button>
          <button onClick={() => setView('profile')} style={{ fontSize: '24px' }}>👤</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;