// Define the maze. 0 represents a path, 1 represents a wall, 2 represents the starting point, and 3 represents the end point.
let labirint = [["2001", "1100", "1101"], 
                ["0101", "0011", "0100"], 
                ["0011", "1110", "0131"]];
// Define the objects that can be found in each room.
let objekti =  [[[], [], [["luc", 4]]], 
                [[], [], []], 
                [[], [["luc", 8]], []]];
// Define the items in the player's inventory.
let inventar = [["luc", 5]];
// Define the player's starting location in the maze.
let lokacija = [0, 0];
// Define the entrance that the player used to enter the room.
let VrataPrihoda = 0;

// Main function for the game - LABYRINTH.
function labirintTajnica(text) {
  // If the player enters "zacetek", display instructions.
  if(text == "zacetek") {
    navodila();
  } 
  // If the player enters "cd {room number}", move to the specified room.
  else if(text.split(" ")[0] == "cd") { 
    premakniSe(text.split(" ")[1]);
  } 
  // If the player enters "ls", display what's in the current room.
  else if(text == "ls") {
    poglejOkoli();
  } 
  // If the player enters "inventar", display what's in the inventory.
  else if(text == "inventar") {
    poglejInventar();
  } 
  // If the player enters "poberi {object name}", pick up the object.
  else if(text.split(" ")[0] == "poberi") {
    poberi(text.split(" ")[1]);
  } 
  // If the player enters "odlozi {object name}", drop the object.
  else if(text.split(" ")[0] == "odlozi") {
    odlozi(text.split(" ")[1]);
  } 
  // If the player enters anything else, display an error message.
  else {
    echo("za tole pa se nimam ifa!")
  }
}

// Display instructions for the game.
function navodila() {
  echo("uporabi 'ls' da pogledas okoli sebe, 'cd {stevilka sobe}' da se premaknes v sobo, 'inventar' da preveris kaj imas v inventarju, 'poberi {ime objekta}' da poberes objekt in 'odlozi {ime objekta}' da objekt odlozis."); 
}

// Display a message indicating that the player has reached the end of the maze.
function cilj() { 
  echo("uspelo ti je, prisel si do cilja!");
  vLabirintu = false;
}

// Display the direction of a given door.
function smer(arg) {
  if(arg == 0) {
    return "sever";
  } else if(arg == 1) {
    return "vzhod";
  } else if(arg == 2) {
    return "jug";
  } else if(arg == 3) {
    return "zahod";
  }
}

// function to return the door value of a room
function prihod(vrata) {
  if(vrata == 0) {
    return 2;
  } else if(vrata == 1) {
    return 3;
  } else if(vrata == 2) {
    return 0;
  } else if(vrata == 3) {
    return 1;
  }
}

// function to return the index of an object in an array of objects
function index (seznam, iskano) {
  return seznam.findIndex((object) => object[0] == iskano);
}

// function to look around the current location and display relevant information
function poglejOkoli() {
  // check if the "luc" item is in the inventory, and display a message if not
  if (uporabi("luc") == false) {
    echo('ce hoces kaj videti rabis luc!');
  } else {
    // display location information
    echo("ozrl si se okoli sebe in zagledal ...")
    console.log("lokacija: ", lokacija, " vrataPrihoda: ", VrataPrihoda, " labirint[lokacija[0]][lokacija[1]]: ", labirint[lokacija[0]][lokacija[1]]);
    // display objects in the current location
    if (objekti[lokacija[0]][lokacija[1]].length > 0) {
      echo("na tleh lezi: ");
    }
    for(let j = 0; j < objekti[lokacija[0]][lokacija[1]].length; j++) {
      echo(" - "+objekti[lokacija[0]][lokacija[1]][j]);
    }
    // display possible directions to move
    echo("lahko gres: ")
    for(let i = 0; i < 4; i++) {
      if(labirint[lokacija[0]][lokacija[1]][i] == "0" || labirint[lokacija[0]][lokacija[1]][i] == "3") { 
        if(VrataPrihoda == i) {
          echo(" - na "+smer(i)+" kjer so vrata(st. "+(i)+"), skozi katera pa si tudi prisel");
        } else {
          echo(" - na "+smer(i)+" kjer so vrata(st. "+(i)+")")
        }
      }
    }
  }
}

