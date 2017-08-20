var nodeDict = {};

function getMajorIdFromPage() {
	return $("#major-id").attr("data-id");
}

function makeAjaxRequest(type, url, successFn) {
	$.ajax({
	  type: type,
	  url: url,
	  success: function(data){
	  	successFn(data);
	  }
	});
}

function initializeDagreGraph(edgesep, ranksep, nodesep) {
	return new dagreD3.graphlib.Graph()
			.setGraph({edgesep: edgesep, ranksep: ranksep, nodesep: nodesep})
			.setDefaultEdgeLabel(function() { return {}; });
}

function createEdgeInGraph(graph, src, tgt, interpolator) {
	graph.setEdge(src, tgt, {lineInterpolate:interpolator});
}

function doesNodeExist(nodeKey) {
	return (nodeKey in nodeDict)
}

function getNodeHashByKey(nodeKey) {
	if (!doesNodeExist(nodeKey)) console.log("ERROR: NODEKEY not in dict: " + nodeKey);
	return nodeDict[nodeKey]
}

//////////////////////////Node Initialization///////////////////////////////////////////////////////////////////////

function initializeCourseNodes(graph, nodes) {
	for (var currNodeIdx = 0; currNodeIdx < nodes.length; currNodeIdx++) {
		var currNode = nodes[currNodeIdx]
		var currNodeHash = createNodeInGraph(graph, currNode.id, currNode.courseNumber, 5, 5)
	}
}

function createNodeInGraph(graph, nodeKey, nodeName, rx, ry) {
	var nodeHash = uuid.v4()
	graph.setNode(nodeHash, {
		label: nodeName,
		rx: rx,
		ry:ry
	});
	nodeDict[nodeKey] = nodeHash
	return nodeHash
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createEdgesAndOrNodes(graph, nodes) {
	var interpolator = 'bundle';

	for (var currNodeIdx = 0; currNodeIdx < nodes.length; currNodeIdx++) {
		var currNode = nodes[currNodeIdx]
		var currNodeKey = currNode.id
		var currNodeHash = getNodeHashByKey(currNodeKey)
		setOrRequirementsForNode(graph, currNodeHash, currNode.orReqs, interpolator)
		setAndRequreimentsForNode(graph, currNodeHash, currNode.reqCourses, interpolator)
	}
}

function setOrRequirementsForNode(graph, currNodeHash, orReqs, interpolator) {
	for (orReqIdx = 0; orReqIdx < orReqs.length; orReqIdx++) {
		var orReqParents = orReqs[orReqIdx]
		var orReqHash = getOrCreateOrReqNode(graph, orReqParents, interpolator)
		createEdgeInGraph(graph, orReqHash, currNodeHash, interpolator)
	}
}

function setAndRequreimentsForNode(graph, currNodeHash, reqCourses, interpolator) {
	for (var reqIdx = 0; reqIdx < reqCourses.length; reqIdx++) {
		var reqCourseKey = reqCourses[reqIdx]
		var reqCourseHash = getNodeHashByKey(reqCourseKey)
		createEdgeInGraph(graph, reqCourseHash, currNodeHash, interpolator)
	}
}

function createOrReqNode(graph, orNodeKey, orReqParents, interpolator) {
	var orNodeHash = createNodeInGraph(graph, orNodeKey, "*", 5, 5)
	// add the parents to the or node
	for (var parentIdx = 0; parentIdx < orReqParents.length; parentIdx++) {
		var parentKey = orReqParents[parentIdx]
		var parentHash = getNodeHashByKey(parentKey)
		createEdgeInGraph(graph, parentHash, orNodeHash, interpolator)
	}
	return orNodeHash
}

function getOrCreateOrReqNode(graph, orReqParents, interpolator) {
	var orNodeKey = orReqParents.sort().toString(); // sorted parents are the connector key
	if (doesNodeExist(orNodeKey)) return getNodeHashByKey(orNodeKey);
	return createOrReqNode(graph, orNodeKey, orReqParents, interpolator)
}

function setGraphStructure (graph, nodes) {
	initializeCourseNodes(graph, nodes)
	createEdgesAndOrNodes(graph, nodes)
}

function makeGraph(data){
	var graph = initializeDagreGraph(10, 120, 10)
	setGraphStructure(graph, data.courses)

	var	margin = {top: 30, right: 20, bottom: 30, left: 20},
		width = screen.availWidth - margin.left - margin.right,
		height = screen.availHeight - margin.top - margin.bottom;

	// Set up an SVG group so that we can translate the final graph.
	var svg = d3.select("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom),
		inner = svg.select("g");

	var zoom = d3.behavior.zoom().on("zoom", function() {
	      inner.attr("transform", "translate(" + d3.event.translate + ")" +
	                                  "scale(" + d3.event.scale + ")");
	    }).scaleExtent([0.2,3]);

	svg.call(zoom);

	// Create the renderer
	var render = new dagreD3.render();

	// Run the renderer. This is what draws the final graph.
	console.log(inner, graph)
	render(inner, graph);

	var initialScale = 0.75;
	zoom
	  .translate([(svg.attr("width") - graph.graph().width * initialScale) / 2, 20])
	  .scale(initialScale)
	  .event(svg);
	svg.attr('height', graph.graph().height * initialScale + 40);
}

function main() {
	var majorId = getMajorIdFromPage();
	makeAjaxRequest('GET', '/api/majors/' + majorId, makeGraph)
}

$(document).ready(main)
