
const ProjectIcon = ({projectData, setModalKey, handleRemove}) => {
    
    return (
        <div  className="project-container mt-5">
        {projectData.map((project) => (
            <div key={project.key}  
            className = {`project-item text-center ${project.key}`}
            onClick={() => {
                setModalKey(project.key)
                handleRemove('description')
            }
        }
            
            >
            <h5>{project.name}</h5> 

            </div>
        ))}  
        </div>   
    )
}


export {ProjectIcon}