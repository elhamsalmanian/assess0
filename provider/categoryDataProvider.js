const fs = require('fs');

let categories = require('../data/categories.json');

const categoryDataProvider = {
    getAll: () => ( categories ),
    getById: (id) => ( categories.find(x => x.id.toString() === id.toString()) ),
    find: (x) => ( categories.filter(x) ),
    create,
    update,
    delete: _delete
};

function create(category) {
    category.id = categories.length ? Math.max(...categories.map(x => x.id)) + 1 : 1;

    categories.push(category);
    saveData();
}

function update(id, params) {
    const category = categories.find(x => x.id.toString() === id.toString());

    category.dateUpdated = new Date().toISOString();

    Object.assign(category, params);
    saveData();
}

function _delete(id) {
    categories = categories.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

function saveData() {
    fs.writeFileSync('data/categories.json', JSON.stringify(categories, null, 4));
}


export default categoryDataProvider;