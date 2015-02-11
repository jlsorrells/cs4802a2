Jon Sorrells, assignment 2, cs4802
This program generates a tree of animals based on the data chart from http://archive.ics.uci.edu/ml/datasets/Zoo  

To view the output, got to http://jlsorrells.github.io/cs4802a1/  
Hover over a leaf node to see which animals that node corresponds to.  
Animals with all attributes exactly the same (except name and type) have been combined into single nodes to save space.  Hovering over one of these nodes will show the names of all animals combined in that node.  
The vertical distance between a node and its children is proportional to how different the animals are.  

The code for the tree layout was modified from an example at http://bl.ocks.org/mbostock/3184089  
