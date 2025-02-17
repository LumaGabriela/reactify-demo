import React, { useEffect, useState } from 'react';
import './Journeys.css';
import { AddButton } from '../components/button/Buttons'
import { JourneyDescriptionModal } from '../components/modal/Modals'



const Journeys = ({ projectData, setProjectData, handleRemove, journeyModal, modalKey }) => {
  const project = projectData.find(project => project.key === modalKey)
  const [journeyData, setJourneyData] = useState({})
  const [visibleJourneys, setVisibleJourneys] = useState({})
  const [operation, setOperation] = useState('')
  const toggleJourneyVisibility = (journeyIndex) => {
    setVisibleJourneys(prev => ({
      ...prev,
      [journeyIndex]: !prev[journeyIndex]
    }));
  };

  const handleClick = (e) => {
    const stepElement = e.target.closest('.step');
    if (stepElement) {
      const journeyElement = {};
      for (const key in stepElement.dataset) {
        if (key === 'journeyindex' || key === 'stepindex') {
          journeyElement[key] = Number(stepElement.dataset[key]);
        } else {
          journeyElement[key] = stepElement.dataset[key];
        }
      }
      setJourneyData(journeyElement);
      setOperation('description')
      handleRemove('journey');
    }
  };


  const addStep = (journeyIndex) => {
    setJourneyData({
      journeyindex: journeyIndex,
      stepindex: project.journey[journeyIndex].steps.length ,
      description: ''
    });
    setOperation('add-step')
    handleRemove('journey');
  }

  return (
    <div>

      <div className="journeys-grid">
        <h1 className='title'>Journeys</h1>
        {project.journey.map((journey, journeyIndex) => (
          <div
            key={`${project.key}-${journeyIndex}`}
            data-key={project.key}
            data-journeyIndex={journeyIndex}
            className="journey"
          >
            <div className="step-arrow">
            <div className='step first-step' onClick={() => toggleJourneyVisibility(journeyIndex)}>
              {journey.name} 
            </div>
            {visibleJourneys[journeyIndex] ? (<div className="arrow">→</div>) : '' }
            </div>
            <div className="steps-grid">
              {visibleJourneys[journeyIndex] && journey.steps.map((step, stepIndex) => (
                <React.Fragment key={stepIndex}>
                  <div className="step-arrow">
                    <div
                      className="step"
                      data-key={project.key}
                      data-journeyIndex={journeyIndex}
                      data-stepIndex={stepIndex}
                      onClick={(e) => handleClick(e)}
                    >
                      <div className="step-content">
                        <p className="step-description">{step.description}</p>
                      </div>
                    </div>
                    {(stepIndex < journey.steps.length - 1) && (
                      <div className="arrow">→</div>
                    )}
                  </div>
                </React.Fragment>
              ))}
              {visibleJourneys[journeyIndex] && (
                <div className="step-arrow">
                  <button className="add-step-button" onClick={() => addStep(journeyIndex)}>Adicionar Passo</button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        <AddButton
          handleRemove={handleRemove}
          type={'journey'}

        />
        <JourneyDescriptionModal
          journeyModal={journeyModal}
          projectData={projectData}
          setProjectData={setProjectData}
          modalKey={modalKey}
          handleRemove={handleRemove}
          journeyData={journeyData}
          setJourneyData={setJourneyData}
          operation={operation}
          setOperation={setOperation}
        />
      </div>
    </div>
  )
}

export default Journeys 