import { useNavigate } from "react-router"

const ProjectIcon = ({ userData, setProjectKey, handleRemove }) => {
  const navigate = useNavigate()
  return (
    <div className="project-container mt-5">
      {userData.projects?.map((project) => (
        <div
          key={project.key}
          className={`project-item text-center ${project.key}`}
          onClick={() => {
            setProjectKey(project.key)
            navigate(`/${project.key}/visao-geral/`)
          }}

        >
          <h5>{project.name}</h5>

        </div>
      ))}
    </div>
  )
}


export { ProjectIcon }