f// This function moves the player to a new location based on the input door
function premakniSe(vrata) {
  vrata = parseInt(vrata); // Convert door input to integer
  let pomoc = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Array of direction vectors for each door
  if(labirint[lokacija[0]][lokacija[1]][vrata] == "0") { // If the door is open, move player to new location
    console.log("vrata", vrata, "prihod(vrata)", prihod(vrata)); // Log door input and exit location
    VrataPrihoda = prihod(vrata); // Set the exit location as the new destination
    lokacija[0] += pomoc[vrata][0]; // Update player row position
    lokacija[1] += pomoc[vrata][1]; // Update player column position
  } else if(labirint[lokacija[0]][lokacija[1]][vrata] == "3") { // If the door leads to the end goal, call the cilj function
    cilj();
  } else { // If the door is closed, log an error message
    echo("au, tole je bolelo. drugic preveri kje je zid in kje ne!");
  }
}

// This function picks up an object from the player's current location and adds it to their inventory
function poberi(arg) {
  const indexObjekta = index(objekti[lokacija[0]][lokacija[1]], arg); // Find the index of the specified object in the current location
  const indexObjekta2 = index(inventar, arg); // Find the index of the specified object in the inventory
  if (indexObjekta == -1) { // If the object is not found in the location, log an error message and return false
    echo("'"+arg+"' ni v sobi (in ga/je zato ne moras pobrati)")
    return false;
  } 
  if (indexObjekta2 != -1) {
    inventar[indexObjekta2][1] += objekti[lokacija[0]][lokacija[1]][indexObjekta][1];
  } else {
    inventar.push(objekti[lokacija[0]][lokacija[1]][indexObjekta]); // Add the object to the inventory
  }
  objekti[lokacija[0]][lokacija[1]].splice(indexObjekta, 1); // Remove the object from the location
  return true;
}

// This function drops an object from the player's inventory at their current location
function odlozi(arg) {
  const indexObjekta = index(inventar, arg); // Find the index of the specified object in the inventory
  const indexObjekta2 = index(objekti[lokacija[0]][lokacija[1]], arg); // Find the index of the specified object in the current location
  if (indexObjekta == -1) { // If the object is not found in the inventory, log an error message and return true
    echo("'"+arg+"' nimas v inventarju (in ga/je zato ne moras odloziti)")
    return true;
  }
  if (indexObjekta2 != -1) {
    objekti[lokacija[0]][lokacija[1]][indexObjekta2] += inventar[indexObjekta];
  } else {
    objekti[lokacija[0]][lokacija[1]].push(inventar[indexObjekta]); // Add the object to the current location
  }
  inventar.splice(indexObjekta, 1); // Remove the object from the inventory
}

// This function prints the contents of the player's inventory to the console.
function poglejInventar() {
  for (let i = 0; i < inventar.length; i++) {
    echo(' - '+inventar[i][0]); // prints the name of each item in the inventory
  }
  if (inventar.length == 0) {
    echo("nicesar nimas v inventarju") // prints a message if the inventory is empty
  }
}

// This function attempts to use an item from the player's inventory.
function uporabi(arg) {
  const indexObjekta = index(inventar, arg); // find the index of the item in the inventory
  if (indexObjekta == -1) {
    echo("'"+arg+"' nimas v inventarju (in ga/je zato ne moras uporabiti)") // prints an error message if the item is not in the inventory
    return false; // exit the function
  }
  if (inventar[indexObjekta][1] == 1) { // if this is the last use of the item
    echo("to je bila zadnja uporaba za "+arg); // print a message indicating that it was the last use
    inventar.slice(indexObjekta, 1); // remove the item from the inventory
  } else {
    echo(arg+" lahko uporabis se "+inventar[indexObjekta][1]-1); // print a message indicating how many uses are left
  }
  inventar[indexObjekta][1] --; // decrement the number of uses remaining for the item
  return true;
}
