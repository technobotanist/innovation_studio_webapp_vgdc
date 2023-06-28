/* function callWriteJSON(jsonData)
{
  // Call the React function from the separate script
  if (typeof window.writeJSON === 'function') {
    window.writeJSON(jsonData); // Call the function defined in the React component
  } else {
    console.error('React function not accessible.');
  }
}

function handlePageUnload()
{
    updateAllJSONFiles();
}

function updateAllJSONFiles()
{
    // Your function logic here
    for(let i = 0; i < game_list.length; i++)
    {
        callWriteJSON(game_list[i].toJSON());
    }
}

//window.addEventListener('beforeunload', handlePageUnload); */