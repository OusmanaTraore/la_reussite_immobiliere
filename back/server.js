const express = require('express');
const app = express();
require('dotenv').config();
const cors = require("cors");
app.use(express.json());
const nodemailer = require('nodemailer');
 const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
var corsOptions = {
    origin: "*"
  };
  app.use(cors(corsOptions));
  var port =86
  // mettre le serveur à l'écoute(en marche) sur le port 
  app.listen(
    port,
    ()=>{console.log(`Serveur Express a l ecoute sur le port ${port}`);}
    );
    
   
// connexion de notre serveur à la base mongo
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'gestibank';


let db 


MongoClient.connect(url, function(err, client) {
 console.log("Connexion réussi avec Mongo");
 db = client.db(dbName);
});


//******************""* */  Les API Rest des Clients //******************* */

// Tous les clients
app.get('/clients/list/', (req,res) => {
      db.collection('users').find({"role": "CLIENT"}).toArray(function(err, docs) {
          if (err) {
              console.log(err)
              throw err
          }
          res.status(200).json(docs)
        }) 
    })
    
// Tous les clients avec status en attente
app.get('/clients/list/attente', (req,res) => {
          db.collection('users').find({"role": "CLIENT","status":"EN ATTENTE"}).toArray(function(err, docs) {
              if (err) {
                  console.log(err)
                  throw err
              }
              res.status(200).json(docs)
            }) 
})

// Tous les clients avec status validé
app.get('/clients/list/valide', (req,res) => {
      db.collection('users').find({"role": "CLIENT","status":"VALIDE"}).toArray(function(err, docs) {
          if (err) {
              console.log(err)
              throw err
          }
          res.status(200).json(docs)
        }) 
})


// inscription d'un nouveau client
app.post('/clients/add/',  async (req,res) => {
      
       try {
              const newClient = req.body
              const addedClient = await db.collection('users').insertOne(newClient)
              res.status(200).json(addedClient)
  
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

          } catch (err) {
              console.log(err)
              throw err
          } 
    })


/*
    app.get('/users/:id', async (req,res) => {
          const id = parseInt(req.params.id)
          try {
              const docs = await db.collection('user').find({id}).toArray()
              res.status(200).json(docs)
          } catch (err) {
              console.log(err)
              throw err
          }
        })
        
        
    
    app.put('/users/:id', async (req,res) => {
                  try {
                      const id = parseInt(req.params.id)
                      const replacementEquipe = req.body
                      const equipe = await db.collection('user').replaceOne({id},replacementEquipe)
                      res.status(200).json(equipe)
                  } catch (err) {
                      console.log(err)
                      throw err
                  }
                })
    

    app.delete('/users/:id', async (req,res) => {
                      try {
                          const id = parseInt(req.params.id)
                          const equipe = await db.collection('user').deleteOne({id})
                          res.status(200).json(equipe)
                      } catch (err) {
                          console.log(err)
                          throw err
                      } 
                    })
*/


//******************* */  Les API Rest des Agents //******************* */

// Tous les agents
app.get('/agents/list/', (req,res) => {
      db.collection('users').find({"role": "AGENT"}).toArray(function(err, docs) {
          if (err) {
              console.log(err)
              throw err
          }
          res.status(200).json(docs)
        }) 
    })

    app.put('/agents/:id', async (req,res) => {
        try {
            const id = parseInt(req.params.id)
            const replacementAgent = req.body
            const agent = await db.collection('users').replaceOne({id},replacementAgent)
            res.status(200).json(agent)
        } catch (err) {
            console.log(err)
            throw err
        }
      })
// Ajout d'un nouvel agent par l'admin
app.post('/agents/add/', async (req,res) => {
      try {
              const newAgent = req.body
              const addedAgent = await db.collection('users').insertOne(newAgent)
              res.status(200).json(addedAgent)
          } catch (err) {
              console.log(err)
              throw err
          } 
    })


//******************* */  Les API Rest des Admin//******************* */

// Tous les admins
app.get('/admin/list/', (req,res) => {
      db.collection('users').find({"role": "ADMIN"}).toArray(function(err, docs) {
          if (err) {
              console.log(err)
              throw err
          }
          res.status(200).json(docs)
        }) 
    })

    //******************* */  API Authentification //******************* */
app.get('/users/:email', async (req,res) => {
      try {
          const email = req.params.email;
          const user = await db.collection('users').findOne({email})
          res.status(200).json(user)
      } catch (err) {
          console.log(err)
          throw err
      } 
    })


    //******************""* */  Les API Rest de tous les Users //******************* */

// Tous les USERS
app.get('/users/list/', async (req,res) => {
      db.collection('users').findAll({id}).toArray(function(err, docs) {
          if (err) {
              console.log(err)
              throw err
          }
          res.status(200).json(docs)
        }) 
    })
    

//Ajouter un nouveau User ---Inscription-----

app.post('/users/add/', async (req,res) => {
      try {
          const newUser = req.body;
          const addedUser = await db.collection('users').insertOne(newUser);
          res.status(200).json(addedUser);
  
          var mailClient = newUser.email;
          
          var password = newUser.password;
          var mailOptions = {
              from: 'ousigestibank@gmail.com',
              to: mailClient,
              subject: 'Validation de création de compte GestiBank',
              text: `Félicitations votre compte a été créé avec succès  \n
               Login: ${mailClient}  \n
               Votre mot de passe:${password}
               `
            };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
      } catch (err) {
          console.log(err)
          throw err
      }
    });

