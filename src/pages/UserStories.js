import { useEffect, useState } from 'react';
import { AddButton } from '../components/button/Buttons';
import { AddUserStories } from '../components/modal/Modals';
import { GenerateUserStories } from '../components/modal/Modals';
import './UserStories.css';

const UserStories = ({ userKey, users, setUsers, modal, handleRemove, projectKey }) => {
  const [projeto, setProjeto] = useState(null);
  const [storyData, setStoryData] = useState('');

  //Atualiza o projeto atual
  useEffect(() => {
    const user = users.find(user => user.key === userKey);
    setProjeto(user?.projects.find(project => project.key === projectKey) || {});
  }, [users, userKey, projectKey])

  const handleClick = (e) => {
    const storyElement = e.target.closest('.story-block');
    if (storyElement) {
      const story = storyElement.dataset.id
      setStoryData(story);
      handleRemove('userStory');
    }
  };

  if (!projeto) return null;
  return (
    <div>
      <h2 className="title">User Stories</h2>
      <div className='stories-container'>
        <div className="stories-grid">
          {projeto.stories.map((story, index) => (
            story.id.includes('US') && (
              <div
                key={index}
                className={`story-block ${story.type === 'user' ? 'user-story' : 'system-story'}`}
                data-id={story.id}
                onClick={(e) => handleClick(e)}
              >
                <div className="story-content">
                  <p className="story-title">{story.title}</p>
                  <p className="story-id"><strong>{story.id}</strong></p>
                </div>
              </div>
            )
          ))}
        </div>

        <div className="stories-grid">
          {projeto.stories.map((story, index) => (
            story.id.includes('SS') && (
              <div
                key={index}
                className={`story-block ${story.type === 'user' ? 'user-story' : 'system-story'}`}
                data-id={story.id}
                onClick={(e) => handleClick(e)}
              >
                <div className="story-content">
                  <p className="story-title">{story.title}</p>
                  <p className="story-id"><strong>{story.id}</strong></p>
                </div>
              </div>
            )
          ))}
        </div>


      </div>
      <AddButton
        handleRemove={handleRemove}
        type={'userStory'}
      />
      <AddButton
        handleRemove={handleRemove}
        type={'generateUserStories'}
      />
      <AddUserStories
        userKey={userKey}
        users={users}
        setUsers={setUsers}
        modal={modal}
        handleRemove={handleRemove}
        projectKey={projectKey}
        storyData={storyData}
        setStoryData={setStoryData}
      />
      <GenerateUserStories
        userKey={userKey}
        users={users}
        setUsers={setUsers}
        modal={modal}
        handleRemove={handleRemove}
        projectKey={projectKey}
        storyData={storyData}
        setStoryData={setStoryData}
      />
    </div>
  );
}

export default UserStories;