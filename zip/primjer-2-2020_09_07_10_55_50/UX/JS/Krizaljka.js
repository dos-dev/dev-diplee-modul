/*----------------------------------------------------------------------------*/
/* INICIJALIZACIJA                                                            */
/*----------------------------------------------------------------------------*/

CrosswordWidth = 14;
CrosswordHeight = 17;
Words = 11;
WordLength = new Array(8, 5, 8, 7, 4, 8, 5, 9, 11, 5, 7);
Word = new Array("APPAREIL", "DROLE", "LUNETTES", "MECHANT", "YEUX", "CURIEUSE", "GRAND", "MOUSTACHE", "SYMPATHIQUE", "LONGS", "CHEVEUX");
Clue = new Array(
"photo ou dentaire", 
"si tu n'es pas sérieux, tu es", 
"on les porte si on ne voit pas bien", 
"si tu n'es pas gentil, tu es", 
"ils peuvent être verts, bleus, marron…", 
"elle veut tout savoir, elle est", 
"si tu n'es pas petit, tu es", 
"Charlie Chaplin porte une", 
"si tu n'es pas antipathique, tu es", 
"si tes cheveux ne sont pas courts, ils sont", 
"ils peuvent être blonds, bruns, roux...");
AnswerHash = new Array(15969, 44204, 72169, 5514, 25271, 73563, 585, 60309, 53352, 56447, 49978);
WordX = new Array(0, 4, 1, 4, 5, 6, 4, 6, 10, 1, 13);
WordY = new Array(1, 4, 7, 9, 11, 14, 0, 3, 4, 7, 10);
LastHorizontalWord = 5;
OnlyCheckOnce = false;

/*----------------------------------------------------------------------------*/

$(window).on("load resize", function() {
  if ($(window).width() < 700)
  {
    $("#welcomemessage").css({"bottom": "0", "top": "auto", "margin": "0"});
    $("#puzzle").css({"margin-top": "0px"});
    $("#wordlabel").hide();
  } else {
    $("#welcomemessage").css({"bottom": "auto", "top": "0"});
    $("#wordlabel").show();
    $("#puzzle").css({"margin-top": "55px"});
  }
});

/*----------------------------------------------------------------------------*/
/* FUNKCIJE                                                                   */
/*----------------------------------------------------------------------------*/

var BadChars = "`~!@^*()_={[}]\\|:;\"',<>/?";
let AlgebraTable = "";
var TableAcrossWord, TableDownWord;
var CurrentWord, PrevWordHorizontal, x, y, i, j;
var CrosswordFinished, Initialized;

// Check the user's browser and then initialize the puzzle.
if (document.getElementById("waitmessage") != null) {
  document.getElementById("waitmessage").innerHTML =
    "Pričekajte dok se učita križaljka...";

  // Current game variables
  CurrentWord = -1;
  PrevWordHorizontal = false;

  // Create the cell-to-word arrays.
  TableAcrossWord = new Array(CrosswordWidth);
  for (var x = 0; x < CrosswordWidth; x++)
    TableAcrossWord[x] = new Array(CrosswordHeight);
  TableDownWord = new Array(CrosswordWidth);
  for (var x = 0; x < CrosswordWidth; x++)
    TableDownWord[x] = new Array(CrosswordHeight);
  for (var y = 0; y < CrosswordHeight; y++)
    for (var x = 0; x < CrosswordWidth; x++) {
      TableAcrossWord[x][y] = -1;
      TableDownWord[x][y] = -1;
    }

  // First, add the horizontal words to the puzzle.
  for (var i = 0; i <= LastHorizontalWord; i++) {
    x = WordX[i];
    y = WordY[i];
    for (var j = 0; j < WordLength[i]; j++) {
      TableAcrossWord[x + j][y] = i;
    }
  }

  // Second, add the vertical words to the puzzle.
  for (var i = LastHorizontalWord + 1; i < Words; i++) {
    x = WordX[i];
    y = WordY[i];
    for (var j = 0; j < WordLength[i]; j++) {
      TableDownWord[x][y + j] = i;
    }
  }

  // Now, insert the crossword table.
  AlgebraTable +=
    '<table id="crossword" cellpadding="0" cellspacing="0" style="display: none; border-collapse: collapse; margin: auto;">';
  for (var y = 0; y < CrosswordHeight; y++) {
    AlgebraTable += "<tr>";
    for (var x = 0; x < CrosswordWidth; x++) {
      if (TableAcrossWord[x][y] >= 0 || TableDownWord[x][y] >= 0)
        AlgebraTable +=
          '<td id="c' +
          PadNumber(x) +
          PadNumber(y) +
          '" class="ecw-box ecw-boxnormal_unsel" onclick="SelectThisWord(event);">&nbsp;</td>';
      else AlgebraTable += "<td></td>";
    }
    AlgebraTable += "</tr>";
  }
  AlgebraTable += "</table>";
  $(".ecw-crosswordarea").html(AlgebraTable);

  // Finally, show the crossword and hide the wait message.
  Initialized = true;
  document.getElementById("waitmessage").style.display = "none";
  document.getElementById("crossword").style.display = "table";
}

