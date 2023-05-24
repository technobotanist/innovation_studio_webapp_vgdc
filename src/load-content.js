// Function to populate the list with links
var id_counter = 0;

function populateList(jsonData)
{
    const linkList = document.getElementById('game-list');
    
    // Loop through the JSON data and create list items with links
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = "#";
    link.textContent = jsonData.name;
    link.onclick = () => eval(jsonData.onclick);
    link.classList.add("section");
    link.id = id_counter.toString();
    id_counter++;
    listItem.appendChild(link);
    linkList.appendChild(listItem);
}

// Folder path where the JSON files are located
const folderPath = 'jsons/';

// Function to fetch the list of JSON files
function fetchJsonFiles()
{
  return fetch(folderPath)
    .then(response => response.text())
    .then(html =>
    {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const links = doc.querySelectorAll('a');
      const jsonFiles = Array.from(links)
        .map(link => link.href)
        .filter(href => href.endsWith('.json'))
        .map(href => href.replace(window.location.href, ''));
      
      return jsonFiles;
    });
}

// Function to fetch and populate the list
function fetchAndPopulateList()
{
  fetchJsonFiles()
    .then(jsonFiles =>
    {
      jsonFiles.forEach(file =>
      {
        fetch(file)
          .then(response => response.json())
          .then(jsonData => populateList(jsonData))
          .catch(error => console.error(`Error fetching JSON file: ${file}`, error));
      });
    })
    .catch(error => console.error('Error fetching JSON files', error));
}

// Call the fetchAndPopulateList function to initiate the process
fetchAndPopulateList();
