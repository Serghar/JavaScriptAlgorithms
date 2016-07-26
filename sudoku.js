function Sudoku() {
	// 'private' methods...

	// stores the 9x9 game data. the puzzle data is stored with revealed
	// numbers as 1-9 and hidden numbers for the user to discover as zeros.
	this.matrix = new Array(81);

	// initial puzzle is all zeros.
	//this.matrix.clear();

	// stores the difficulty level of the puzzle 0 is easiest.
	this.level = 0;


// this method is used by the solver to find the next cell to be filled.
// the cell is chosen by finding a cell with the least amount of
// available values to try.
//
// this method takes one parameter:
// 	matrix - the array containing the current state of the puzzle.
//
// this method returns the next cell, or -1 if there are no cells left
// to choose.
	this.getCell = function(matrix)
	{
		var cell = -1, n = 10, i, j;
		var avail = new Array(9);
		avail.clear();

		for(i = 0; i < 81; i++)
		{
			if(matrix[i] == 0)
			{
				j = this.getAvailable(matrix, i, null);

				if(j < n)
				{
					n = j;
					cell = i;
				}

				if (n == 1)
					break;
			}
		}

		return cell;
	}
	// this method scans all three zones that contains the specified cell
	// and populates an array with values that have not already been used in
	// one of the zones. the order of the values in the array are randomized
	// so the solver may simply iterate linearly through the array to try
	// the values in a random order rather than sequentially.
	//
	// this method takes three parameters:
	// 	matrix - the array containing the current state of the puzzle.
	// 	cell - the cell for which to retrieve available values.
	// 	avail - the array to receive the available values. if this
	// 		parameter is null, this method simply counts the number
	// 		of available values without returning them.
	//
	// this method returns the length of the data in the available array.
	this.getAvailable = function(matrix, cell, avail)
	{
		var i, j, row, col, r, c;
		var arr = new Array(9);
		arr.clear();

		row = Math.floor(cell / 9);
		col = cell % 9;

		// row
		for(i = 0; i < 9; i++)
		{
			j = row * 9 + i;
			if(matrix[j] > 0)
				arr[matrix[j] - 1] = 1;
		}

		// col
		for(i = 0; i < 9; i++)
		{
			j = i * 9 + col;
			if(matrix[j] > 0)
			{
				arr[matrix[j] - 1] = 1;
			}
		}

		// square
		r = row - row % 3;
		c = col - col % 3;
		for(i = r; i < r + 3; i++)
			for(j = c; j < c + 3; j++)
				if(matrix[i * 9 + j] > 0)
					arr[matrix[i * 9 + j] - 1] = 1;

		j = 0;
		if(avail != null)
		{
			for(i = 0; i < 9; i++)
				if(arr[i] == 0)
					avail[j++] = i + 1;
		}
		else
		{
			for(i = 0; i < 9; i++)
				if(arr[i] == 0)
					j++;
			return j;
		}

		if(j == 0)
			return 0;

		for(i = 0; i < 18; i++)
		{
			r = Math.floor(Math.random() * j);
			c = Math.floor(Math.random() * j);
			row = avail[r];
			avail[r] = avail[c];
			avail[c] = row;
		}

		return j;
	}
	// this is the actual solver. it implements a backtracking algorithm in
	// which it randomly selects numbers to try in each cell. it starts
	// with the first cell and picks a random number. if the number works in
	// the cell, it recursively chooses the next cell and starts again. if
	// all the numbers for a cell have been tried and none work, a number
	// chosen for a previous cell cannot be part of the solution so we have
	// to back up to the last cell and choose another number. if all the
	// numbers for that cell have also been tried, we back up again. this
	// continues until a value is chosen for all 81 cells.
	//
	// this method takes one parameter:
	// 	matrix - the array containing the current state of the puzzle.
	//
	// this method returns 1 if a solution has been found or 0 if there was
	// not a solution.
	this.solve = function(matrix)
	{
		var i, j, ret = 0;
		var cell = this.getCell(matrix);

		// since this is the solver that is following the sudoku rules,
		// if getCell returns -1 we are guaranteed to have found a valid
		// solution. in this case we just return 1 (for 1 solution, see
		// enumSolutions for more information).
		if(cell == -1)
			return 1;

		var avail = new Array(9);
		avail.clear();

		j = this.getAvailable(matrix, cell, avail);
		for(i = 0; i < j; i++)
		{
			matrix[cell] = avail[i];

			// if we found a solution, return 1 to the caller.
			if(this.solve(matrix) == 1)
				return 1;

			// if we haven't found a solution yet, try the next
			// value in the available array.
		}

		// we've tried all the values in the available array without
		// finding a solution. reset the cell value back to zero and
		// return zero to the caller.
		matrix[cell] = 0;
		return 0;
	}
	this._newGame = function() {
		// clear out the game matrix.
		//this.matrix.clear();

		// call the solver on a completely empty matrix. this will
		// generate random values for cells resulting in a solved board.
		this.solve(this.matrix);
	}
}
var myBoard = new Sudoku();
myBoard.newGame();
console.log(myBoard.matrix);