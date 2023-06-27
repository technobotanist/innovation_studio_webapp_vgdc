/* function getGameByTitle(title)
{
  for(let i = 0; i < game_list.length; i++)
  {
    if(game_list[i].title == title)
    {
      return game_list[i];
    }
  }
  return null;
}

function setAllGamesVisible()
{
  for(let i = 0; i < game_list.length; i++)
  {
    game_list[i].visible = true;
  }
}

//will set the visible attribute of games that contain all the genres passed in list of genres
function setVisibleByGenres(genres)
{
  setAllGamesVisible();
  for(let i = 0; i < game_list.length; i++)
  {
    for(let j = 0; j < genres.length; j++)
    {
      if(!game_list[i].genres.includes(genres[j]))
      {
        game_list[i].visible = false;
        break;
      }
    }
  }
}

function sortListByClickCount()
{
  var list = document.getElementById('game-list');

  // Get all the list items
  var listItems = Array.from(list.getElementsByTagName('li'));

  // Sort the list items based on the click counts
  listItems.sort(function(a, b) {
    var aClicks = parseInt(getGameByTitle(a.textContent).click_count);
    var bClicks = parseInt(getGameByTitle(b.textContent).click_count);

    return bClicks - aClicks;
  });

  // Reorder the list items in the DOM
  listItems.forEach(function(item) {
    list.appendChild(item);
  });
}

function sortListByNewest()
{
  var list = document.getElementById('game-list');

  // Get all the list items
  var listItems = Array.from(list.getElementsByTagName('li'));
  listItems.sort(function(a, b) {
    aDate = new Date(getGameByTitle(a.textContent).date_added);
    bDate = new Date(getGameByTitle(b.textContent).date_added);
    return bDate - aDate;
  }); 

  listItems.forEach(function(item) {
    list.appendChild(item);
  });
}

function sortListByOldest()
{
  var list = document.getElementById('game-list');

  // Get all the list items
  var listItems = Array.from(list.getElementsByTagName('li'));
  listItems.sort(function(a, b) {
    aDate = new Date(getGameByTitle(a.textContent).date_added);
    bDate = new Date(getGameByTitle(b.textContent).date_added);
    return aDate - bDate;
  }); 

  listItems.forEach(function(item) {
    list.appendChild(item);
  });
} */