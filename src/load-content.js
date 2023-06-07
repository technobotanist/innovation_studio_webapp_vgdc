// Function to populate the list with links
var id_counter = 0;

//This class is for long term storage of information about the game that isn't used for initial loading of the game object such as how many times a game has been clicked on
class Game
{
  constructor(id, name, byline, json_src)
  {
    this.id = id;
    this.name = name;
    this.byline = byline;
    this.click_count = 0;
    this.json_src = json_src;
  }

  incrementClickCount()
  {
    this.click_count++;
  }
}

function getGameByName(name)
{
  for(let i = 0; i < game_list.length; i++)
  {
    if(game_list[i].name == name)
    {
      return game_list[i];
    }
  }
  return null;
}

var game_list = [];

// create a listitem using the json data and add it to the game list
function populateList(jsonData)
{
  const linkList = document.getElementById('game-list');
  const listItem = document.createElement('li');
  const link = document.createElement('a');
  var game = new Game(id_counter, jsonData.name, jsonData.creator, jsonData.json_src);
  game_list[id_counter] = game;
  link.href = "#";
  link.textContent = game.name;
  link.onclick = () => eval(jsonData.onclick);
  link.classList.add("section");
  link.id = game.id.toString();
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
