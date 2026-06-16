import { HomeIcon, SearchIcon, ExploreIcon, ReelsIcon, MessagesIcon, HeartIcon, CreateIcon, MenuIcon } from './Icons';

const Sidebar = ({ setView }) => {
  return (
    <nav className="sidebar">
      <div className="sidebar-logo" onClick={() => setView('feed')}>
        <h2 className="instagram-logo">Instagram</h2>
      </div>
      <div className="sidebar-links">
        <button onClick={() => setView('feed')} className="sidebar-btn active">
          <HomeIcon /> <span>Home</span>
        </button>
        <button className="sidebar-btn"><SearchIcon /> <span>Search</span></button>
        <button className="sidebar-btn"><ExploreIcon /> <span>Explore</span></button>
        <button className="sidebar-btn"><ReelsIcon /> <span>Reels</span></button>
        <button className="sidebar-btn"><MessagesIcon /> <span>Messages</span></button>
        <button className="sidebar-btn"><HeartIcon /> <span>Notifications</span></button>
        <button className="sidebar-btn"><CreateIcon /> <span>Create</span></button>
        <button onClick={() => setView('profile')} className="sidebar-btn">
          <div className="avatar-wrapper sidebar-avatar-wrapper">
            <img src="https://cataas.com/cat?width=150&height=150&v=user" alt="Profile" />
          </div>
          <span>Profile</span>
        </button>
      </div>
      <div className="sidebar-footer">
        <button className="sidebar-btn"><MenuIcon /> <span>More</span></button>
      </div>
    </nav>
  );
};

export default Sidebar;