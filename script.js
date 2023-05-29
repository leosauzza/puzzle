function shuffleArray(array) {
    var newArray = array.slice(); // Copiar el array original para no modificarlo directamente
    var currentIndex = newArray.length, temporaryValue, randomIndex;
  
    // Mientras aún queden elementos para desordenar
    while (0 !== currentIndex) {
  
      // Seleccionar un elemento sin desordenar
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // Intercambiar con el elemento actual
      temporaryValue = newArray[currentIndex];
      newArray[currentIndex] = newArray[randomIndex];
      newArray[randomIndex] = temporaryValue;
    }
  
    return newArray;
  }

document.addEventListener('DOMContentLoaded', () => {
    const puzzleGrid = document.getElementById('puzzle-grid');
    const puzzlePiecesPlaceholder = document.getElementById('puzzle-pieces');
    const pieces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const puzzlePieces = [];
    // Crear grilla y piezas
    pieces.forEach((piece, index) => {
        const slot = document.createElement('div');
        slot.classList.add('slot');
        slot.dataset.index = index;
        puzzleGrid.appendChild(slot);
      
        const puzzlePiece = document.createElement('div');
        puzzlePiece.classList.add('piece');
        puzzlePiece.dataset.index = index;
      
        // Calcular la posición de fondo de la imagen para cada pieza
        const row = Math.floor(index / 3);
        const col = index % 3;
        puzzlePiece.style.backgroundPosition = `${-col * 100}px ${-row * 100}px`;
      
        puzzlePieces.push(puzzlePiece);
        // puzzlePiecesPlaceholder.appendChild(puzzlePiece);
      });

      //shuffle pieces
    const arrayWithoutOrder = shuffleArray(pieces);
    arrayWithoutOrder.forEach(pieceNumber => {
        puzzlePiecesPlaceholder.appendChild(puzzlePieces[pieceNumber]);
    });

    
  
    // OLD - Drag and drop
    // const piecesArray = Array.from(document.querySelectorAll('.piece'));
  
    // piecesArray.forEach((piece) => {
    //   piece.addEventListener('dragstart', (e) => {
    //     e.dataTransfer.setData('text/plain', piece.dataset.index);
    //     e.target.style.opacity = '0.5';
    //   });
  
    //   piece.addEventListener('dragend', (e) => {
    //     e.target.style.opacity = '1';
    //   });
  
    //   piece.setAttribute('draggable', 'true');
    // });
  
    // puzzleGrid.addEventListener('dragover', (e) => {
    //   e.preventDefault();
    // });
  
    // puzzleGrid.addEventListener('drop', (e) => {
    //   e.preventDefault();
    //   const pieceIndex = e.dataTransfer.getData('text/plain');
    //   const targetSlot = e.target.closest('.slot');
  
    //   if (targetSlot && targetSlot.dataset.index === pieceIndex) {
    //     targetSlot.appendChild(piecesArray[pieceIndex]);
    //     targetSlot.classList.add('correct');
    //     checkCompletion();
    //   }
    // });
    
   // Drag and drop
    puzzlePieces.forEach((piece) => {
      piece.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', piece.dataset.index);
        e.target.style.opacity = '0.5';
      });
  
      piece.addEventListener('dragend', (e) => {
        e.target.style.opacity = '1';
      });
  
      piece.setAttribute('draggable', 'true');
    });
  
    puzzleGrid.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
  
    puzzleGrid.addEventListener('drop', (e) => {
      e.preventDefault();
      const pieceIndex = e.dataTransfer.getData('text/plain');
      const targetSlot = e.target.closest('.slot');
  
      if (targetSlot && targetSlot.dataset.index === pieceIndex) {
        targetSlot.appendChild(puzzlePieces[pieceIndex]);
        targetSlot.classList.add('correct');
        checkCompletion();
      }
    });
  
    // Verificar si el rompecabezas está completo
    function checkCompletion() {
      const correctSlots = document.querySelectorAll('.correct');
      if (correctSlots.length === pieces.length) {
        alert('¡Felicidades! Has completado el rompecabezas.');
      }
    }
  });
  