var mysql = require('mysql');

var obj = {
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'signup'
};

var connection = mysql.createConnection(obj);

function InsertintoDb(username, password, cb){
    // To insert data into the database => the data is val => which is the same as the data in input box
    try {
        connection.query(`Insert into signup (username,password) Values('${username}', '${password}')`, function(error, results){
            if(error) throw error;
            // cb();
        })
    }
    catch(e){
        console.log(e);
    }
}

function getfromDb(user, cb){
 return  connection.query(`Select * from signup where username = '${user}'`, function(error, results){
        if(error) throw error;
        // cb(results);
      // console.log(results);
    // console.log(typeof (results[0].username))  ;
     if(results.length>0){
           // console.log(results[0].username);
         return  cb(results[0].username);
     }
     else {
         return cb([]);
     }

    });

}

function getpasswordfromDb(user, cb){
    connection.query(`Select password from signup where username = '${user}'`, function(error, results){
        if(error) throw error;
         cb(results);
        // console.log(results);
    })
};


//connection.connect()
module.exports = {
    connection: connection,
    InsertintoDb: InsertintoDb,
    getfromDb: getfromDb,
    getpasswordfromDb:getpasswordfromDb,

};

