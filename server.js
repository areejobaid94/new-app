const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const SECRET_KEY = 'somesting';
const {  user , chate } = require('./database/models');

const app = express();
const port = process.env.PORT || 7000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('angular'));
app.use(bodyParser.json());



    app.post('/', function(req, res) {
        password = req.body.password;
       if(password === "qwe asd"){
           res.status(200).send("pass")
       }
    })

    app.post('/signup', function(req, res) {
        let fullName = req.body.fullName;
        let userName = req.body.userName;
        let password = req.body.password;
        let phoneNumber = req.body.phoneNumber;
        let hashedPassword = bcrypt.hashSync(password, 10);

    user.create({
                fullName: fullName,
                userName: userName,
                phoneNumber: phoneNumber,
                password: hashedPassword
            })
            .then(function() {
                return res.status(201).send({ success: 'Sign up as engineer successful' });
            })
            .catch(function(err) {
                if (err.name === 'SequelizeUniqueConstraintError') {
                    return res.status(400).send({ error: 'This username is already taken' });
                }
                return res.status(500).send('Server Error');
            });
    });
    


    app.post('/signin', function(req, res) {
        const username = req.body.userName;
        const password = req.body.password;

        user.findOne({ where: { userName : username } }).then(function(user) {
            if (!user) {
                return res.status(401).send({ error: 'Please sign up' });
            }
            //Compare with stored password
            const existingHashedPassword = user.password;
            bcrypt.compare(password, existingHashedPassword).then(function(isMatching) {
                if (isMatching) {
                    console.log()
                    //Create a token and send to client
                    // const token = jwt.sign({ username: user.userName }, SECRET_KEY, { expiresIn: 10000 });
                    // return res.send({ token: token });
                    return res.send({ 	fullName: user.fullName,
                        userName: user.userName,
                        phoneNumber: user.phoneNumber,
                        id: user.id
                     });
                } else {
                    return res.status(401).send({ error: 'Wrong password' });
                }
            });
        });
    });



    const authenticate = function(req, res, next) {
        console.log(req.headers)
        const token = req.headers['x-access-token']; 
        if (!token) {
            console.log("tokennnnnnn")
            return res.status(401).send('Please sign in');
        }
        jwt.verify(token, SECRET_KEY, (err, data) => {
            //console.log(data)
            if (err) {
                return res.status(401).send('Please sign in');
            }
            //Check if user exists in the database
            const username = data.username;
          
                user
                    .findOne({ where: { userName: username } })
                    .then((user) => {
                        //console.log(user)
                        if (!user) {
                            return res.status(401).send('Please sign up');
                        }
                        req.body.user = user; // put user in req.body
                        //console.log(user)
                        return next();
                    })
                    .catch(function(err) {
                        return res.status(500).send(err);
                    });
        
        });
    };
    

    

// app.get('/signin', authenticate, function(req, res) {
//     const User = req.body.user;
// 	user.findOne({ where : { userName : User.userName }})
// 		.then(function(user) {
// 			return res.send({
// 				fullName: user.fullName,
// 				userName: user.userName,
// 				phoneNumber: user.phoneNumber
// 			});
// 		})
// 		.catch(function(err) {
// 			return res.status(500).send(err);
// 		});
// });



app.put('/profile', function(req, res, next) {
    var userId = req.body.id
	if (req.body.userName){
	user.update(
			{
				userName: req.body.userName
			},
			{
				where: {
					id : userId
				}
			}
		)
}
if (req.body.phoneNumber){
user.update(
        {
            phoneNumber: req.body.phoneNumber
        },
        {
            where: {
                id: userId
            }
        }
    )
}
if (req.body.fullName){
    user.update(
            {
                fullName: req.body.fullName
            },
            {
                where: {
                    id: userId
                }
            }
        )
    }
if (req.body.password){
    let hashedPassword = bcrypt.hashSync(req.body.password, 10);
    user.update(
            {
                password: hashedPassword
            },
            {
                where: {
                    id: userId
                }
            }
        )
        .then(function() {
			res.send("update");
		})
        .catch(next);
    }
});


app.post('/chate', function(req, res) {
    const userName = req.body.userName;
    const massege = req.body.massege;

    chate.create({
        user:userName,
        chates:massege
    })
    .then(function() {
        chate.findAll({})
        .then(function(chate) {
            return res.send({
                chate
            });
        })
    })
    .catch(function(err) {
        return res.status(500).send('Server Error');
    });
    
      
});


app.get('/profile', function(req, res) {
    const userName = req.body.userName;
    console.log(userName)
    chate
    .findAll({ where: { user: userName} })
    .then(function(chate) {
        return res.send({
            chate
        });
    })
    .catch(function(err) {
        return res.status(500).send(err);
    });
});


app.delete('/', function (req, res) {
  res.send('DELETE request to homepage')
})

app.listen(port, () => console.log('The Server is working on ' + port));