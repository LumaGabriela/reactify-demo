import React from 'react';
import './Journeys.css'; // Certifique-se de criar este arquivo CSS para estilização
import { AddButton } from '../components/button/Buttons'
import { JourneyDescriptionModal } from '../components/modal/Modals'



const Journeys = ({ projectData, setProjectData, handleRemove, journeyModal, setJourneyModal, modalKey }) => {
    const project = projectData.find(project => project.key === modalKey)

    const updateJourney = (journeyIndex, stepIndex) => {

    }


    const handleClick = (e) => {
        const journeyElement = e.target.closest('.journey')
        console.log(journeyElement.getAttribute('data-key'))
    }

    return (
        <div>

            <div className="journeys-grid">
                <h1 className='title'>Journeys</h1>
                {project.journeys.map((journey, journeyIndex) => (
                    <div key={`${project.key}-${journeyIndex}`} data-key={`${project.key}-${journeyIndex}`} className="journey">
                        <div className="steps-grid">
                            <div className="step first-step">
                                <div className="step-content">
                                    <p className="step-description">{journey.name}</p>
                                </div>
                            </div>
                            <div className="arrow">→</div>
                            {journey.steps.map((step, stepIndex) => (
                                <React.Fragment key={stepIndex}>
                                    <div className="step" onClick={(e) => handleClick(e)}>
                                        <div className="step-content">
                                            <p className="step-description">{step.description}</p>
                                        </div>
                                    </div>
                                    {stepIndex < journey.steps.length - 1 && (
                                        <div className="arrow">→</div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                ))}
                <AddButton
                    handleRemove={handleRemove}
                    type={'journey'}
                />
                <JourneyDescriptionModal
                    journeyModal={journeyModal}
                    setJourneyModal={setJourneyModal}
                    project={project}
                />
            </div>
        </div>
    );
};

export default Journeys;