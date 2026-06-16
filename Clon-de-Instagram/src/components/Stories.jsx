const Stories = () => {
  const stories = [
    { id: 1, user: 'itsdougthepu', img: 'https://cataas.com/cat?width=150&height=150&v=1' },
    { id: 2, user: 'openaidalle', img: 'https://cataas.com/cat?width=150&height=150&v=2' },
    { id: 3, user: 'lewishamilton', img: 'https://cataas.com/cat?width=150&height=150&v=3' },
    { id: 4, user: 'wahab.xyz', img: 'https://cataas.com/cat?width=150&height=150&v=4' },
    { id: 5, user: 'defavours', img: 'https://cataas.com/cat?width=150&height=150&v=5' },
    { id: 6, user: 'mkbhd', img: 'https://cataas.com/cat?width=150&height=150&v=6' },
  ];

  return (
    <div className="stories-container">
      {stories.map(story => (
        <div key={story.id} className="story">
          <div className="story-ring">
            <div className="avatar-wrapper">
              <img src={story.img} alt={story.user} />
            </div>
          </div>
          <span className="story-user">{story.user}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories; 