# GameOfThronesBattle
Heroku link for this application-

https://gameofthronesbattle.herokuapp.com

Below are open APIs-

 /
 
 returns a welcome message.
 
 /list 
 
 returns list(array) of all the places where battle has taken place. 
 
 /count
 
 returns total number of battle occurred.
 
 /stats
 
 returns:
  {
    'most_active':{
      'attacker_king',
      'defender_king',
      'region',
      'name'
    },
    'attacker_outcome':{
      'win', // total win
      'loss' // total loss
    },
    'battle_type':[], // unique battle types
    'defender_size':{
      'average',
      'min',
      'max'
    }
  }
   
/search

/search?king=Robb Stark

return list of battles where 'attacker_king' or 'defender_king' was 'Robb Stark'

Also works for multiple queries

/search?king=Robb Stark&location=Riverrun&type=siege
 
 
 
 
Steps to setup on local machine-

1- Install nodejs

2- Install mongodb

3- import data from csv file using below command-

mongoimport --db gameofthronesbattle --collection battle --type csv --headerline --file battles.csv

4- clone repo from git

5- creat new .env file in home folder

6-Add below linein .env file-

MONGOLAB_URI=mongodb://localhost:27017/dbname
 
7- run command: npm install

8- run command: npm start

9- Open http://localhost:3000/ in browser