// * * * * * * * * * *
// Event handlers

// Raised when a key is pressed in the word entry box.
function WordEntryKeyPress(event) {
  if (CrosswordFinished) return;
  // Treat an Enter keypress as an OK click.
  if (CurrentWord >= 0 && event.keyCode == 13) OKClick();
}

// * * * * * * * * * *
// Helper functions

// Called when we're ready to start the crossword.
function BeginCrossword() {
  if (Initialized) {
    document.getElementById("welcomemessage").style.display = "";
    document.getElementById("checkbutton").style.display = "";
  }
}

// Returns true if the string passed in contains any characters prone to evil.
function ContainsBadChars(theirWord) {
  for (var i = 0; i < theirWord.length; i++)
    if (BadChars.indexOf(theirWord.charAt(i)) >= 0) return true;
  return false;
}

// Pads a number out to three characters.
function PadNumber(number) {
  if (number < 10) return "00" + number;
  else if (number < 100) return "0" + number;
  else return "" + number;
}

// Returns the table cell at a particular pair of coordinates.
function CellAt(x, y) {
  return document.getElementById("c" + PadNumber(x) + PadNumber(y));
}

// Deselects the current word, if there's a word selected.  DOES not change the value of CurrentWord.
function DeselectCurrentWord() {
  if (CurrentWord < 0) return;
  var x, y, i;

  document.getElementById("answerbox").style.display = "none";
  document.getElementById("questbox").style.display = "block";
  ChangeCurrentWordSelectedStyle(false);
  CurrentWord = -1;
}

// Changes the style of the cells in the current word.
function ChangeWordStyle(WordNumber, NewStyle) {
  if (WordNumber < 0) return;
  var x = WordX[WordNumber];
  var y = WordY[WordNumber];

  if (WordNumber <= LastHorizontalWord)
    for (i = 0; i < WordLength[WordNumber]; i++)
      CellAt(x + i, y).className = NewStyle;
  else
    for (i = 0; i < WordLength[WordNumber]; i++)
      CellAt(x, y + i).className = NewStyle;
}

// Changes the style of the cells in the current word between the selected/unselected form.
function ChangeCurrentWordSelectedStyle(IsSelected) {
  if (CurrentWord < 0) return;
  var x = WordX[CurrentWord];
  var y = WordY[CurrentWord];

  if (CurrentWord <= LastHorizontalWord)
    for (i = 0; i < WordLength[CurrentWord]; i++)
      CellAt(x + i, y).className = CellAt(x + i, y).className.replace(
        IsSelected ? "_unsel" : "_sel",
        IsSelected ? "_sel" : "_unsel"
      );
  else
    for (i = 0; i < WordLength[CurrentWord]; i++)
      CellAt(x, y + i).className = CellAt(x, y + i).className.replace(
        IsSelected ? "_unsel" : "_sel",
        IsSelected ? "_sel" : "_unsel"
      );
}

