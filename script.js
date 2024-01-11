let fields = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

const wincombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
  [0, 4, 8], [2, 4, 6], // diagonal
];

let currentPlayer = 'circle'; // Startspieler

function init() {
  render();
}

function render() {
  const content = document.getElementById('content');
  content.innerHTML = ''; // Leere den Inhalt

  // Erstelle den HTML-String für die Tabelle
  let tableHTML = '<table>';

  for (let i = 0; i < 3; i++) {
    tableHTML += '<tr>';
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      let cellContent = '';

      if (fields[index] === 'circle') {
        cellContent = generateAnimatedCircleSVG();
      } else if (fields[index] === 'cross') {
        cellContent = generateAnimatedCrossSVG();
      }

      // Füge das onclick-Attribut hinzu und rufe die handleCellClick-Funktion auf
      tableHTML += `<td onclick="handleCellClick(${index})">${cellContent}</td>`;
    }
    tableHTML += '</tr>';
  }

  tableHTML += '</table>';

  // Füge den HTML-String zur innerHTML des 'content'-Elements hinzu
  content.innerHTML = tableHTML;
}

function handleCellClick(index) {
  if (fields[index] === null) {
    // Setze das entsprechende Feld im Array
    fields[index] = currentPlayer;

    // Rufe die entsprechende SVG-Funktion auf
    const cellContent = currentPlayer === 'circle' ? generateAnimatedCircleSVG() : generateAnimatedCrossSVG();

    // Füge den HTML-Code in das angeklickte <td>-Element ein
    document.getElementsByTagName('td')[index].innerHTML = cellContent;

    // Entferne das onclick-Attribut, um weitere Klicks zu verhindern
    document.getElementsByTagName('td')[index].removeAttribute('onclick');

    // Wechsle den Spieler
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';

    if (isGameFinished()) {
      const winCombination = getWinningCombination();
      drawWinningLine(winCombination);
    }

    // Aktualisiere die Anzeige
    renderCell(index);
  }
}

// Überprüft, ob das Spiel beendet ist, entweder durch ein Unentschieden oder einen Gewinner
function isGameFinished() {
  // Überprüfe, ob alle Felder belegt sind (Unentschieden)
  // oder ob es eine Gewinnkombination gibt
  return fields.every((field) => field !== null) || getWinningCombination() !== null;
}

// Ermittelt die Gewinnkombination, falls vorhanden
function getWinningCombination() {
  // Iteriere durch alle möglichen Gewinnkombinationen
  for (let i = 0; i < wincombos.length; i++) {
    // Extrahiere die Indizes der drei Felder in der aktuellen Kombination
    const [a, b, c] = wincombos[i];
    
    // Überprüfe, ob alle drei Felder den gleichen Wert haben (nicht null)
    if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
      // Wenn ja, gebe die Gewinnkombination zurück
      return wincombos[i];
    }
  }

  // Falls keine Gewinnkombination gefunden wurde, gebe null zurück
  return null;
}


function renderCell(index) {
  // Hole das <td>-Element an der gegebenen Index-Position
  const cell = document.getElementsByTagName('td')[index];

  // Generiere den HTML-Inhalt für die Zelle basierend auf dem Wert im fields-Array
  const cellContent = fields[index] === 'circle' ? generateAnimatedCircleSVG() : generateAnimatedCrossSVG();

  // Setze den generierten HTML-Inhalt als Inhalt der Zelle
  cell.innerHTML = cellContent;

  // Entferne das 'onclick'-Attribut, um weitere Klicks zu verhindern
  cell.removeAttribute('onclick');
}


function drawWinningLine(combination) {
  const lineColor = '#ffffff';
  const lineWidth = 5;

  const startCell = document.querySelectorAll(`td`)[combination[0]];
  const endCell = document.querySelectorAll(`td`)[combination[2]];
  const startRect = startCell.getBoundingClientRect();
  const endRect = endCell.getBoundingClientRect();
  const contentRect = document.getElementById('content').getBoundingClientRect();

  const lineLength = Math.sqrt(
    Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
  );
  const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

  const line = document.createElement('div');
  line.style.position = 'absolute';
  line.style.width = `${lineLength}px`;
  line.style.height = `${lineWidth}px`;
  line.style.backgroundColor = lineColor;
  line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
  line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
  line.style.transform = `rotate(${lineAngle}rad)`;
  line.style.transformOrigin = `top left`;
  document.getElementById('content').appendChild(line);
}


function generateAnimatedCircleSVG() {
  const color = '#00B0EF';
  const width = 70;
  const height = 70;

  return `<svg width="${width}" height="${height}">
              <circle cx="35" cy="35" r="30" stroke="${color}" stroke-width="5" fill="none">
                <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur="0.2s" fill="freeze" />
              </circle>
            </svg>`;
}

function generateAnimatedCrossSVG() {
  const color = '#FFC000';
  const width = 70;
  const height = 70;

  const svgHtml = `
    <svg width="${width}" height="${height}">
      <line x1="0" y1="0" x2="${width}" y2="${height}"
        stroke="${color}" stroke-width="5">
        <animate attributeName="x2" values="0; ${width}" dur="200ms" />
        <animate attributeName="y2" values="0; ${height}" dur="200ms" />
      </line>
      <line x1="${width}" y1="0" x2="0" y2="${height}"
        stroke="${color}" stroke-width="5">
        <animate attributeName="x2" values="${width}; 0" dur="200ms" />
        <animate attributeName="y2" values="0; ${height}" dur="200ms" />
      </line>
    </svg>
  `;

  return svgHtml;
}

function restartGame(){
  fields = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
  ];
  render();
}