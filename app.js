let boxes = document.querySelectorAll(".box");

let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");

let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnText = document.querySelector("#turn-text");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// Reset Game

const resetGame = () => {

    turnO = true;

    enableBoxes();

    msgContainer.classList.add("hide");

    turnText.innerText = "Player O's Turn";
};


// Box Click

boxes.forEach((box) => {

    box.addEventListener("click", () => {

        if (turnO) {

            box.innerText = "O";
            box.style.color = "#548687";

            turnO = false;

            turnText.innerText = "Player X's Turn";

        } else {

            box.innerText = "X";
            box.style.color = "#b0413e";

            turnO = true;

            turnText.innerText = "Player O's Turn";
        }

        box.disabled = true;

        checkWinner();
    });
});


// Disable All Boxes

const disabledBoxes = () => {

    for (let box of boxes) {
        box.disabled = true;
    }
};


// Enable All Boxes

const enableBoxes = () => {

    for (let box of boxes) {

        box.disabled = false;
        box.innerText = "";
    }
};


// Show Winner

const showWinner = (winner) => {

    msg.innerText = `🎉 Congratulations! Player ${winner} Wins!`;

    msgContainer.classList.remove("hide");

    disabledBoxes();
};


// Draw Check

const checkDraw = () => {

    for (let box of boxes) {

        if (box.innerText === "") {
            return false;
        }
    }

    return true;
};


// Check Winner

const checkWinner = () => {

    for (let pattern of winPatterns) {

        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (
            pos1val !== "" &&
            pos2val !== "" &&
            pos3val !== ""
        ) {

            if (
                pos1val === pos2val &&
                pos2val === pos3val
            ) {

                showWinner(pos1val);

                return;
            }
        }
    }

    // Check Draw

    if (checkDraw()) {

        msg.innerText = "🤝 It's a Draw!";

        msgContainer.classList.remove("hide");

        disabledBoxes();
    }
};


// Buttons

newGameBtn.addEventListener("click", resetGame);

resetBtn.addEventListener("click", resetGame);
