import { useState } from 'react';
import { AddButton } from '../components/button/Buttons';
import { AddUserStories } from '../components/modal/Modals';
import './UserStories.css';

const GoalSketch = ({ userData, setUserData, userKey, users, setUsers, modal, handleRemove, projectKey }) => {
  const projeto = userData.projects?.find(project => project.key === projectKey);
  const [storyData, setStoryData] = useState('');

  const handleClick = (e) => {
    const storyElement = e.target.closest('.goal-block');
    if (storyElement) {
      const story = storyElement.dataset.id
      setStoryData(story);
      handleRemove('userStory');
    }
  };

  if (!projeto) return null
  return (
    <div>
      <h2 className="title">Goal Sketch</h2>
      
      <div className='goals-container'>
        <div className="goals-grid">
          {projeto.goalSketch.map((goal, index) => (
            goal.type.includes('BG') && (
              <div
                key={index}
                className={`goal-block business-goal`}
                data-id={goal.title}
                onClick={(e) => handleClick(e)}
              >
                <div className="story-content">
                  <p className="story-title">{goal.title}</p>
                  <div className='goal-badges'>
                    <p className="goal-type"><strong>{goal.type}</strong></p>
                    <p className="goal-priority"><strong>{goal.priority}</strong></p>
                  </div>

                </div>
              </div>
            )
          ))}
        </div>
        <div className="goals-grid">
          {projeto.goalSketch.map((goal, index) => (
            goal.type.includes('CG') && (
              <div
                key={index}
                className={`goal-block constraint-goal`}
                data-id={goal.title}
                onClick={(e) => handleClick(e)}
              >
                <div className="story-content">
                  <p className="story-title">{goal.title}</p>
                  <div className='goal-badges'>
                    <p className="goal-type"><strong>{goal.type}</strong></p>
                    <p className="goal-priority"><strong>{goal.priority}</strong></p>
                  </div>

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
      <AddUserStories
        userData={userData}
        setUserData={setUserData}
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

export default GoalSketch;