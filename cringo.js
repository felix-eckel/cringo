/**
 * List of all possible Bingo sins
 */
const sins = [
    "A slide with only text",
    "More than two complex graphics on a single slide",
    "Comic Sans font",
    "More than one equation on a single slide",
    "An unexplained equation",
    "Not finished in time",
    "More than 5 Bullet Points on a slide",
    "Weird colormaps",
    "Outline slide in short talks",
    "Typos",
    "Summaries, which are actually repetitions",
    "The text is read from the slides",
    "Complete paragraphs of text on the slide",
    "Weird layout/ overladen with Logos etc",
    "Default Colors",
    "An entire data table",
    "A slide with only “Thank you for your attention”",
    "A screenshot of a paper",
    "A graph with tiny labels",
    "Full references",
    "A figures, that is never talked about",
    "An over-the-top slide change or  animation",
    "Suddenly talking faster, when the convener reminds you of the time",
    "Skipping slides because of bad time management",
    "Neon colors for highlighting",
    "“Now I’ll switch to the next slide”",
    "“On the next slide, you can see”",
    "Use of strange acronyms",
    "Ignoring time reminders from conveners"
];

var matrix;
var won = false;
const field = document.getElementById("field");
document.getElementById("win").style.display = 'none';
initialize();

/** Add click functionality to entries */
for (e of field.children) {
    e.addEventListener("click", function(){selectEntry.call(this);});
}

/** Add winning control logic */
document.getElementById("play-again").addEventListener("click", function(){
closeWin();
initialize();
});

document.getElementById("bingo").getElementsByClassName("close")[0].addEventListener("click", function(){
    closeWin();
    continuePlaying();
});

document.getElementById("continue").addEventListener("click", function(){
    closeWin();
    continuePlaying();
})

document.getElementById("reset").addEventListener("click", function(){
    closeWin();
    initialize();
})

/**
 * Initialize a new game
 */
function initialize() {
    /** Create the 5x5 bingo matrix and fill with false */
    matrix = Array(5).fill().map(()=>(Array(5).fill(false)));

    won = false;

    /** Fill the playing field with a random selection of entries */
    const useSins = shuffleArray(sins);

    for (let i=0; i<field.children.length; i++) {
        field.children[i].textContent = useSins[i];
        field.children[i].classList.remove('selectEntry');
        if (!field.children[i].classList.contains('unselectEntry')) {
            field.children[i].classList.add('unselectEntry');
        }
    }

    document.getElementById("field").style.boxShadow = 'none';
}

/**
 * React to an entry being clicked on
 */
function selectEntry() {
    var item = Number(this.id.substring(1,3)) - 1;
    var row  = Math.floor(item / 5);
    var col  = item % 5;
    matrix[row][col] = !matrix[row][col];
    selected = matrix[row][col];

    if (selected) {
        this.classList.add('selectEntry');
        this.classList.remove('unselectEntry');
    } else {
        this.classList.add('unselectEntry');
        this.classList.remove('selectEntry');
    }
    
    checkBingo();
}

/**
 * Winning logic
 */
function checkBingo() {
    if (!won) {
        var rowBingo = matrix.some(el => el.every(ell => ell === true));
        
        const transpose = (matrix) => {
            let row = matrix;
            return row.map((value, col) => matrix.map(row => row[col]));
        }
        
        var colBingo = transpose(matrix).some(el => el.every(ell => ell === true));

        var asc  = Array(5);
        var desc = Array(5);
        for (let i=0; i<5; i++) {
            asc[i]  = matrix[4-i][i];
            desc[i] = matrix[i][i];
        }
        var ascBingo  = asc.every(el => el === true);
        var descBingo = desc.every(el => el === true);

        if (rowBingo || colBingo || ascBingo || descBingo) {
            document.getElementById("win").style.display = 'revert';
            document.getElementById("field").style.boxShadow = '0 0 10px 5px green';
        }
    }
}

function closeWin() {
    document.getElementById("win").style.display = 'none';
}

function continuePlaying() {
    won = true;
}

/**
 * Make a random selection of a list
 * @param {} arr the input list
 * @returns 25 random elements of the list without replacement
 */
function shuffleArray(arr) {
    for (let i=arr.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr.slice(0, 25);
}