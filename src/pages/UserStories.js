import { useState } from 'react';
import { AddButton } from '../components/button/Buttons';
import { AddUserStories } from '../components/modal/Modals';
import './UserStories.css';

const UserStories = ({ projectData, setProjectData, storyModal, handleRemove, modalKey }) => {
  const projeto = projectData.find(project => project.key === modalKey);
  const [storyData, setStoryData] = useState('');

  const handleClick = (e) => {
    const storyElement = e.target.closest('.user-story-block');
    if (storyElement) {
      const story = storyElement.dataset.id
      setStoryData(story);
      handleRemove('userStory');
    }
  };

  return (
    <div>
      <h2 className="title">User Stories</h2>
      <div className="user-stories-grid">
        {projeto.stories.map((story, index) => (
          <div
            key={index}
            className={`user-story-block ${story.type === 'user' ? 'user-story' : 'system-story'}`}
            data-id={story.id}
            onClick={(e) => handleClick(e)}
          >
            <div className="story-content">
              <p className="story-title">{story.title}</p>
              <p className="story-id"><strong>{story.id}</strong></p>

            </div>
          </div>
        ))}
      </div>
      <AddButton 
        handleRemove={handleRemove}
        type={'userStory'}
      />
      <AddUserStories
        projectData={projectData} 
        setProjectData={setProjectData}
        storyModal={storyModal}
        handleRemove={handleRemove}
        modalKey={modalKey}
        storyData={storyData}
        setStoryData={setStoryData}
      />
    </div>
  );
}

export default UserStories;