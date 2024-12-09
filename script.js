// Array für den aktuellen Zustand der Felder
let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "cross"; // Startspieler
let winLine = null; // Referenz für die Gewinnlinie

function init() {
  render();
  updateStatus();
}

// Funktion zum Rendern der Tabelle
function render() {
  const content = document.getElementById("content");
  let html = "<table>";

  for (let i = 0; i < 3; i++) {
    html += "<tr>";
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      const fieldClass = fields[index] || "";
      html += `<td class="${fieldClass}" onclick="makeMove(${index})" id="cell-${index}">`;

      if (fields[index] === "cross") {
        html += generateCrossSVG();
      } else if (fields[index] === "circle") {
        html += generateCircleSVG();
      }

      html += "</td>";
    }
    html += "</tr>";
  }

  html += "</table>";
  content.innerHTML = html;
}

// Funktion, um den Status zu aktualisieren
function updateStatus(message = null) {
  const status = document.getElementById("status");
  if (message) {
    status.textContent = message;
  } else {
    status.textContent =
      currentPlayer === "cross" ? "Player 1's turn" : "Player 2's turn";
  }
}

// Funktion, um einen Zug zu machen
function makeMove(index) {
  if (!fields[index]) {
    fields[index] = currentPlayer;

    const cell = document.querySelectorAll("td")[index];
    if (currentPlayer === "cross") {
      cell.innerHTML = generateCrossSVG();
      cell.classList.add("cross");
    } else {
      cell.innerHTML = generateCircleSVG();
      cell.classList.add("circle");
    }

    const winPattern = checkWin();
    if (winPattern) {
      drawWinLine(winPattern);
      updateStatus(
        currentPlayer === "cross" ? "Player 1 wins!" : "Player 2 wins!"
      );
      disableBoard();
    } else if (checkDraw()) {
      updateStatus("DRAW");
    } else {
      currentPlayer = currentPlayer === "cross" ? "circle" : "cross";
      updateStatus();
    }
  }
}

// Funktion, um das Spielfeld zu deaktivieren
function disableBoard() {
  document.querySelectorAll("td").forEach((cell) => {
    cell.onclick = null;
  });
}

// Funktion, um den Gewinn zu prüfen
function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    if (
      fields[pattern[0]] === currentPlayer &&
      fields[pattern[1]] === currentPlayer &&
      fields[pattern[2]] === currentPlayer
    ) {
      return pattern;
    }
  }
  return null;
}

// Funktion, um ein Unentschieden zu prüfen
function checkDraw() {
  return fields.every((field) => field !== null);
}

// Funktion, um das Spiel zurückzusetzen
function resetGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  currentPlayer = "cross";
  render();
  updateStatus();
  if (winLine) {
    winLine.remove(); // Entferne die Gewinnlinie
    winLine = null;
  }
}

// Funktion, um eine Linie für das Gewinnmuster zu zeichnen
function drawWinLine(pattern) {
  const content = document.getElementById("content");
  const cells = pattern.map((index) =>
    document.getElementById(`cell-${index}`)
  );
  const rectStart = cells[0].getBoundingClientRect();
  const rectEnd = cells[2].getBoundingClientRect();

  winLine = document.createElement("div");
  winLine.style.position = "absolute";
  winLine.style.backgroundColor = "white";
  winLine.style.height = "5px";
  winLine.style.borderRadius = "2px";
  winLine.style.zIndex = "10";

  const startX = rectStart.left + rectStart.width / 2;
  const startY = rectStart.top + rectStart.height / 2;
  const endX = rectEnd.left + rectEnd.width / 2;
  const endY = rectEnd.top + rectEnd.height / 2;

  const length = Math.sqrt(
    Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
  );
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

  winLine.style.width = `${length}px`;
  winLine.style.transform = `rotate(${angle}deg)`;
  winLine.style.transformOrigin = "0 0";
  winLine.style.left = `${startX}px`;
  winLine.style.top = `${startY}px`;

  document.body.appendChild(winLine);
}

// SVG-Funktionen
function generateCircleSVG() {
  return `
    <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="30" fill="none" stroke="#00B0EF" stroke-width="5" />
    </svg>`;
}

function generateCrossSVG() {
  return `
    <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="10" x2="60" y2="60" stroke="yellow" stroke-width="5" />
      <line x1="60" y1="10" x2="10" y2="60" stroke="yellow" stroke-width="5" />
    </svg>`;
}
