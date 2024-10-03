function showTasksByStatus(status, list) {
  let hasTasksWithThisStatus;

  const filteredList = list.filter((task) => task.status === status);

  filteredList.forEach(task => {
    console.log(`\t ${task.id}. "${task.title}"`);
    hasTasksWithThisStatus = true;
  })

  if (!hasTasksWithThisStatus) console.log('\t -');
}

function* generateIds() {
  let id = 1;

  while(true) {
    yield id++;
  }
}

const idGenerator = generateIds();

const getId = () => idGenerator.next().value;

function addIds(tasks) {
  const tasksList = tasks.map((task) => ( { ...task, id: getId() } ));

  return tasksList;
}

module.exports = {
  showTasksByStatus,
  getId,
  addIds,
};