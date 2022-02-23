const fs = require('fs');
const uniqid = require( 'uniqid')
let questions = require('../data/questions.json');

const questionDataProvider = {
    getAll: () => ( questions ),
    getById: (id) => ( questions.find(x => x.id.toString() === id.toString()) ),
    find: (x) => ( questions.filter(x) ),
    create,
    update,
    delete: _delete
};

function create(question) {
    //question.id = questions.length ? Math.max(...questions.map(x => x.id)) + 1 : 1;
    question.id = uniqid();
    question.issuedDate = new Date().toDateString();
  

    questions.push(question);
    saveData();
}

function update(id, params) {
    const question = questions.find(x => x.id.toString() === id.toString());

    question.dateUpdated = new Date().toISOString();

    Object.assign(question, params);
    saveData();
}

function _delete(id) {
    questions = questions.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

function saveData() {
    fs.writeFileSync('data/questions.json', JSON.stringify(questions, null, 4));
}


export default questionDataProvider;