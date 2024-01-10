let fields = [
    null,
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
          cellContent = 'O';
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
  