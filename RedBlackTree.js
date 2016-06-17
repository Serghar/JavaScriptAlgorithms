//Javascript implementation of a Red-Black Tree
//(Self-Balancing Binary Search Tree)
//==========================================
//For Color Property:
//	True -> Red
//	False -> Black

function RBTreeNode(value) {
	this.val = value;
	this.parent = null;
	this.left = null;
	this.right = null;
	this.color = true;
}

function RBTree() {
	this.root = null;
}

//After a normal insert of a new red node call the balace function
RBTree.prototype.insert = function(val) {
	var node = new RBTreeNode(val);
	if(!this.root){
		this.root = node;
		node.color = false;
		return true;
	}
	var current = this.root;
	while(current){
		//Go left
		if(val < current.val){
			//If no left, insert left
			if(!current.left){
				node.parent = current;
				current.left = node;
				this.balance(current.left);
				return true;
			}
			current = current.left;
		//Go right
		} else {
			//If no right, insert right
			if(!current.right){
				node.parent = current;
				current.right = node;
				this.balance(current.right);
				return true;
			}
			current = current.right;
		}
	}
	return false;
};

RBTree.prototype.rotate_left = function(node){
	var child = node.right;
	node.right = child.left;
	if(node.right){
		node.right.parent = node;
	}
	child.left = node;
	if (this.root === node){
		this.root = child;
	}
	node.parent = child;
};

RBTree.prototype.rotate_right = function(node){
	var child = node.left;
	node.left = child.right;
	if(node.left){
		node.left.parent = node;
	}
	child.right = node;
	if (this.root === node){
		this.root = child;
	}
	node.parent = child;
};

RBTree.prototype.balance = function(curr) {

	while(curr !== this.root && curr.parent.color == true) {

		//Figure out if the new node was added to the left or right side of the grandparent
		if(curr.parent === curr.parent.parent.left){
			var uncle = curr.parent.parent.right; //Node adjacent to current's parent

			//If the uncle node exists and is red (therefore parent and uncle are both red)
			//make a recoloring of nodes
			if(uncle && uncle.color === true){
				//Parent and Uncle become black
				curr.parent.color = false;
				uncle.color = false;
				//Grandparent becomes red
				uncle.parent.color = true;

				//move to grandparent
				curr = uncle.parent;

			//If Uncle node is black preform rotations
			} else {
				var gparent = curr.parent.parent;
				//If Uncle and Current are similar direction, move to parent and left rotate
				if(curr === curr.parent.right){
					curr = curr.parent;
					this.rotate_left(curr);
				}
				curr.parent.color = false;
				gparent.color = true;

				//rotate right from grandparent
				this.rotate_right(gparent);
			}
		} else {
			var uncle = curr.parent.parent.left; //Node adjacent to current's parent

			//If the uncle node exists and is red (therefore parent and uncle are both red)
			//make a recoloring of nodes
			if(uncle && uncle.color === true){
				//Parent and Uncle become black
				curr.parent.color = false;
				uncle.color = false;
				//Grandparent becomes red
				uncle.parent.color = true;

				//move to grandparent
				curr = uncle.parent;

			//If Uncle node is black preform rotations
			} else {
				var gparent = curr.parent.parent;
				//If Uncle and Current are similar direction, move to parent and left rotate
				if(curr === curr.parent.left){
					curr = curr.parent;
					this.rotate_right(curr);
				}
				curr.parent.color = false;
				gparent.color = true;
				
				//rotate right from grandparent
				this.rotate_left(gparent);
			}
		}
	}
	//Always make sure the root is Black at the end
	this.root.color = false;
};

//Add tests
var tree = new RBTree();
tree.insert(6);
console.log(tree.root);
tree.insert(7);
console.log(tree.root);
tree.insert(8);
console.log(tree.root);

//RBTree Remove
//Need to implement this still~~