import React from 'react';
import { AddButton } from '../components/button/Buttons';
import { AddUserStories } from '../components/modal/Modals';
import './UserStories.css'; // Certifique-se de criar este arquivo CSS para estilização

const UserStories = ({ projectData, setProjectData, storyModal, handleRemove, modalKey }) => {
  const projeto = projectData.find(project => project.key === modalKey);

  return (
    <div>
      <h2 className="title">User Stories</h2>
      <div className="user-stories-grid">
        {projeto.userStory.map((story, index) => (
          <div
            key={index}
            className={`user-story-block ${story.type === 'user' ? 'user-story' : 'system-story'}`}
            dataset-id={story.id}
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
      />
    </div>
  );
}

export default UserStories;