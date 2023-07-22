// OBESANJE

class Obesanje {
  constructor(t) {
    this.t = t;
    // define all posible words for 1 player game
    this.besede = ["banana", "aeroplan", "letalo", "balon", "koscica", "zmagovalec", "ples", "nakovalo", "odsev", "horizont", "orpedolog", "psihiater", "nakljucje", "podezelje", "pandemija", "kolokvij", "kronologija", "monarhija", "plazilec", "limuzina", "koprena", "tancica", "baldahin", "mrzlica", "neskoncnost", "kraljica", "pralnica", "mamica", "preverjenost", "kvaliteta", "postrv", "trepalnica", "popravljanje", "kositer"];
    // define word for guessing
    this.beseda = "";
    // define how many players will play game
    this.stIgracev = -1;
    // define user guesing
    this.najdeno = "";
    this.stPoskusov = 0;

    this.zacetek = true

    this.navodila();
    this.stPoskusov = 12;
  }

  // Main function for the game.
  tajnica(text) {
    // If the player enters "pomoc", display instructions.
    if(text == "pomoc") { 
      this.navodila();
    } 
    else if(this.zacetek == true && text == "1") { 
      this.stIgracev = 1;
      this.beseda = this.besede[this.getRandomInt(this.besede.length)];
      this.setup();
      this.zacetek = false;
      this.izpisi();
    } 
    else if (text.split(" ")[0] == "2" && text.split(" ").length == 2 && this.zacetek == true) {
      this.stIgracev = 2;
      this.beseda = text.split(" ")[1];
      this.setup();
      this.zacetek = false;
      this.t.undo();
      this.izpisi();
    }
    else if(text.length == 1 && this.zacetek == false) {
      this.ugibaj(text);
    } 
    else {
      this.t.echo("Za tole pa se nimam ifa!")
    }
  }

  getRandomInt(n) {
    return Math.floor(Math.random() * n);
  }

  // Display instructions for the game.
  navodila() {
    this.t.echo("V prvi vrstici napisi koliko ljudi bo igralo (1 ali 2). Ce izberes 2 napisi zraven se besedo katero bo drugi ugibal. Ugibas tako, da enostavno napises crko, vedno pa lahko napises pomoc da ti se ti izpisejo ta navodila.\nPOZOR: ni sumnikov in velikih crk!"); 
  }

  setup() {
    for (let i = 0; i < this.beseda.length; i++) {
      this.najdeno += "_ ";
    }
  }

  izpisi() {
    this.t.echo ("Se "+this.stPoskusov+"x lahko ugibas")
    this.t.echo (this.najdeno);
  }

  vsiIndexi(s, iskano) {
    let ret = [];
    for (let i = 0; i < s.length; i++) {
      if (s[i] == iskano) {
        ret.push(i);
      }
    }
    return ret;
  }

  konec() {
    if (this.najdeno.split(" ").join("") == this.beseda.split("").join("")) {
      this.t.echo ("Bravo, ugotovil si besedo!");
      vTeku = "";
    } else if (this.stPoskusov == 0) {
      this.t.echo ("Au, tole pa se ni koncalo najbolje zate! Beseda je bila "+this.beseda+".");
      vTeku = "";
    }
  }

  ugibaj(crka) {
    let indexi = this.vsiIndexi(this.beseda, crka);
    if (indexi.length == 0) {
      this.t.echo ("Noup!");
      this.stPoskusov--;
    } else {
      this.t.echo ("Jap!");
      let arr = this.najdeno.split(" ");
      for (let i = 0; i < indexi.length; i++) {
        arr[indexi[i]] = crka;
      }
      this.najdeno = arr.join(" ");
    }
    this.izpisi();
    this.konec();
  }
}
