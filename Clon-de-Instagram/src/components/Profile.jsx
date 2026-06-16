const Profile = ({ posts, setSelectedPost }) => {
  const user = {
    username: 'upvox_',
    fullName: 'Upvox',
    bio: '🐈 Amante de los felinos | React Developer | 🐾',
    followers: 1405,
    following: 320,
    profilePic: 'https://cataas.com/cat?width=150&height=150&v=user'
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-pic-container">
          <img src={user.profilePic} alt="Profile" className="profile-pic" />
        </div>
        <div className="profile-info">
          <div className="profile-top">
            <h2 className="profile-username">{user.username}</h2>
            <button className="edit-profile-btn">Editar perfil</button>
            <button className="edit-profile-btn">Ver archivo</button>
            <span style={{fontSize: '24px', cursor:'pointer'}}>⚙️</span>
          </div>
          <div className="profile-stats">
            <span><strong>{posts.length}</strong> publicaciones</span>
            <span><strong>{user.followers}</strong> seguidores</span>
            <span><strong>{user.following}</strong> seguidos</span>
          </div>
          <div className="profile-bio">
            <p style={{fontWeight: 600}}>{user.fullName}</p>
            <p className="bio">{user.bio}</p>
          </div>
        </div>
      </header>

      <div className="profile-tabs">
        <span className="active-tab">PUBLICACIONES</span>
        <span>GUARDADO</span>
        <span>ETIQUETADO</span>
      </div>

      <div className="profile-grid">
        {posts.map(post => (
          <div key={post.id} className="grid-item" onClick={() => setSelectedPost(post)}>
            <img src={post.url} alt="User post" />
            <div className="grid-overlay">
              <span>❤️ {post.likes}</span>
              <span>💬 {post.comments.length}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;