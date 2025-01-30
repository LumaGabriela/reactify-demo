import React, { useEffect } from 'react'


const ProjectIcon = ({projectData, setModalKey}) => {
    
    return (
        <div  className="project-container mt-5">
        {projectData.map((project) => (
            <div key={project.key}  
            className = {`project-item text-center ${project.key} `}
            onClick={() => setModalKey(project.key)}
            
            >
            <h5>{project.name}</h5> 

            </div>
        ))}  
        </div>   
    )
}


export {ProjectIcon}