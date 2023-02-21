// LABIRINT

class Labirint {
  constructor(t) {
    this.t = t;

    // Define the maze. 0 represents a path, 1 represents a wall, 2 represents the starting point, and 3 represents the end point.
    this.polje = [];
    // Define the objects that can be found in each room.
    this.objekti =  [];
    // Define the items in the player's inventory.
    this.inventar = [];
    // Define the player's starting location in the maze.
    this.lokacija = [];
    // Define the entrance that the player used to enter the room.
    this.VrataPrihoda = 0;

    this.navodila();
    this.setup();
  }

  // Main function for the game.
  tajnica(text) {
    // If the player enters "pomoc", display instructions.
    if(text == "pomoc") { 
      this.navodila();
    } 
    // If the player enters "cd {room number}", move to the specified room.
    else if(text.split(" ")[0] == "pojdi") { 
      this.premakniSe(text.split(" ")[1]);
    } 
    // If the player enters "ls", display what's in the current room.
    else if(text == "poglej") {
      this.poglejOkoli();
    } 
    // If the player enters "inventar", display what's in the inventory.
    else if(text == "inventar") {
      this.poglejInventar();
    } 
    // If the player enters "poberi {object name}", pick up the object.
    else if(text.split(" ")[0] == "poberi") {
      this.poberi(text.split(" ")[1]);
    } 
    // If the player enters "odlozi {object name}", drop the object.
    else if(text.split(" ")[0] == "odlozi") {
      this.odlozi(text.split(" ")[1]);
    } 
    // If the player enters anything else, display an error message.
    else {
      this.t.echo("za tole pa se nimam ifa!")
    }
  }

  setup() {
    // Define the maze. 0 represents a path, 1 represents a wall, 2 represents the starting point, and 3 represents the end point.
    this.polje = [["2001", "1100", "1101"], 
                  ["0101", "0011", "0100"], 
                  ["0011", "1110", "0131"]];
    // Define the objects that can be found in each room.
    this.objekti =  [[[], [], [["luc", 5]]], 
                     [[], [], []], 
                     [[], [["luc", 8]], []]];
    // Define the items in the player's inventory.
    this.inventar = [["luc", 5]];
    // Define the player's starting location in the maze.
    this.lokacija = [0, 0];
    // Define the entrance that the player used to enter the room.
    this.VrataPrihoda = 0;
  }

  // Display instructions for the game.
  navodila() {
    this.t.echo("Uporabi 'poglej' da pogledas okoli sebe (s tem porabis tudi eno uporabo luci), 'pojdi stevilka sobe' da se premaknes v sobo, 'inventar' da preveris kaj imas v inventarju (v lasti), 'poberi ime objekta' da poberes objekt in 'odlozi ime objekta' da objekt odlozis.\nNamig: stevilke sobe niso nakljucno dodeljene ampak so tako, da 0 pomeni sever, 1 pomeni vzhod, 2 pomeni jug in 3 zahod"); 
  }

  // Display a message indicating that the player has reached the end of the maze.
  cilj() { 
    this.t.echo("Uspelo ti je, prisel si do cilja!");
    vTeku = "";
  }

