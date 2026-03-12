var ngraph_disjointSet = DisjointSet;

function DisjointSet(payload) {
  this.payload = payload;
  this.parent = this;
  this.rank = 0;
}

DisjointSet.prototype.find = find;
DisjointSet.prototype.union = union;

function find() {
  var parent = this.parent;
  if (parent !== this) {
    // compress so that in future we ran faster:
    this.parent = parent.find();
  }

  return this.parent;
}

function union(y) {
  var ourParent = this.find();
  var theirParent = y.find();

  if (theirParent === ourParent) return; // we are in the same set

  if (ourParent.rank < theirParent.rank) {
    ourParent.parent = theirParent;
  } else if (ourParent.rank > theirParent.rank) {
    theirParent.parent = ourParent;
  } else {
    theirParent.parent = ourParent;
    ourParent.rank += 1;
  }
}

var ngraph_kruskal = kruskal;

function kruskal(graph, getWeight) {
  var tree = [];
  getWeight = getWeight || uniformWeight;
  // map of disjoint sets for quick lookup
  var nodes = new Map();
  // Sorted array of edges by their weight
  var links = [];

  graph.forEachNode(initSet);
  graph.forEachLink(initLink);
  links.sort(byWeight);

  for (var i = 0; i < links.length; ++i) {
    var fromId = links[i].fromId;
    var toId = links[i].toId;
    var fromSet = nodes.get(fromId);
    var toSet = nodes.get(toId);
    if (fromSet.find() !== toSet.find()) {
      tree.push(new TreeNode(fromId, toId));
      fromSet.union(toSet);
    }
  }

  return tree;

  function initLink(link) {
    links.push(link);
  }

  function initSet(node) {
    nodes.set(node.id, new ngraph_disjointSet(node.id));
  }

  function byWeight(x, y) {
    return getWeight(x) - getWeight(y);
  }
}

function uniformWeight(link) {
  return 1;
}

function TreeNode(fromId, toId) {
  this.fromId = fromId;
  this.toId = toId;
}

export default ngraph_kruskal;
