import projectController from "./projectController";
import projectViewer from "./projectViewer";

// alert(projectController.projects);

//hard coding
// const firstTask = projectController.taskCreator("homework");
// projectController.allTasks.push(firstTask);

// const secondTask = projectController.taskCreator("gardening");
// secondTask.project = "outdoors";
// projectController.allTasks.push(secondTask);
// firstTask.description = "do my science hw";
// console.log(projectController.allTasks);
// console.log(JSON.stringify(projectController.allTasks));

// projectController.addProject("test");

projectViewer.renderSidebar();
projectViewer.selectProject();

// projectController.addProject("john");
projectViewer.renderTasks();
projectViewer.renderSidebar();
projectViewer.selectProject();

// console.log(JSON.stringify(projectController.betaProject));

// projectController.addTask("test","hello")
