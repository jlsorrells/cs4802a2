Jon Sorrells, assignment 2, cs4802
This program generates a tree of animals based on the data chart from http://archive.ics.uci.edu/ml/datasets/Zoo  

To view the output, got to http://jlsorrells.github.io/cs4802a2/  
Hover over a node to see which animals that node corresponds to.  Non-leaf nodes will list all the animals that are their children when hovered over.  
Animals with all attributes exactly the same (except name and type) have been combined into single nodes to save space.  Hovering over one of these leaf nodes will show the names of all animals combined in that node.  
The vertical distance between a node and its children is proportional to how different the animals are.  

The code for the tree layout was modified from an example at http://bl.ocks.org/mbostock/3184089  
The tree is drawn using the d3js tree layout, with the y values set so that the vertical distance between a node and its children is proportional to how similar the animals are.   

To build the tree, the program compares each node to each other node, and combines the two nodes that are closest.  This is done until there is only one node left, which is the root node.  

