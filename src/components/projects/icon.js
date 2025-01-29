import React, { useEffect } from 'react'


const ProjectIcon = ({projectData, setDescriptionModal}) => {
    
    return (
        <div  className="project-container mt-5">
        {projectData.map((project) => (
            <div key={project.key}  
            className = {`project-item text-center ${project.key} `}
            onClick={() => setDescriptionModal({isVisible: true, key: project.key})}
            
            >
            <h5>{project.name}</h5> 

            </div>
        ))}  
        </div>   
    )
}


export {ProjectIcon}