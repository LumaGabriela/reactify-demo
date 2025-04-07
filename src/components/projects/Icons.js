import { useNavigate } from "react-router"

const ProjectIcon = ({ users, userKey, setProjectKey }) => {
  const user = users.find(user => user.key === userKey)
  const navigate = useNavigate()

  return (
    <div className="project-container mt-5 d-flex flex-wrap gap-4 ">
      {user?.projects?.map((project) => (
        <div
          key={project.key}
          className={`project-item p-4 ${project.key}`}
          style={{
            width: '400px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: 'none',
            borderRadius: '1.5rem'
          }}
          onClick={() => {
            setProjectKey(project.key)
            navigate(`/${project.key}/visao-geral/`)
          }}

        >
          <div className="card-body">
            <h4 className="card-title mb-3">{project.name}</h4>
            <div style={{ color: 'grey'}} className="card-text">
              {project.visaoGeral}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


export { ProjectIcon }