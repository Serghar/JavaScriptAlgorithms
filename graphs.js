function minHeap(){
	var arr = [];

	this.add = function(node){
		arr.push(node);
		addRepair();
	}
	this.remove = function(){
		if(arr.length < 1){
			return null;
		}
		var temp = arr[0];
		arr[0] = arr.pop();
		remRepair(0);
		return temp;
	}

	function addRepair(){
		var node = arr.length - 1;
		var parent = Math.floor((arr.length - 1)/2);
		while(node > 0 && arr[node.weight] < arr[parent.weight]){
			//swap nodes
			var temp = arr[node];
			arr[node] = arr[parent];
			arr[parent] = temp;
			node = parent;
			parent = Math.floor((arr.length - 1)/2);
		}
	}

	function remRepair(i) {
	  var left = (i * 2) + 1;
	  var right = (i * 2) + 2;
	  var swap = i;
	  if(arr[left] && arr[left.weight] < arr[swap.weight]){
	    swap = left;
	  }
	  if(arr[right] && arr[right.weight] < arr[swap.weight]){
	    swap = right;
	  }
	  if(swap != i){
	    temp = arr[swap];
	    arr[swap] = arr[i];
	    arr[i] = temp;
	    repair(arr, swap); 
	  } 
	}
}



//////////////////////////////////////////////
//////////////////////////////////////////////

function GraphNode(name){
	this.val = name;
	this.status = -1
	this.cnx = [];
}

function Edge(node2, weight){
	this.output = node2;
	this.weight = weight || 0;
}

function Graph(){
	this.vertList = [];

	this.add = function(val){
		var node = new GraphNode(val);
		this.vertList.push(node);
	}

	this.connect = function(node1, node2, weight){
		var newEdge = new Edge(node2, weight);
		node1.cnx.push(newEdge);
	}
	this.doubleConnect = function(node1, node2, weight){
		var newEdge = new Edge(node2, weight);
		node1.cnx.push(newEdge);
		var newEdge = new Edge(node1, weight);
		node2.cnx.push(newEdge);
	}
}

Graph.prototype.shortestPath = function(start, end){

}