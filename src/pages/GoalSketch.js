import { useState, useEffect } from 'react';
import { AddButton } from '../components/button/Buttons';
import { AddGoalSketch } from '../components/modal/Modals';
import './UserStories.css';

const GoalSketch = ({ userData, setUserData, userKey, users, setUsers, modal, handleRemove, projectKey }) => {

  const [goalData, setGoalData] = useState('');
  const [projeto, setProjeto] = useState(null)
  //Atualiza o projeto atual
  useEffect(() => {
    const user = users.find(user => user.key === userKey);
    setProjeto(user?.projects.find(project => project.key === projectKey) || {});
  }, [users, userKey, projectKey])

  const handleClick = (e) => {
    const goalElement = e.target.closest('.goal-block');
    if (goalElement) {
      const goal = goalElement.dataset.id
      setGoalData(goal);
      handleRemove('goalSketch');
    }
    console.log()
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
                data-id={goal.id}
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
                data-id={goal.id}
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
        type={'goalSketch'}
      />
      <AddGoalSketch
        userData={userData}
        setUserData={setUserData}
        userKey={userKey}
        users={users}
        setUsers={setUsers}
        modal={modal}
        handleRemove={handleRemove}
        projectKey={projectKey}
        goalData={goalData}
        setGoalData={setGoalData}
      />
    </div>
  );
}

export default GoalSketch;