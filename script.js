let fields = [
    'circle',
    null,
    null,
    'cross',
    null,
    null,
    null,
    null,
    null,

];

function init(){
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
          cellContent = 'X';
        }
  
        tableHTML += `<td>${cellContent}</td>`;
      }
      tableHTML += '</tr>';
    }
  
    tableHTML += '</table>';
  
    // Füge den HTML-String zur innerHTML des 'content'-Elements hinzu
    content.innerHTML = tableHTML;
  }

  function generateAnimatedCircleSVG() {
    const color = '#00B0EF';
    const width = 70;
    const height = 70;
  
    // SVG-HTML-Code für einen animierten Kreis
    const svgCode = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${width / 2}" cy="${height / 2}" r="${width / 2 - 2}" fill="none" stroke="${color}" stroke-width="4">
          <animate attributeName="r" values="0;${width / 2 - 2}" 
           begin="0s" repeatCount="indefinite" />
          <animate attributeName="stroke-dasharray" values="0 ${2 * Math.PI * (width / 2 - 2)};0 0" dur="1s" begin="0s" repeatCount="indefinite" />
        </circle>
      </svg>
    `;
  
    return svgCode;
  }
  