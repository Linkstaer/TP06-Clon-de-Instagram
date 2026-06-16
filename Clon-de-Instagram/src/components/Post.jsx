import { useState } from 'react';
import { HeartIcon, CommentIcon, MessagesIcon, BookmarkIcon, DotsIcon, VerifiedIcon, SmileIcon, ChevronLeft, ChevronRight } from './Icons';

const Post = ({ post, onOpenModal }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 741368);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <article className="post">
      <div className="post-header">
        <div className="post-header-info">
          <div className="story-ring-small">
            <div className="avatar-wrapper">
              <img src={post.userPic} alt="avatar" />
            </div>
          </div>
          <span className="username">{post.username}</span>
          <VerifiedIcon />
          <span className="post-time">• 5h</span>
        </div>
        <button className="action-btn"><DotsIcon /></button>
      </div>
      
      <div className="post-image-container" onClick={onOpenModal}>
        <img src={post.url} alt="Post" className="post-image" />
        <button className="carousel-btn left" onClick={(e) => e.stopPropagation()}>
          <ChevronLeft />
        </button>
        <button className="carousel-btn right" onClick={(e) => e.stopPropagation()}>
          <ChevronRight />
        </button>
        <div className="carousel-dots">
          <div className="dot active"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
      
      <div className="post-actions">
        <div className="action-group">
          <button onClick={handleLike} className="action-btn">
            {liked ? <HeartIcon filled /> : <HeartIcon />}
          </button>
          <button className="action-btn" onClick={onOpenModal}><CommentIcon /></button>
          <button className="action-btn"><MessagesIcon /></button>
        </div>
        <button className="action-btn"><BookmarkIcon /></button>
      </div>
      
      <div className="post-info">
        <p className="likes">{likesCount.toLocaleString()} likes</p>
        <div className="caption">
          <span className="username">{post.username}</span> {post.caption}
        </div>
        <p className="translation">See translation</p>
        <p className="view-comments" onClick={onOpenModal}>View all 13,384 comments</p>
        <div className="add-comment">
          <input type="text" placeholder="Add a comment..." />
          <SmileIcon />
        </div>
      </div>
    </article>
  );
};

export default Post;