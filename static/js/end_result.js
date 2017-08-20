// Create the input graph
var mygraph = new dagreD3.graphlib.Graph()
  .setGraph({edgesep: 10, ranksep: 120, nodesep: 10})
  .setDefaultEdgeLabel(function() { return {}; });

var nodes = {
  0: {
  	label: "1",
  	children:[1, 2, 3, 4, 5, 6, 7, 8, 9, 27, 42],
    description: "course"
  },

  1: {
  	label: "10",
  	children:[8, 14, 23, 24, 25, 26, 28, 29, 30],
    description: "represents waiting for a connection request from any " +
                 "remote TCP and port."
  },

  2: {
  	label: "74",
  	children:[11],
    description: "represents waiting for a matching connection " +
                 "request after having sent a connection request."
  },

  3: {
  	label: "70",
  	children:[],
    description: "represents waiting for a confirming connection " +
                 "request acknowledgment after having both received and sent a " +
                 "connection request."
  },


  4: {
  	label: "83",
  	children:[],
    description: "represents an open connection, data received " +
                 "can be delivered to the user.  The normal state for the data " +
                 "transfer phase of the connection."
  },

  5: {
  	label: "73",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request from the remote TCP, or an acknowledgment of the " +
                 "connection termination request previously sent."

  },

  6: {
  	label: "84",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request from the remote TCP."
  },


  7: {
  	label: "16",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request from the local user."
  },

  8: {
  	label: "71",
  	children:[17],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },

  9: {
  	label: "56",
  	children:[],
    description: "represents waiting for an acknowledgment of the " +
                 "connection termination request previously sent to the remote " +
                 "TCP (which includes an acknowledgment of its connection " +
                 "termination request)."
  },
  11: {
  	label: "78",
  	children:[],
    description: "represents no connection state at all."
  },

  12: {
  	label: "39",
  	children:[13],
    description: "represents waiting for a connection request from any " +
                 "remote TCP and port."
  },

  13: {
  	label: "40",
  	children:[],
    description: "represents waiting for a matching connection " +
                 "request after having sent a connection request."
  },

  14: {
  	label: "31",
  	children:[15, 16],
    description: "represents waiting for a confirming connection " +
                 "request acknowledgment after having both received and sent a " +
                 "connection request."
  },


  15: {
  	label: "231",
  	children:[],
    description: "represents an open connection, data received " +
                 "can be delivered to the user.  The normal state for the data " +
                 "transfer phase of the connection."
  },

  16: {
  	label: "35",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request from the remote TCP, or an acknowledgment of the " +
                 "connection termination request previously sent."
  },

  17: {
  	label: "271",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request from the remote TCP."
  },
  18: {
  	label: "251",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  19: {
  	label: "58",
  	children:[22],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  20: {
  	label: "57",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  21: {
  	label: "55",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  22: {
  	label: "258",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  23: {
  	label: "65",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  24: {
  	label: "81",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  25: {
  	label: "76",
  	children:[31],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  26: {
  	label: "59",
  	children:[32],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  27: {
  	label: "51",
  	children:[18, 43],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  28: {
  	label: "86",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  29: {
  	label: "75",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  30: {
  	label: "50",
  	children:[33, 34, 35, 36, 43],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  31: {
  	label: "276",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  32: {
  	label: "259",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  33: {
  	label: "63",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  34: {
  	label: "61",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  35: {
  	label: "60",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  36: {
  	label: "77",
  	children:[37],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  37: {
  	label: "87",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  38: {
  	label: "22",
  	children:[40],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  39: {
  	label: "24",
  	children:[40],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  40: {
  	label: "27",
  	children:[41],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  41: {
  	label: "28",
  	children:[],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  42: {
    label: "30",
    children:[12, 14],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
  43: {
    label: "*",
    children:[19, 20, 21],
    description: "represents waiting for a connection termination " +
                 "request acknowledgment from the remote TCP."
  },
};

// Add states to the graph, set labels, and style
Object.keys(nodes).forEach(function(node) {
  var value = nodes[node];
  value.rx = value.ry = 5;
  value.ranksep= 200;
  mygraph.setNode(node, value);
  childrenlist = nodes[node].children
  for (i = 0, len = childrenlist.length; i < len; i++){
	mygraph.setEdge(node, childrenlist[i], {lineInterpolate: 'basis'});
  }  
});

//set the dimensions of the canvas/graph
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
render(inner, mygraph);

//////////////////////////////////////////////////////TOOLTIP AREA///////////////////////////////////////////////

var description = "This is a great CS class to take!"

// Simple function to style the tooltip for the given node.
var styleTooltip = function(name, description) {
  return "<p class='name'>" + name + "</p><p class='description'>" + description + "</p>";
};

inner.selectAll("mygraph.node")
  .attr("title", function(v) { return styleTooltip(v, description) })
  .each(function(v) { $(this).tipsy({ gravity: "w", opacity: 1, html: true }); });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////Center the graph////////////////////////////////////////////////

var initialScale = 0.75;
zoom
  .translate([(svg.attr("width") - mygraph.graph().width * initialScale) / 2, 20])
  .scale(initialScale)
  .event(svg);
svg.attr('height', mygraph.graph().height * initialScale + 40);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////HANDLE CLICK AREA///////////////////////////////////////////////////

window.dagreD3.select = (function() {  
  var cls = 'selected',
      selected;

  function selector(id) {
    var node = mygraph.node(id),
      edge, selector;
    if (node) {
      selector = '.node';
    }
    else {
      edge = mygraph.edge(id);
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

	// handle nodes/edges selection
    d3.select('svg').selectAll('.node, .edgePath, .edgeLabel').on('click', function(id) {
        dagreD3.select(id);
        d3.event.stopPropagation();
    });

    // cancel selection
    d3.select(document).on('click', function() {
        dagreD3.select();
    });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
