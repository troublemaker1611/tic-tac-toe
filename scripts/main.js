//all possible winning patterns
var winningPattern = ["1,2,3", "2,1,3", "3,1,2", "1,3,2", "2,3,1", "3,2,1", "4,5,6", "5,4,6", "6,4,5", "4,6,5", "5,6,4", "6,5,4", "7,8,9", "8,7,9", "9,7,8", "7,9,8", "8,9,7", "9,8,7", "1,4,7", "4,1,7", "7,1,4", "1,7,4", "4,7,1", "7,4,1", "2,5,8", "5,2,8", "8,2,5", "2,8,5", "5,8,2", "8,5,2", "3,6,9", "6,3,9", "9,3,6", "3,9,6", "6,9,3", "9,6,3", "1,5,9", "5,1,9", "9,1,5", "1,9,5", "5,9,1", "9,5,1", "3,5,7", "5,3,7", "7,3,5", "3,7,5", "5,7,3", "7,5,3"];

//generating a biased random value accoriding to the winning pattern
biasedValues = [5, 3, 7, 1, 9, 2, 4, 6, 8];
weights = [0.19, 0.14, 0.14, 0.14, 0.14, 0.09, 0.09, 0.09, 0.09];

var generateWeighedList = function(list, weight) {
    var weighed_list = [];
    for (var i = 0; i < weight.length; i++) {
        var multiples = weight[i] * 100;
        for (var j = 0; j < multiples; j++) {
            weighed_list.push(list[i]);
        }
    }
    return weighed_list;
};

weighed_list = generateWeighedList(biasedValues, weights);
console.log(weighed_list);

var rand = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//initializing variables
var userCells = [];
var compCells = [];
var usedCells = [];
var used = false;
var winConditon = false;

//user's move
function userMove(userMoveId) {
    if (!winConditon) {
        document.getElementById("cell" + userMoveId).innerHTML = "O";
        document.getElementById("cell" + userMoveId).style.backgroundColor = "orange";
        userCells.push(parseInt(userMoveId));
        usedCells.push(parseInt(userMoveId));
        if (userCells.length >= 3) {
            var possibleWinUser = subset(userCells, 3);
            for (var i = 0; i < possibleWinUser.length; i++) {
                if (winningPattern.includes(possibleWinUser[i])) {
                    for (var j = 0; j < 3; j++) {
                        winningCells = possibleWinUser[i].split(",");
                        document.getElementById("cell" + parseInt(winningCells[j])).style.backgroundColor = "green";
                    }
                    document.getElementById("winningReport").innerHTML = "Time to celebrate... <i class='fas fa-glass-cheers'></i><br>You Win...!!! <i class='far fa-smile-beam'></i>";
                    document.getElementById("winningReport").style.color = "green";
                    winConditon = true;
                    break;
                }
            }
        }
        if (usedCells.length != 9) {
            compMove();
        }
    }
}

//comp's move
function compMove() {
    if (!winConditon) {
        while (true) {
            index = rand(0, weighed_list.length-1);
            var compMoveId = weighed_list[index];
            console.log(compMoveId);
            used = usedCells.includes(compMoveId);
            if (!used) {
                document.getElementById("cell" + compMoveId).innerHTML = "X";
                document.getElementById("cell" + compMoveId).style.backgroundColor = "yellow";
                compCells.push(compMoveId);
                usedCells.push(compMoveId);
                break;
            }
        }
        if (compCells.length >= 3) {
            var possibleWinComp = subset(compCells, 3);
            for (var i = 0; i < possibleWinComp.length; i++) {
                if (winningPattern.includes(possibleWinComp[i])) {
                    for (var j = 0; j < 3; j++) {
                        winningCells = possibleWinComp[i].split(",");
                        document.getElementById("cell" + parseInt(winningCells[j])).style.backgroundColor = "red";
                    }
                    document.getElementById("winningReport").innerHTML = "Computer Wins...!!!<br> Better luck next time... <i class='far fa-frown'></i>";
                    document.getElementById("winningReport").style.color = "red";
                    winConditon = true;
                    break;
                }
            }
        }
    }
}

//generating all possible subsets from the moves
function subset(arr, arr_size) {
    var result_set = [], result;
    for (var x = 0; x < Math.pow(2, arr.length); x++) {
        result = [];
        i = arr.length - 1;
        do {
            if ((x & (1 << i)) !== 0) {
                result.push(arr[i]);
            }
        } while (i--);

        if (result.length == arr_size) {
            result_set.push(result.toString());
        }
    }
    return result_set;
}