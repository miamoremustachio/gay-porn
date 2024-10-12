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

module.exports = {
  showTasksByStatus,
  idGenerator,
};