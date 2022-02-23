const fs = require('fs');
const uniqid = require( 'uniqid')
let tasks = require('../data/tasks.json');

const taskDataProvider = {
    getAll: () => ( tasks ),
    getById: (id) => ( tasks.find(x => x.id.toString() === id.toString()) ),
    find: (x) => ( tasks.filter(x) ),
    create,
    update,
    delete: _delete
};

function create(task) {
    //task.id = tasks.length ? Math.max(...tasks.map(x => x.id)) + 1 : 1;
    task.id = uniqid();
    task.issuedDate = new Date().toDateString();
  

    tasks.push(task);
    saveData();
}

function update(id, params) {
    const task = tasks.find(x => x.id.toString() === id.toString());
console.log('task')
console.log(task)
    task.dateUpdated = new Date().toISOString();

    Object.assign(task, params);
    saveData();
}

function _delete(id) {
    tasks = tasks.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

function saveData() {
    fs.writeFileSync('data/tasks.json', JSON.stringify(tasks, null, 4));
}


export default taskDataProvider;