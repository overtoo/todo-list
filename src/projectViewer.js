import projectController from "./projectController";
import PubSub from "pubsub-js";

const projectViewer = (() => {
  let activeProject = "default";
  //
  //
  PubSub.subscribe("PROJECT CLICKED", load);

  PubSub.subscribe("NEW PROJECT ADDED", load);

  //
  //end of pubsub

  function load() {
    renderSidebar();
    selectProject();
    renderTasks();
  }

  function renderSidebar() {
    const sidebar = document.querySelector("#sidebar");
    sidebar.innerHTML = "";
    let projects = projectController.getProjects();
    for (let i = 0; i < projects.length; i++) {
      let tab = document.createElement("div");
      tab.classList.add("tab");
      tab.classList.add("project");
      tab.dataset.project = projects[i];
      tab.textContent = projects[i];
      sidebar.appendChild(tab);
    }
    //add project tab
    let tab = document.createElement("div");
    tab.classList.add("tab");
    tab.classList.add("add-project");
    tab.dataset.project = "add";
    tab.textContent = "+";
    sidebar.appendChild(tab);

    //this shouldnt be here
    //addClick()
    const tabs = sidebar.querySelectorAll(".project");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        activeProject = tab.dataset.project;
        PubSub.publish("PROJECT CLICKED", activeProject + " selected (pubsub)");
      });
    });
    const addProjectBtn = sidebar.querySelector(".add-project");
    addProjectBtn.addEventListener("click", () => {
      let newProject = prompt("Add new project");
      while (projects.includes(newProject)) {
        newProject = prompt(
          newProject + " already exists bozo. Add new project"
        );
      }
      while (!newProject) {
        newProject = prompt(" Add a name bozo");
      }

      projectController.addProject(newProject);
      activeProject = newProject;
      PubSub.publish("NEW PROJECT ADDED", activeProject);
      console.log("huh");
    });
  }

  const createTable = function (myTasks) {
    // let data = Object.assign({}, data2);
    const data = JSON.parse(JSON.stringify(myTasks));
    if (data.length == 0) {
      data.push({
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        project: "",
        complete: false,
      });
    }

    const table = document.createElement("table");
    table.classList.add("table");
    const header = document.createElement("tr");
    const keys = Object.keys(data[0]);

    for (const key of keys) {
      const th = document.createElement("th");
      th.appendChild(document.createTextNode(key));
      header.appendChild(th);
    }
    table.appendChild(header);
    const len = data.length;

    for (const row of data) {
      const tr = document.createElement("tr");
      for (const key of keys) {
        const td = document.createElement("td");
        const content = row[key] || "";
        td.appendChild(document.createTextNode(content));
        tr.appendChild(td);
        delete row[key];
      }
      /****
        you can omit next cycle if all object have the same structor or if the first element of collection have all fields
        ****/
      for (const key in row) {
        const th = document.createElement("th");
        th.appendChild(document.createTextNode(key));
        keys.push(key);
        header.appendChild(th);
        const td = document.createElement("td");
        const content = row[key] || "";
        td.appendChild(document.createTextNode(content));
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }

    return table;
  };

  function renderTasks() {
    const content = document.querySelector("#content");
    content.innerHTML = "";
    const activeProject = document.querySelector(".active").dataset.project;
    console.log("Tasks rendered. Active project is " + activeProject);

    const activeTasks = projectController.getTasks(activeProject);
    // console.log("activeTasks are:");
    // console.table(activeTasks);
    // console.table(activeTasks);
    let taskTable = createTable(activeTasks);
    content.appendChild(taskTable);

    //render add task button
    let addTaskBtn = document.createElement("button");
    addTaskBtn.classList.add("add-task");
    addTaskBtn.textContent = "+";
    content.appendChild(addTaskBtn);

    //event
    addTaskBtn.addEventListener("click", () => {
      addTask();
      // projectController.addProject(newProject);
      // renderSidebar();
      // selectProject(newProject);
    });
  }

  function addTask() {
    //
    //build form
    const formContainer = document.querySelector("#task-form");
    //empty form
    formContainer.innerHTML = "";
    //close thing
    const closeDiv = document.createElement("div");
    closeDiv.textContent = "✖";
    closeDiv.id = "close-tb";
    formContainer.appendChild(closeDiv);
    //form thing
    const myFormDiv = document.createElement("form");
    myFormDiv.id = "myForm";
    const inputlabelDiv = document.createElement("label");
    inputlabelDiv.textContent = "Name";
    myFormDiv.appendChild(inputlabelDiv);
    const inputDiv = document.createElement("input");
    inputDiv.id = "task-name";
    inputDiv.type = "text";
    inputDiv.placeholder = "What do you need to do?";
    myFormDiv.appendChild(inputDiv);
    //
    const desclabelDiv = document.createElement("label");
    desclabelDiv.textContent = "Description";
    myFormDiv.appendChild(desclabelDiv);
    const descDiv = document.createElement("input");
    descDiv.id = "task-description";
    descDiv.type = "text";
    descDiv.placeholder = "Description of task..?";
    myFormDiv.appendChild(descDiv);
    //
    const priorityDivLabel = document.createElement("label");
    priorityDivLabel.textContent = "Priority";
    myFormDiv.appendChild(priorityDivLabel);
    const priorityDiv = document.createElement("select");
    const option1 = document.createElement("option");
    option1.value = "1";
    option1.textContent = "1";
    const option2 = document.createElement("option");
    option2.value = "2";
    option2.textContent = "2";
    const option3 = document.createElement("option");
    option3.value = "3";
    option3.textContent = "3";
    priorityDiv.id = "priority";
    priorityDiv.appendChild(option1);
    priorityDiv.appendChild(option2);
    priorityDiv.appendChild(option3);
    myFormDiv.appendChild(priorityDiv);
    //
    const dateDivLabel = document.createElement("label");
    dateDivLabel.textContent = "Due Date";
    myFormDiv.appendChild(dateDivLabel);
    const dateDiv = document.createElement("input");
    dateDiv.id = "due-date";
    dateDiv.type = "text";
    myFormDiv.appendChild(dateDiv);
    const submitDiv = document.createElement("input");
    submitDiv.type = "submit";
    submitDiv.value = "Submit";
    myFormDiv.appendChild(submitDiv);
    formContainer.appendChild(myFormDiv);

    // const myForm = document.querySelector("#myForm");

    //show form
    const formBox = document.querySelector("#task-form");
    formBox.style.display = "block";

    //click to close
    const closeForm = document.querySelector("#close-tb");
    closeForm.addEventListener("click", () => {
      formBox.style.display = "none";
    });

    document.getElementById("myForm").onsubmit = function (e) {
      e.preventDefault();
      const taskValue = document.getElementById("task-name").value;
      const descValue = document.getElementById("task-description").value;
      const dateValue = document.getElementById("task-description").value;

      projectController.addTask(activeProject, taskValue, descValue, dateValue);
      formBox.style.display = "none";
      renderTasks();
    };

    // form.classList.add("task-form");

    // const input = document.createElement("input");
    // input.classList.add("task-input");
    // td.appendChild(input);
    // tr.appendChild(td);
    // table.appendChild(tr);
  }

  function selectProject() {
    // renderSidebar();
    const tab = document.querySelector(`[data-project=${activeProject}]`);
    tab.classList.add("active");
  }

  function unselectProject() {
    const sidebar = document.querySelector("#sidebar");
    const tabs = sidebar.querySelectorAll(".active");
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
  }

  // function renderTasks() {
  //   const sidebar = document.querySelector("#content");
  //   for (task in allTasks) {
  //   }
  //   let line = document.createElement("div");
  // }

  return {
    renderSidebar,
    selectProject,
    unselectProject,
    renderTasks,
  };
})();

export default projectViewer;
