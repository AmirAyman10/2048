document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score')
    const resultDisplay = document.querySelector('#result')
    const btn = document.querySelector('.btn')
    const width = 4
    let squares = []
    let score = 0

    // Playing Board Creation
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            gridDisplay.appendChild(square)
            square.innerHTML = 0
            squares.push(square)
        }
    }

    createBoard()
    generate()
    generate()


    //generate random numbers
    function generate() {
        const randomNumber = Math.floor(Math.random() * squares.length) //MAth.random generates between 0 and 1
        console.log(randomNumber)
        //check if the square is empty
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2
            checkLose()
        } else generate()
    }
    
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
                
            }
        }
    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros) //numbers at left and zeros for others

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
                
            }
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML // value of the square in the first row
            let totalTwo = squares[i + width].innerHTML // value of the square in the second row of the column (moving index down to the next row)
            let totalThree = squares[i + width * 2].innerHTML //  value of the square in the third row of the column (moving index down by 2 rows)
            let totalFour = squares[i + width * 3].innerHTML // alue of the square in the fourth row of the column (moving  index down by 3 rows)
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
            /*  For i = 0, it refers to the first column (cells 0, 4, 8, 12).
                For i = 1, it refers to the second column (cells 1, 5, 9, 13).
                For i = 2, it refers to the third column (cells 2, 6, 10, 14).
                For i = 3, it refers to the fourth column (cells 3, 7, 11, 15).   
            */

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros) //numbers at left and zeros for others

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + width * 2].innerHTML = newColumn[2]
            squares[i + width * 3].innerHTML = newColumn[3]
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML // value of the square in the first row
            let totalTwo = squares[i + width].innerHTML // value of the square in the second row of the column (moving index down to the next row)
            let totalThree = squares[i + width * 2].innerHTML //  value of the square in the third row of the column (moving index down by 2 rows)
            let totalFour = squares[i + width * 3].innerHTML // alue of the square in the fourth row of the column (moving  index down by 3 rows)
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
            /*  For i = 0, it refers to the first column (cells 0, 4, 8, 12).
                For i = 1, it refers to the second column (cells 1, 5, 9, 13).
                For i = 2, it refers to the third column (cells 2, 6, 10, 14).
                For i = 3, it refers to the fourth column (cells 3, 7, 11, 15).   
            */
            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn) //numbers at left and zeros for others

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + width * 2].innerHTML = newColumn[2]
            squares[i + width * 3].innerHTML = newColumn[3]
        }
        
    }


    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i + 1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score

            }
        }
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) { // only 3 rows so we used < 12
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i + width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkWin()
    }

    //Assign functions to keys
    function control(e) {
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
            e.preventDefault() // Prevent the page from scrolling
        }
        if (e.key === 'ArrowLeft') {
            keyLeft()
        } else if (e.key === 'ArrowRight') {
            keyRight()
        } else if (e.key === 'ArrowUp') {
            keyUp()
        } else if (e.key = 'ArrowDown') {
            keyDown()
        }
        
    }
    document.addEventListener('keydown', control)  //handling the player's input through the keyboard
    
    function keyLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyUp() {
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }

    function keyDown() {
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }
    
// Touch event variables
let startX, startY, endX, endY;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    handleSwipe();
});

// Function to determine swipe direction
function handleSwipe() {
    let deltaX = endX - startX;
    let deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal Swipe
        if (deltaX > 50) {
            keyRight(); // Swipe Right
        } else if (deltaX < -50) {
            keyLeft(); // Swipe Left
        }
    } else {
        // Vertical Swipe
        if (deltaY > 50) {
            keyDown(); // Swipe Down
        } else if (deltaY < -50) {
            keyUp(); // Swipe Up
        }
    }
}


    

    //Check for number 2048 in squares to win 
    function checkWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] == 2048) {
                resultDisplay.innerHTML = 'You Win !'
                document.removeEventListener('keydown', control) //  no longer respond to keyboard inputs
                setInterval(clear, 3000)

            }
        }
    }

    // check if there is no zeros for lose 
    function checkLose() {
        let zeros = 0
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = 'Game Over!'
            document.removeEventListener('keydown', control)
            setInterval(clear, 3000)
        }
    }

    function clear() {
        clearInterval(myTimer)
    }

    // New Game 
    btn.addEventListener('click', function () {
        location.reload();
    })


    //square colors
    function addColors() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                squares[i].style.backgroundColor = '#afa192'
            }
            else if (squares[i].innerHTML == 2) {
                squares[i].style.backgroundColor = '#eee4da'
            }
            else if (squares[i].innerHTML == 4) {
                squares[i].style.backgroundColor = '#ede0c8'
            }
            else if (squares[i].innerHTML == 8) {
                squares[i].style.backgroundColor = '#f2b179'
            }
            else if (squares[i].innerHTML == 16) {
                squares[i].style.backgroundColor = '#ffcea4'
            }
            else if (squares[i].innerHTML == 32) {
                squares[i].style.backgroundColor = '#e8c064'
            }
            else if (squares[i].innerHTML == 64) {
                squares[i].style.backgroundColor = '#ffab6e'
            }
            else if (squares[i].innerHTML == 128) {
                squares[i].style.backgroundColor = '#fd9982'
            }
            else if (squares[i].innerHTML == 256) {
                squares[i].style.backgroundColor = '#ead79c'
            }
            else if (squares[i].innerHTML == 512) {
                squares[i].style.backgroundColor = '#76daff'
            }
            else if (squares[i].innerHTML == 1024) {
                squares[i].style.backgroundColor = '#beeaa5'
            }
            else if (squares[i].innerHTML == 2048) {
                squares[i].style.backgroundColor = '#d7d4f0'
            }
        }
    }
    addColors()
    let myTimer= setInterval(addColors,50)

})
