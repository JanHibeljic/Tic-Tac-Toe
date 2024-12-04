// Array für den aktuellen Zustand der Felder
let fields = [null, null, null, null, null, null, null, null, null];

function init() {
  render();
}

// Variable, um den aktuellen Spieler zu tracken ('cross' oder 'circle')
let currentPlayer = "cross";

// Funktion zum Rendern der Tabelle
function render() {
  const content = document.getElementById("content");
  let html = "<table>";

  for (let i = 0; i < 3; i++) {
    html += "<tr>";
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      const fieldClass = fields[index] || "";
      html += `<td class="${fieldClass}" onclick="makeMove(${index})">${
        fields[index] ? (fields[index] === "cross" ? "X" : "O") : ""
      }</td>`;
    }
    html += "</tr>";
  }

  html += "</table>";
  content.innerHTML = html;
}

// Funktion, um einen Zug zu machen
function makeMove(index) {
  if (!fields[index]) {
    fields[index] = currentPlayer; // Setze den aktuellen Spieler ins Feld
    if (checkWin()) {
      setTimeout(() => {
        alert(`${currentPlayer === "cross" ? "X" : "O"} hat gewonnen!`);
        resetGame();
      }, 100);
    } else if (checkDraw()) {
      setTimeout(() => {
        alert("Unentschieden!");
        resetGame();
      }, 100);
    } else {
      currentPlayer = currentPlayer === "cross" ? "circle" : "cross"; // Wechsle den Spieler
      render(); // Aktualisiere die Ansicht
    }
  }
}

// Funktion, um den Gewinn zu prüfen
function checkWin() {
  const winPatterns = [
    [0, 1, 2], // obere Reihe
    [3, 4, 5], // mittlere Reihe
    [6, 7, 8], // untere Reihe
    [0, 3, 6], // linke Spalte
    [1, 4, 7], // mittlere Spalte
    [2, 5, 8], // rechte Spalte
    [0, 4, 8], // Diagonale von oben links nach unten rechts
    [2, 4, 6], // Diagonale von oben rechts nach unten links
  ];

  return winPatterns.some(
    (pattern) =>
      fields[pattern[0]] === currentPlayer &&
      fields[pattern[1]] === currentPlayer &&
      fields[pattern[2]] === currentPlayer
  );
}

// Funktion, um ein Unentschieden zu prüfen
function checkDraw() {
  return fields.every((field) => field !== null); // Alle Felder sind belegt
}

// Funktion, um das Spiel zurückzusetzen
function resetGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  currentPlayer = "cross";
  render();
}

// Initialisiere das Spiel
init();
