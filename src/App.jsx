import { useState } from 'react';

import ProjectSidebar from "./componenets/ProjectSidebar.jsx"
import NewProject from "./componenets/NewProject.jsx";
import NoProjectSelected from "./componenets/NoProjectSelected.jsx";
import SelectedProject from './componenets/SelectedProject.jsx';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskID = Math.random();
      const newTask = {
        text: text,
        projectID: prevState.selectedProjectId,
        id: taskID,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  function handleDeleteTask () {

  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });   
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectID = Math.random();
      const newProject = {
        ...projectData,
        id: projectID,
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId),
      };
    });   
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = <SelectedProject 
                  project={selectedProject} 
                  onDelete={handleDeleteProject} 
                  onAddTask={handleAddTask} 
                  onDeleteTask={handleDeleteTask} 
                  tasks={projectsState.tasks}
                />

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar 
        onStartAddProject={handleStartAddProject} 
        projects={projectsState.projects} 
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
