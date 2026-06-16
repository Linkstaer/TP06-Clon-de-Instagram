import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Profile from './components/Profile';
import PostModal from './components/PostModal';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState('feed'); 
  const [selectedPost, setSelectedPost] = useState(null);

useEffect(() => {
    axios.get('https://api.thecatapi.com/v1/images/search?limit=10')
      .then(response => {
        const catData = response.data.map((cat, index) => ({
          id: cat.id,
          url: cat.url,
          username: `cat_lover_${index + 1}`,
          userPic: cat.url,
          likes: Math.floor(Math.random() * 500),
          caption: 'Miau miau 🐾 #catsofinstagram',
          date: '2h',
          comments: [
            { user: 'gato_ninja', text: '¡Qué lindo!' },
            { user: 'michis_club', text: 'Hermoso gatito ❤️' }
          ]
        }));
        setPosts(catData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

return (
    <div className="app-container">
      <Sidebar setView={setView} />
      
      <main className="main-content">
         {view === 'feed' ? (
           <Feed posts={posts} setSelectedPost={setSelectedPost} />
         ) : (
           <Profile posts={posts} setSelectedPost={setSelectedPost} />
         )}
      </main>

      {selectedPost && (
        <PostModal post={selectedPost} closeModal={() => setSelectedPost(null)} />
      )}
    </div>
  );
}

export default App;