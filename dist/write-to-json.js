import axios from 'node:axios';

function writeJSON(jsonData)
{
    axios
      .post('/updateJson', jsonData)
      .then(() => {
        console.log('JSON file updated successfully');
      })
      .catch((error) => {
        console.error('Error updating JSON file:', error);
      });
}