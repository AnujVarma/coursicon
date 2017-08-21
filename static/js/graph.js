var nodeDict = {};
var hashToKey = {};

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

function doesNodeExist(nodeKey) {
	return (nodeKey in nodeDict)
}

function setGraphStructure (graph, nodes) {
	initializeCourseNodes(graph, nodes)
	createEdgesAndOrNodes(graph, nodes)
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
	hashToKey[nodeHash] = nodeKey
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

function createEdgeInGraph(graph, src, tgt, interpolator) {
	graph.setEdge(src, tgt, {lineInterpolate:interpolator});
}

function getNodeHashByKey(nodeKey) {
	if (!doesNodeExist(nodeKey)) console.log("ERROR: NODEKEY not in dict: " + nodeKey);
	return nodeDict[nodeKey]
}

function getOrCreateOrReqNode(graph, orReqParents, interpolator) {
	var orNodeKey = orReqParents.sort().toString(); // sorted parents are the connector key
	if (doesNodeExist(orNodeKey)) return getNodeHashByKey(orNodeKey);
	return createOrReqNode(graph, orNodeKey, orReqParents, interpolator)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function onclickhandler(graph, data){

	window.dagreD3.select = (function() {  
	  var cls = 'selected',
	      selected;

	  function selector(id) {
	    var node = graph.node(id),
	      edge, selector;
	    if (node) {
	      selector = '.node';
	    }
	    else {
	      edge = graph.edge(id);
	      if (edge) {
	        // the edge selector consists of the path, the label, and the marker
	        selector = '.edgePath, .edgeLabel, marker[id="' + edge.arrowheadId + '"]';
	      }
	    }
	    return selector;
	  }

	  function classed(id, cls, value) {
	    d3.selectAll(selector(id)).filter(function(d) {
	      return d === id;
	    }).classed(cls, value)
	  }

	  return function(id) {
	    if (selected == id) {
	      return;
	    }
	    else {
	      if (selected) {
	        // cancel the old selection
	        classed(selected, cls, false);
	      }

	      // select the new one
	      selected = id;

	      if (id) {
	        classed(id, cls, true);
	      }
	    }
	  }

	})();
	var $usercourses = $('.panel .panel-body');
	// handle nodes/edges selection
    d3.select('svg').selectAll('.node').on('click', function(id) {
      course_index =  hashToKey[id]-1;
      
      console.log(data.courses[course_index].name, data.courses[course_index].description);
      $usercourses.append(data.courses[course_index].name+', '+ data.courses[course_index].description);

      dagreD3.select(id);
      d3.event.stopPropagation();
    });

    // cancel selection
    d3.select(document).on('click', function() {
        dagreD3.select();
    });
}

function makeGraph(data){
	var graph = initializeDagreGraph(10, 120, 10)
	setGraphStructure(graph, data.courses)

	var	margin = {top: 30, right: 20, bottom: 30, left: 20},
		width = screen.availWidth - margin.left - margin.right,
		height = screen.availHeight - margin.top - margin.bottom;

	// Set up an SVG group so that we can translate the final graph.
	var svg = d3.select("svg")
			.attr("width", width + margin.left + margin.right),
		inner = svg.append("g");

	var zoom = d3.behavior.zoom().on("zoom", function() {
	      inner.attr("transform", "translate(" + d3.event.translate + ")" +
	                                  "scale(" + d3.event.scale + ")");
	    }).scaleExtent([0.2,3]);

	svg.call(zoom);

	// Create the renderer
	var render = new dagreD3.render();

	// Run the renderer. This is what draws the final graph.
	render(inner, graph);

	var initialScale = 0.75;
	zoom
	  .translate([(svg.attr("width") - graph.graph().width * initialScale) / 2, 20])
	  .scale(initialScale)
	  .event(svg);
	//svg.attr('height', graph.graph().height * initialScale + 40);

	onclickhandler(graph, data);
}

function initializeDagreGraph(edgesep, ranksep, nodesep) {
	return new dagreD3.graphlib.Graph()
			.setGraph({edgesep: edgesep, ranksep: ranksep, nodesep: nodesep})
			.setDefaultEdgeLabel(function() { return {}; });
}

function main() {
	var majorId = getMajorIdFromPage();
	makeAjaxRequest('GET', '/api/majors/' + majorId, makeGraph)
}

$(document).ready(main)
