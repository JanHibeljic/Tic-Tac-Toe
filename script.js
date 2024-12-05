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
      html += `<td class="${fieldClass}" onclick="makeMove(${index})">`;

      // Wenn das Feld "cross" oder "circle" ist, setze den entsprechenden Inhalt
      if (fields[index] === "cross") {
        html += generateCrossSVG();
      } else if (fields[index] === "circle") {
        html += generateCircleSVG(); // SVG für den Kreis einfügen
      }

      html += "</td>";
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

    // Das geklickte Feld direkt anpassen
    const cell = document.querySelectorAll("td")[index];
    if (currentPlayer === "cross") {
      cell.innerHTML = generateCrossSVG(); // Animiertes X einfügen
      cell.classList.add("cross"); // Optional: Klasse für Styling hinzufügen
    } else {
      cell.innerHTML = generateCircleSVG(); // Animiertes O einfügen
      cell.classList.add("circle"); // Optional: Klasse für Styling hinzufügen
    }

    // Prüfe auf Gewinn oder Unentschieden
    if (checkWin()) {
      setTimeout(() => {
        alert(`${currentPlayer === "cross" ? "X" : "O"} hat gewonnen!`);
        resetGame();
      }, 300); //verzögerung auf 0.3s
    } else if (checkDraw()) {
      setTimeout(() => {
        alert("Unentschieden!");
        resetGame();
      }, 300); //verzögerung auf 0.3s
    } else {
      // Spieler wechseln
      currentPlayer = currentPlayer === "cross" ? "circle" : "cross";
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

function generateCircleSVG() {
  return `
  <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
    <circle 
      cx="35" 
      cy="35" 
      r="30" 
      fill="none" 
      stroke="#00B0EF" 
      stroke-width="5" 
      stroke-dasharray="188.4" 
      stroke-dashoffset="188.4">
      <animate 
        attributeName="stroke-dashoffset" 
        from="188.4" 
        to="0" 
        dur="0.2s" 
        repeatCount="1" 
        fill="freeze" />
    </circle>
  </svg>`;
}

function generateCrossSVG() {
  return `
  <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
    <!-- Linie von oben links nach unten rechts -->
    <line x1="10" y1="10" x2="60" y2="60" stroke="yellow" stroke-width="5" stroke-linecap="round">
      <animate 
        attributeName="x2" 
        from="10" 
        to="60" 
        dur="0.2s" 
        fill="freeze" />
      <animate 
        attributeName="y2" 
        from="10" 
        to="60" 
        dur="0.2s" 
        fill="freeze" />
    </line>
    
    <!-- Linie von oben rechts nach unten links -->
    <line x1="60" y1="10" x2="10" y2="60" stroke="yellow" stroke-width="5" stroke-linecap="round">
      <animate 
        attributeName="x2" 
        from="60" 
        to="10" 
        dur="0.2s" 
        fill="freeze" />
      <animate 
        attributeName="y2" 
        from="10" 
        to="60" 
        dur="0.2s" 
        fill="freeze" />
    </line>
  </svg>`;
}
