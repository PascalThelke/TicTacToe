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

    // Aktualisiere die Anzeige
    renderCell(index);
  }
}

function renderCell(index) {
  const cell = document.getElementsByTagName('td')[index];
  const cellContent = fields[index] === 'circle' ? generateAnimatedCircleSVG() : generateAnimatedCrossSVG();
  cell.innerHTML = cellContent;
  cell.removeAttribute('onclick');
}

// Hier füge deine bestehenden SVG-Generierungsfunktionen ein (generateCircleSVG, generateCrossSVG)


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