// Selects the new word by parsing the name of the TD element referenced by the
// event object, and then applying styles as necessary.
function SelectThisWord(event) {
  if (CrosswordFinished) return;
  var x, y, i, TheirWord, TableCell;

  // Deselect the previous word if one was selected.
  document.getElementById("welcomemessage").style.display = "none";
  //document.getElementById("poticajnaPoruka").style.display = "block";
  if (CurrentWord >= 0) OKClick();
  DeselectCurrentWord();

  // Determine the coordinates of the cell they clicked, and then the word that
  // they clicked.
  var target = event.srcElement ? event.srcElement : event.target;
  x = parseInt(target.id.substring(1, 4), 10);
  y = parseInt(target.id.substring(4, 7), 10);

  // If they clicked an intersection, choose the type of word that was NOT selected last time.
  if (TableAcrossWord[x][y] >= 0 && TableDownWord[x][y] >= 0)
    CurrentWord = PrevWordHorizontal
      ? TableDownWord[x][y]
      : TableAcrossWord[x][y];
  else if (TableAcrossWord[x][y] >= 0) CurrentWord = TableAcrossWord[x][y];
  else if (TableDownWord[x][y] >= 0) CurrentWord = TableDownWord[x][y];

  PrevWordHorizontal = CurrentWord <= LastHorizontalWord;

  // Now, change the style of the cells in this word.
  ChangeCurrentWordSelectedStyle(true);

  // Then, prepare the answer box.
  x = WordX[CurrentWord];
  y = WordY[CurrentWord];
  TheirWord = "";
  var TheirWordLength = 0;
  for (i = 0; i < WordLength[CurrentWord]; i++) {
    // Find the appropriate table cell.
    if (CurrentWord <= LastHorizontalWord) TableCell = CellAt(x + i, y);
    else TableCell = CellAt(x, y + i);
    // Add its contents to the word we're building.
    if (
      TableCell.innerHTML != null &&
      TableCell.innerHTML.length > 0 &&
      TableCell.innerHTML != " " &&
      TableCell.innerHTML.toLowerCase() != "&nbsp;"
    ) {
      TheirWord += TableCell.innerHTML.toUpperCase();
      TheirWordLength++;
    } else {
      TheirWord += "&bull;";
    }
  }

  document.getElementById("wordlabel").innerHTML = TheirWord;
  document.getElementById("wordinfo").innerHTML =
    (CurrentWord <= LastHorizontalWord ? "Prijeko, " : "Dolje, ") +
    WordLength[CurrentWord] +
    " slova.";
  document.getElementById("wordclue").innerHTML = Clue[CurrentWord];
  document.getElementById("worderror").style.display = "none";
  document.getElementById("cheatbutton").style.display =
    Word.length == 0 ? "none" : "";
  if (TheirWordLength == WordLength[CurrentWord])
    document.getElementById("wordentry").value = TheirWord.replace(
      /&AMP;/g,
      "&"
    );
  else document.getElementById("wordentry").value = "";

  // Finally, show the answer box.
  document.getElementById("answerbox").style.display = "block";
  document.getElementById("questbox").style.display = "none";
  try {
    document.getElementById("wordentry").focus();
    document.getElementById("wordentry").select();
  } catch (e) {}
}

// Called when the user clicks the OK link.
function OKClick() {
  var TheirWord, x, y, i, TableCell;
  if (CrosswordFinished) return;
  if (document.getElementById("okbutton").disabled) return;

  // First, validate the entry.
  TheirWord = document.getElementById("wordentry").value.toUpperCase();
  if (TheirWord.length == 0) {
    DeselectCurrentWord();
    return;
  }
  if (ContainsBadChars(TheirWord)) {
    document.getElementById("worderror").innerHTML =
      "Le mot que vous avez saisi contient des caractères non valides...";
    document.getElementById("worderror").style.display = "block";
    return;
  }
  if (TheirWord.length < WordLength[CurrentWord]) {
    document.getElementById("worderror").innerHTML =
      "Vous n'avez pas entré suffisamment de lettres. Le mot contient " +
      WordLength[CurrentWord] +
      " lettres.";
    document.getElementById("worderror").style.display = "block";
    return;
  }
  if (TheirWord.length > WordLength[CurrentWord]) {
    document.getElementById("worderror").innerHTML =
      "Vous avez tapé trop de lettres. Le mot contient " +
      WordLength[CurrentWord] +
      " lettres.";
    document.getElementById("worderror").style.display = "block";
    return;
  }

  // If we made it this far, they typed an acceptable word, so add these letters to the puzzle and hide the entry box.
  x = WordX[CurrentWord];
  y = WordY[CurrentWord];
  for (i = 0; i < TheirWord.length; i++) {
    TableCell = CellAt(
      x + (CurrentWord <= LastHorizontalWord ? i : 0),
      y + (CurrentWord > LastHorizontalWord ? i : 0)
    );
    TableCell.innerHTML = TheirWord.substring(i, i + 1);
  }
  DeselectCurrentWord();
}

