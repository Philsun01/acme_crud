 const db = require('./db');

 db.sync()
    .then( () => {
        console.log( 'We have a Database!')
    })