const projectController = (() => {
  // initialize
  // let projects = ["default"];

  const database = [
    // {
    //   test: [
    //     {
    //       title: "TEST",
    //       description: "TEST",
    //       dueDate: "n/a",
    //       priority: "2",
    //       complete: "false",
    //     },
    //     {
    //       title: "TEST task 2",
    //       description: "TEST",
    //       dueDate: "n/a",
    //       priority: "1",
    //       complete: "false",
    //     },
    //   ],
    // },
    {
      default: [
        {
          title: "default task",
          desc: "get shit done",
          due: "n/a",
          priority: 2,
          status: false,
        },
      ],
    },
    {
      project1: [
        {
          title: "default task",
          desc: "get shit done",
          due: "n/a",
          priority: 2,
          status: false,
        },
      ],
    },
    // {
    //   project1: [
    //     {
    //       title: "PROJECT",
    //       description: "PROJECT",
    //       dueDate: "n/a",
    //       priority: "PROJECT",
    //       complete: false,
    //     },
    //     {
    //       title: "project task 2",
    //       description: "PROJECT",
    //       dueDate: "n/a",
    //       priority: "PROJECT",
    //       complete: false,
    //     },
    //   ],
    // },
  ];

  const getProjects = () => {
    return database.map((set) => Object.keys(set)[0]);
  };

  const addTask = (
    targetProject,
    taskName,
    taskDesc,
    taskDate,
    taskPriority
  ) => {
    const newTask = taskCreator(taskName, taskDesc, taskDate, taskPriority);
    database.forEach((project) => {
      if (Object.keys(project) == targetProject) {
        // console.log(project);
        let arr = project[targetProject];
        console.log(newTask);
        arr.push(newTask);
        // console.table(arr);
        // console.log(newArr);
        console.log("New task added to database.");
      }
    });
  };

  function addProject(name) {
    let newProject = {};
    newProject[name] = [];
    projectController.database.push(newProject);
  }

  const getTasks = (project) => {
    let projects = getProjects();
    let projectObject = database.map((set) => set[project]);
    return projectObject[projects.indexOf(project)];
  };

  const taskCreator = (title, desc, due, priority = "2", status = false) => {
    return {
      title,
      desc,
      due,
      priority,
      status,
    };
  };

  // const addProject = (project) => {
  //   projects.push(project);
  //   return projects;
  // };

  return {
    taskCreator,
    addProject,
    getProjects,
    database,
    getTasks,
    addTask,
  };
})();

export default projectController;
