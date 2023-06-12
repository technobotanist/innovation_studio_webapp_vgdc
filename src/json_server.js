const express = require('express');
const fs = require('fs');

const app = express();
const port = 3001; // Choose a port number

app.use(express.json());

app.post('/updateJson', (req, res) => {
  // Retrieve the data sent from the frontend
  const newData = req.body;

  // Read the existing JSON file
  fs.readFile(newData.json_src, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    // Parse the JSON data
    let jsonData = JSON.parse(data);

    // Modify the JSON data with the new values
    jsonData = { ...jsonData, ...newData };

    // Write the updated JSON data back to the file
    fs.writeFile(jsonData.json_src, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      return res.sendStatus(200);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
