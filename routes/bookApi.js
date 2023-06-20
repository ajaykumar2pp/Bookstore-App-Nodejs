const bookController = require("../app/controller/bookController")
function initRoutes(app) {
    //*********************************   API routes  **************************** *//
    app.get('/', bookController().home);

    //  POST  http://localhost:2000/api/items
    app.post('/api/items', bookController().create);

    //  GET  http://localhost:2000/api/items/:_id
    app.get('/api/items/:id', bookController().find);


    //  PUT  http://localhost:2000/api/items/:_id
    app.put('/api/items/:id', bookController().update);


    //  GET  http://localhost:2000/api/items   All List Book
    app.get('/api/items', bookController().index);



    // delete   http://localhost:2000/products/:_id
    app.delete('/api/items/:id', bookController().delete);

}
module.exports = initRoutes