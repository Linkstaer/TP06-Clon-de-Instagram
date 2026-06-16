import { HeartIcon, CommentIcon, MessagesIcon, BookmarkIcon, DotsIcon, VerifiedIcon, SmileIcon } from './Icons';

const PostModal = ({ post, closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <button className="close-btn" onClick={closeModal}>✕</button>
      
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-image-container">
          <img src={post.url} alt="Post detail" className="modal-image" />
        </div>
        
        <div className="modal-details">
          <div className="modal-header">
            <div className="post-header-info">
              <div className="story-ring-small">
                <div className="avatar-wrapper">
                  <img src={post.userPic} alt="avatar" />
                </div>
              </div>
              <span className="username">{post.username}</span>
              <VerifiedIcon />
            </div>
            <button className="action-btn"><DotsIcon /></button>
          </div>
          
          <div className="modal-comments">
            <div className="comment">
              <div className="avatar-wrapper" style={{width: '32px', height: '32px'}}>
                <img src={post.userPic} alt="avatar" />
              </div>
              <div className="comment-text">
                <p><strong className="username">{post.username}</strong> <VerifiedIcon /> {post.caption}</p>
                <p className="post-time" style={{marginTop: '4px'}}>5h</p>
              </div>
            </div>
            {post.comments.map((c, i) => (
              <div key={i} className="comment">
                <div className="avatar-wrapper" style={{width: '32px', height: '32px', background: '#dbdbdb'}} />
                <div className="comment-text">
                  <p><strong className="username">{c.user}</strong> {c.text}</p>
                  <p className="post-time" style={{marginTop: '4px'}}>2h</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="modal-footer">
            <div className="post-actions" style={{padding: '0 0 12px 0'}}>
              <div className="action-group">
                <button className="action-btn"><HeartIcon /></button>
                <button className="action-btn"><CommentIcon /></button>
                <button className="action-btn"><MessagesIcon /></button>
              </div>
              <button className="action-btn"><BookmarkIcon /></button>
            </div>
            <p className="likes">{post.likes ? post.likes.toLocaleString() : 741368} likes</p>
            <p className="post-time" style={{fontSize: '10px', marginTop: '4px', textTransform: 'uppercase'}}>5 hours ago</p>
            
            <div className="add-comment" style={{borderTop: '1px solid #efefef', marginTop: '16px', paddingTop: '16px'}}>
              <SmileIcon />
              <input type="text" placeholder="Add a comment..." />
              <button className="post-btn">Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;