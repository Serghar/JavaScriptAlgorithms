var queens = [];
var numCombinations = 0;

function initNumberOfQueens(num){
	for(var row = 0; row < num; row++){
		queens.push(row);
	}
}

function swap(arr, pos1, pos2) {
  var temp = arr[pos1];
  arr[pos1] = arr[pos2];
  arr[pos2] = temp;
}

function findQueens (arr, n) {
  var j;
  n = n || arr.length; // set n default to array.length
  if (n === 1) {
  	//if valid combination push to valids array
    if(allSafe(arr)){
        numCombinations++;
    	console.log(arr);
    }
  } else {
    for (var i = 1; i <= n; i += 1) {
      findQueens(arr, n - 1);
      if (n % 2) {
        j = 1;
      } else {
        j = i;
      }
      swap(arr, j - 1, n - 1); // -1 to account for javascript zero-indexing
    }
  }
}

function isChessMoveSafe(intent, queen){
	if((intent[0] == queen[0]) || (intent[1] == queen[1])){
		return false;
	}
	var xDiff = Math.abs(intent[0] - queen[0]);
	var yDiff = Math.abs(intent[1] - queen[1]);
	if(xDiff == yDiff) {
		return false;
	}
	return true;
}

function allSafe(configuration) {
	for(var queen = 0; queen < configuration.length - 1; queen++){
		var queenLocation = [queen, configuration[queen]];
		for (compareQueen = queen + 1; compareQueen < configuration.length; compareQueen++) {
			var compareQueenLocation = [compareQueen, configuration[compareQueen]];
			if(!isChessMoveSafe(queenLocation, compareQueenLocation)){
				return false;
			}
		}
	}
	return true;
}


//testing
// initNumberOfQueens(4);
// findQueens(queens);
// console.log(numCombinations);