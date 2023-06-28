const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3001; // Choose a port number
const host = '10.154.57.156';

var game_index = 0;

// Enable CORS for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://' + host + ':3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use(express.json());

app.post('/updateJson', (req, res) => {
  // Retrieve the data sent from the frontend
  const newData = req.body;

  // Read the existing JSON file
  fs.readFile(newData.json_src, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(newData);
    }

    // Parse the JSON data
    let jsonData = JSON.parse(data);

    // Modify the JSON data with the new values
    jsonData = { ...jsonData, ...newData };

    // Write the updated JSON data back to the file
    fs.writeFile(jsonData.json_src, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(jsonData);
      }

      return res.sendStatus(200);
    });
  });
});

app.get('/swiper-content', (req, res) => {
  const folderPath = './dist/jsons/';
  const fileNames = fs.readdirSync(folderPath);
  //console.log(fileNames);
  const fileContents = [];

  fileNames.forEach(fileName => {
    const filePath = path.join(folderPath, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsedContent = JSON.parse(fileContent);
    if(parsedContent.id == -1)
    {
      parsedContent.id = game_index;
      game_index++;
    }
    fileContents.push(parsedContent);
  });

  //console.log(fileContents);

  res.json(fileContents);
});

app.listen(port, host, () => {
  console.log(`Server running on http://` + host + `:${port}`);
});
