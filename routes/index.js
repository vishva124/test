var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
const connection = require('../Database/dbConnect');

/* GET home page. */
router.get('/demo',(req, res, next) =>{
  res.send('Hello Vishva !! How Are You ??');
  //console.error(new Error('Whoops, something bad happened'));
  const name = 'abc';
  //console.warn(` ${name}! Danger!`);
  //console.count('vish');
  console.table([{a: name,b: 10,c: 20},{a:10,b:15,c: 20,d:30}]);
  console.table([{a: name,b: 10,c: 20},{a:10,b:15,c: 20,d:30}],['a','b']);

});
router.get('/view/:name', (req, resp, next) => {
  resp.render('index', { title: 'node', name: req.params.name });
});

router.get('/vishva', (req, res, next) => {
  res.send('i am in...');
});

router.get('/login', (req, resp) => {
  resp.render('user');

});
// router.get('/update/:id', (req, res) => {
//   res.render('update');
// })

//GET ONE USER
router.get('/getAllData/:id', (req, res, next) => {
  connection.query('SELECT * FROM user where uid=?', [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
    else {
      res.json(rows);
    }
  });
})

//ADD
router.post('/add', (req, resp, next) => {

  var name = req.body.uname;
  var lname = req.body.lname;
  var email = req.body.email;
  var contact = req.body.contacts;
  var password = req.body.pass;

  connection.query('insert into user (ufname, ulname, uemail, ucontact,upassword) values (?,?,?,?,?) ', [name, lname, email, contact, password], (err, rows) => {
    if (err) throw err;
    if (rows.length > 1) throw err;
    resp.send('added successfully');
  });
})

//DELETE
router.get('/deleteUser/:id', (req, res, next) => {

  connection.query('delete from user where uid = ?', [req.params.id], (err, rows) => {
    if (err) throw err;
    if (rows.length > 0) throw err;
    res.send('deleted successfully');
  });

})


//Update user
router.get('/updateCall/:id', (req, res) => {

  // console.log('im here');
  // res.render('update');
  connection.query('SELECT * FROM user WHERE uid = ?', [req.params.id], (err, rows) => {
    if (err) throw err;

    if (rows.length < 1) {
      res.render('error', { error: err });
    }
    else {
      res.render('updateUser', { data : rows });
    }
  });
});

router.post('/updatedt',(req,res) => {
  
  var name = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var phone = req.body.contact;
  var password = req.body.password;
  var id= req.body.id;


  connection.query('UPDATE user SET ufname = ?, ulname = ?, uemail = ?, ucontact = ?,upassword = ? WHERE uid= ?',[name,lname,email,phone,password,id], (err,rows) =>{
    if(err){
      console.log(err);
    }
    if(rows.affectedRows === 0)
    {
      res.send('data not updated');
    }
    else
    {
      res.send('Data updated successfully !!');
    }
    })
  });

module.exports = router;
