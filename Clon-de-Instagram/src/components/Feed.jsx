import Post from './Post';
import Stories from './Stories';

const Feed = ({ posts, setSelectedPost }) => {
  return (
    <div className="feed-container">
      <div className="feed-left">
        <Stories />
        <div className="posts-feed">
          {posts.map(post => (
            <Post key={post.id} post={post} onOpenModal={() => setSelectedPost(post)} />
          ))}
        </div>
      </div>
      
      <div className="suggestions-sidebar">
        <div className="suggestions-header">
          <div className="user-mini-profile">
            <div className="avatar-wrapper" style={{ width: '56px', height: '56px' }}>
              <img src="https://cataas.com/cat?width=150&height=150&v=user" alt="User" />
            </div>
            <div className="mini-profile-text">
              <span className="mini-username">upvox_</span>
              <span className="mini-fullname">Upvox</span>
            </div>
          </div>
          <button className="switch-btn">Switch</button>
        </div>
        
        <div className="suggestions-list-header">
          <span className="sug-title">Suggestions for you</span>
          <button className="sug-see-all">See All</button>
        </div>

        <div className="suggestions-list">
          {posts.slice(0, 5).map((post, index) => (
            <div key={`sug-${post.id}`} className="suggestion-item">
              <div className="sug-user">
                <div className="avatar-wrapper" style={{ width: '32px', height: '32px' }}>
                  <img src={post.userPic} alt="sug-avatar" />
                </div>
                <div className="sug-info">
                  <span className="sug-username">amigo_gato_{index + 1}</span>
                  <span className="sug-followed">Follows you</span>
                </div>
              </div>
              <button className="follow-btn">Follow</button>
            </div>
          ))}
        </div>
        
        <div className="footer-links">
          <p>About • Help • Press • API • Jobs • Privacy • Terms • Locations • Language • Meta Verified</p>
          <p className="copyright">© 2023 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  );
};

export default Feed;