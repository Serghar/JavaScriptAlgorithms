//Creation of a basic Trie algorithm using Javascript
//

function trieNode(word){
	this.partial = word;
	this.connections = [];
	this.word = null;
}

function trie() {
	this.start = {
		partial: "",
		connections: [],
		word: null
	};
	//Add a new word to the structure if it doesnt already exist already
	this.insert = function(newWord, node){
		if(!node){
			node = this.start;
		}
		for(var idx = 0; idx < node.partial.length; idx++){
			if(newWord[idx] != node.partial[idx]){
				var substring = node.partial.substr(idx);
				var startstring = node.partial.substr(0,idx);
				var b = new trieNode(substring);
				node.partial = startstring;
				b.connections = node.connections;
				node.connections = [b];
				var s = new trieNode(newWord.substr(idx));
				node.connections.push(s);
				return;
			}
			if(idx >= newWord.length - 1){
				//handle first word running out
				return;
			}
		}
		for(var i in node.connections){
			if(newWord[idx] == node.connections[i].partial[0]){
				return this.insert(newWord.substr(idx), node.connections[i]);
			}
		}
		node.connections.push(new trieNode(newWord.substr(idx)));
	};

	//Given a string partial returns all 
	this.find = function(partial){
		console.log("this does nothing!!");
	};
}