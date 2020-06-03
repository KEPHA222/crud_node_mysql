const mysql = require('mysql');
const express = require('express');
var app = express();
//const bodyparser = require('body-parser');

//app.use(bodyparser.json);


var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'EmployeeDB',
    multipleStatements: true
});

db.connect((err) => {
    if(!err)
        console.log('DB connection succeeded.');
    else
        console.log('DB connection failed \n Error : '+ JSON.stringify(err, undefined, 2));
});

//Get all employees
app.get('/employees', (req, res) => {
    db.query('SELECT * FROM Employee', (err, rows, fields) => {
        if(!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Get an employee
app.get('/employees/:id', (req, res) => {
    db.query('SELECT * FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if(!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Delete an employee
app.delete('/employees/:id', (req, res) => {
    db.query('DELETE FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if(!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

//Insert an employee
app.post('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?;      \
               SET @Name = ?;       \
               SET @EmpCode = ?;    \
               Set @Salary = ?;     \
               CALL EmployeeAddOrEdit(@EmpID, @Name, @EmpCode, @Salary);";

    db.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if(!err)
            // res.send(rows);
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].EmpID);
            });
        else
            console.log(err);
    });
});

//Update an employee
app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?;     \
               CALL EmployeeAddOrEdit(@EmpID, @Name, @EmpCode, @Salary);";

    db.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});


app.listen(3000, () => console.log('Express server is running at port no: 3000'));