  // Display the direction of a given door.
  smer(arg) {
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

  // function to return the coming door value of a room
  prihod(vrata) {
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
  index (seznam, iskano) {
    return seznam.findIndex((object) => object[0] == iskano);
  }

  // function to look around the current location and display relevant information
  poglejOkoli() {
    // check if the "luc" item is in the inventory, and display a message if not
    if (this.uporabi("luc") == false) {
      this.t.echo('Ce hoces kaj videti rabis luc!');
    } else {
      // log location information
      // console.log("lokacija: ", lokacija, " vrataPrihoda: ", VrataPrihoda, " labirint[lokacija[0]][lokacija[1]]: ", labirint[lokacija[0]][lokacija[1]]);
      // display objects in the current location
      if (this.objekti[this.lokacija[0]][this.lokacija[1]].length > 0) {
        this.t.echo("Na tleh lezi: ");
      }
      for(let j = 0; j < this.objekti[this.lokacija[0]][this.lokacija[1]].length; j++) {
        this.t.echo(" - "+this.objekti[this.lokacija[0]][this.lokacija[1]][j][0]+" "+this.objekti[this.lokacija[0]][this.lokacija[1]][j][1]);
      }
      // display possible directions to move
      this.t.echo("Lahko gres: ")
      for(let i = 0; i < 4; i++) {
        if(this.polje[this.lokacija[0]][this.lokacija[1]][i] == "0" || this.polje[this.lokacija[0]][this.lokacija[1]][i] == "3") { 
          if(this.VrataPrihoda == i) {
            this.t.echo(" - na "+this.smer(i)+" kjer so vrata st. "+(i)+", skozi katera pa si tudi prisel");
          } else {
            this.t.echo(" - na "+this.smer(i)+" kjer so vrata st. "+(i));
          }
        }
      }
    }
  }

  // This function moves the player to a new location based on the input door
  premakniSe(vrata) {
    vrata = parseInt(vrata); // Convert door input to integer
    let pomoc = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Array of direction vectors for each door
    if(this.polje[this.lokacija[0]][this.lokacija[1]][vrata] == "0") { // If the door is open, move player to new location
      // console.log("vrata", vrata, "prihod(vrata)", prihod(vrata)); // Log door input and exit location
      this.VrataPrihoda = this.prihod(vrata); // Set the exit location as the new destination
      this.lokacija[0] += pomoc[vrata][0]; // Update player row position
      this.lokacija[1] += pomoc[vrata][1]; // Update player column position
    } else if(this.polje[this.lokacija[0]][this.lokacija[1]][vrata] == "3") { // If the door leads to the end goal, call the cilj function
      this.cilj();
    } else { // If the door is closed, log an error message
      this.t.echo("Au, tole je bolelo. drugic preveri kje je zid in kje ne!");
    }
  }

  // This function picks up an object from the player's current location and adds it to their inventory
  poberi(arg) {
    const indexObjekta = this.index(this.objekti[this.lokacija[0]][this.lokacija[1]], arg); // Find the index of the specified object in the current location
    const indexObjekta2 = this.index(this.inventar, arg); // Find the index of the specified object in the inventory
    if (indexObjekta == -1) { // If the object is not found in the location, log an error message and return false
      this.t.echo("'"+arg+"' ni v sobi (in ga/je zato ne moras pobrati)")
      return false;
    } 
    if (indexObjekta2 != -1) {
      this.inventar[indexObjekta2][1] += this.objekti[this.lokacija[0]][this.lokacija[1]][indexObjekta][1];
    } else {
      this.inventar.push(this.objekti[this.lokacija[0]][this.lokacija[1]][indexObjekta]); // Add the object to the inventory
    }
    this.objekti[this.lokacija[0]][this.lokacija[1]].splice(indexObjekta, 1); // Remove the object from the location
    return true;
  }

  // This function drops an object from the player's inventory at their current location
  odlozi(arg) {
    const indexObjekta = this.index(this.inventar, arg); // Find the index of the specified object in the inventory
    const indexObjekta2 = this.index(this.objekti[this.lokacija[0]][this.lokacija[1]], arg); // Find the index of the specified object in the current location
    if (indexObjekta == -1) { // If the object is not found in the inventory, log an error message and return true
      this.t.echo("'"+arg+"' nimas v inventarju (in ga/je zato ne moras odloziti)")
      return true;
    }
    if (indexObjekta2 != -1) {
      this.objekti[this.lokacija[0]][this.lokacija[1]][indexObjekta2] += this.inventar[indexObjekta];
    } else {
      this.objekti[this.lokacija[0]][this.lokacija[1]].push(this.inventar[indexObjekta]); // Add the object to the current location
    }
    this.inventar.splice(indexObjekta, 1); // Remove the object from the inventory
  }

  // This function prints the contents of the player's inventory to the console.
  poglejInventar() {
    for (let i = 0; i < this.inventar.length; i++) {
      this.t.echo(' - '+this.inventar[i][0]+" "+this.inventar[i][1]); // prints the name of each item in the inventory
    }
    if (this.inventar.length == 0) {
      this.t.echo("Nicesar nimas v inventarju"); // prints a message if the inventory is empty
    }
  }

  // This function attempts to use an item from the player's inventory.
  uporabi(arg) {
    const indexObjekta = this.index(this.inventar, arg); // find the index of the item in the inventory
    // console.log("index objekta: ", indexObjekta);
    if (indexObjekta == -1) {
      this.t.echo("'"+arg+"' nimas v inventarju (in ga/je zato ne moras uporabiti)") // prints an error message if the item is not in the inventory
      return false; // exit the function
    }
    if (this.inventar[indexObjekta][1] == 1) { // if this is the last use of the item
      // console.log("samo se ena uporaba");
      this.t.echo("To je bila zadnja uporaba za "+arg); // print a message indicating that it was the last use
      this.inventar.splice(indexObjekta, 1); // remove the item from the inventory
      return true;
    } else {
      // console.log("se nekaj uporab");
      this.t.echo(arg+" lahko uporabis se "+(this.inventar[indexObjekta][1]-1)+"x."); // print a message indicating how many uses are left
    }
    this.inventar[indexObjekta][1] --; // decrement the number of uses remaining for the item
    return true;
  }
}

