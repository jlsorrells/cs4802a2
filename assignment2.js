
"use strict"

var dataArray = [];
var NodeArray = [];
var weights = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

// called when the file has loaded
function zooDataLoaded() {
    // get the text of the file
    var rawText = document.getElementById("zooFile").contentDocument.body.childNodes[0].innerHTML;
    
    // split it into arrays
    var animalArray = rawText.split("\n");
    animalArray.forEach(function (x) { dataArray.push(x.split(",")); });
    
    // calculate the weights to be used
    calculateWeights();
    
    // convert the arrays to Nodes
    dataArray.forEach(function (x) { NodeArray.push(new Node(null, null, x)); });
    
    sortNodes(NodeArray);
}

// calculates distance between two animals
function distance(animal1, animal2) {
    var distance = 0;
    // loop through, skipping the 'name' and 'type' columns
    for (var i = 1; i < animal1.length - 1; i++) {
        distance += Math.pow(animal1[i] / weights[i] - animal2[i] / weights[i], 2);
    }
    return Math.pow(distance, 0.5);
}

// calculates weights for the distance function to use, so that each attribute is weighted equally
// even if they are have different scales
function calculateWeights() {
    var maxs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var mins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < dataArray.length; i++) {
        for (var j = 0; j < dataArray[0].length; j++) {
            if (dataArray[i][j] > maxs[j]) {
                maxs[j] = dataArray[i][j];
            }
            if (dataArray[i][j] < mins[j]) {
                mins[j] = dataArray[i][j];
            }
        }
    }
    for (var j = 0; j < dataArray[0].length; j++) {
        weights[j] = maxs[j] - mins[j];
    }
}

// sorts the nodes into a tree
// TODO: make this faster
function sortNodes(nodes) {
    var minDistance = Infinity;
    var child1 = 0;
    var child2 = 1;
    // the array is sorted
    if (nodes.length <= 1) {
        return nodes;
    }
    
    // check all distances, keep track of the smallest one
    for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
            var currentDistance = distance(nodes[i].animal, nodes[j].animal);
            if (currentDistance < minDistance) {
                minDistance = currentDistance;
                child1 = i;
                child2 = j;
            }
        }
    }
    
    // make a new node out of the two ones that were closest together
    var n1 = nodes[child1]
    var n2 = nodes[child2]
    nodes.splice(child2, 1);
    nodes.splice(child1, 1);
    nodes.push(new Node(n1, n2, averageAnimal(n1.animal, n2.animal)));
    return sortNodes(nodes);
}

// a data structure to store animals and clusters as
function Node(child1, child2, animal) {
    this.child1 = child1;
    this.child2 = child2;
    this.animal = animal;
}

// creates an animal that is the average value of two others
function averageAnimal(a1, a2) {
    var result = a1.splice(0);
    result[0] = a1 + a2;
    for (var i = 1; i < a1.length; i++) {
        result[i] = (a1[i] + a2[i]) / 2;
    }
    return result;
}






