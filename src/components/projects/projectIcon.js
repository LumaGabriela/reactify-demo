


const ProjectIcon = ({projectData}) => {
    return (
        <div>
        {projectData.map((project, i) => (
            <div key={i} className="container text-center">
            <h2>Nome do projeto:</h2> {project.name}
            <h2>Journeys:</h2> {project.journey}
            <h2>Visão do Produto:</h2> {project.jo}
            </div>
        ))}  
        </div>   
    )
}


export default ProjectIcon