// Called when the "check puzzle" link is clicked.
function CheckClick() {
  var i,
    j,
    x,
    y,
    UserEntry,
    ErrorsFound = 0,
    EmptyFound = 0,
    TableCell;
  if (CrosswordFinished) return;
  DeselectCurrentWord();

  for (y = 0; y < CrosswordHeight; y++)
    for (x = 0; x < CrosswordWidth; x++)
      if (TableAcrossWord[x][y] >= 0 || TableDownWord[x][y] >= 0) {
        TableCell = CellAt(x, y);
        if (TableCell.className == "ecw-box ecw-boxerror_unsel")
          TableCell.className = "ecw-box ecw-boxnormal_unsel";
      }

  for (i = 0; i < Words; i++) {
    // Get the user's entry for this word.
    UserEntry = "";
    for (j = 0; j < WordLength[i]; j++) {
      if (i <= LastHorizontalWord) TableCell = CellAt(WordX[i] + j, WordY[i]);
      else TableCell = CellAt(WordX[i], WordY[i] + j);
      if (
        TableCell.innerHTML.length > 0 &&
        TableCell.innerHTML.toLowerCase() != "&nbsp;"
      ) {
        UserEntry += TableCell.innerHTML.toUpperCase();
      } else {
        UserEntry = "";
        EmptyFound++;
        break;
      }
    }
    UserEntry = UserEntry.replace(/&AMP;/g, "&");
    // If this word doesn't match, it's an error.
    if (HashWord(UserEntry) != AnswerHash[i] && UserEntry.length > 0) {
      ErrorsFound++;
      ChangeWordStyle(i, "ecw-box ecw-boxerror_unsel");
    }
  }

  // If they can only check once, disable things prematurely.
  if (OnlyCheckOnce) {
    CrosswordFinished = true;
    document.getElementById("checkbutton").style.display = "none";
  }

  // If errors were found, just exit now.
  if (ErrorsFound > 0 && EmptyFound > 0)
    document.getElementById("welcomemessage").innerHTML =
      ErrorsFound +
      (ErrorsFound > 1 ? " les erreurs" : " erreur") +
      " i " +
      EmptyFound +
      (EmptyFound > 1 ? " mots pas trouvés." : " mots pas trouvés.") +
      " trouvé.";
  else if (ErrorsFound > 0)
    document.getElementById("welcomemessage").innerHTML =
      ErrorsFound +
      (ErrorsFound > 1 ? " les erreurs sont" : " c'est une erreur") +
      " trouvé.";
  else if (EmptyFound > 0) $("#welcomemessage").addClass("alert-danger");
  document.getElementById("welcomemessage").innerHTML =
    ' <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Il n\'y a pas d\'erreur, mais il y a ' +
    EmptyFound +
    (EmptyFound > 1 ? " mots pas trouvés." : " mots pas trouvés.") +
    ".";

  if (ErrorsFound + EmptyFound > 0) {
    document.getElementById("welcomemessage").style.display = "";
    return;
  }

  // They finished the puzzle!
  CrosswordFinished = true;
  document.getElementById("checkbutton").style.display = "none";
  document.getElementById("congratulations").style.display = "block";
  document.getElementById("welcomemessage").style.display = "none";
}

// Called when the "cheat" link is clicked.
function CheatClick() {
  if (CrosswordFinished) return;
  var OldWord = CurrentWord;
  document.getElementById("wordentry").value = Word[CurrentWord];
  OKClick();
  ChangeWordStyle(OldWord, "ecw-box ecw-boxcheated_unsel");
}

// Returns a one-way hash for a word.
function HashWord(Word) {
  var x = (Word.charCodeAt(0) * 719) % 1138;
  var Hash = 837;
  var i;
  for (i = 1; i <= Word.length; i++)
    Hash = (Hash * i + 5 + (Word.charCodeAt(i - 1) - 64) * x) % 98503;
  return Hash;
}

/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------*/
/* START                                                                      */
/*----------------------------------------------------------------------------*/

BeginCrossword();

/*----------------------------------------------------------------------------*/
