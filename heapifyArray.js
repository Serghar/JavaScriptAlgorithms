function heapRemove(arr) {
  var returnVal = arr[1];
  arr[1] = arr[arr.length - 1];
  arr.length--;
  i = 1;
  repair(arr, i);
  return returnVal;
}

function arr2heap(arr) {
  arr[arr.length] = arr[0];
  arr[0] = null;
  for(var i = Math.floor(((arr.length - 1)/ 2)); i > 0; i--) {
    repair(arr, i);  
  }
  return arr;
}

function repair(arr, i) {
  var left = i * 2;
  var right = i * 2 + 1;
  var swap = i;
  if(arr[left] && arr[left] < arr[swap]){
    swap = left;
  }
  if(arr[right] && arr[right] < arr[swap]){
    swap = right;
  }
  if(swap != i){
    temp = arr[swap];
    arr[swap] = arr[i];
    arr[i] = temp;
    repair(arr, swap); 
  } 
}


//heapsort implementation

function heapSort(arr) {
  heapArr = arr2heap(arr);
  var newArr = [];
  while(heapArr.length > 1){
    newArr.push(heapRemove(heapArr));
  }
  return newArr;
}

console.log(heapSort([3,6,1,5,7,4,6,8]));