const Schemes = require('../data/db-config');

module.exports={
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find(){
    return Schemes('schemes')
}

function findById(id){
    return Schemes("schemes")
        .where({id})
        .first()
}

function findSteps(id){
    // scheme id
    // the scheme name
    // the step instruction
    // step number 
    return Schemes('schemes')
        .join('steps', 'schemes.id', 'steps.scheme_id')
        .select('schemes.scheme_name', 'steps.instructions', 'steps.step_number')
        .orderBy('steps.step_number')
        .where('scheme_id', id)

}

function add(scheme){
    return Schemes('schemes')
    .insert(scheme, 'id')
    .then(([id]) => {
        return findById(id)
   
    })
}   

function addStep(stepData, id) {

}

function update(changes, id) {
    return Schemes('schemes')
    .where({id})
    .update(changes, 'id')
    .then(count => {
        return findById(id)
    })

}

function remove(id) {
    return Schemes('schemes')
    .where({id})
    .first()
    .then(scheme => {
        const deleted = scheme
        return Schemes('schemes')
            .where({id})
            .first()
            .del()
            .then(count => {
                return deleted;
            })
    })

}