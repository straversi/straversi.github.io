// Net.js - A fun visual experiment
// (c) Steven Traversi 2016

                 // 900           // 600         // 900          // 800            // 500
colors = [{ nodes:"#1B5E20", edges:"#43A047", nav:"#1B5E20", menu:"#2E7D32", button:"#4CAF50" },
         { nodes:"#0D47A1", edges:"#1E88E5", nav:"#0D47A1", menu:"#1565C0", button:"#2196F3" },
         { nodes:"#311B92", edges:"#7E57C2", nav:"#311B92", menu:"#4527A0", button:"#673AB7" },
         { nodes:"#B71C1C", edges:"#E57373", nav:"#B71C1C", menu:"#C62828", button:"#F44336" }];
myScheme = 0;

// Please name the svg element "#edges".

function distance(x0, y0, x1, y1) {
    return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
}

var Net = {
  diameter: 8,
  nodeCount: 50,
  nodeColor: "#1B5E20",
  nodeDestination: "net",
  edgeColor: "#43A047",
  edgeColors: ["#43A047", "#26842C", "#6FC074"],
  useMultipleEdgeColors: false,
  sensitivity: 65,
  maxDistance: 60,
  nodes: [],
  edgesFrom: [],
  edgesTo: [],

  setup: function() {
    Net.radius = Net.diameter / 2;
    Net.s = Net.sensitivity;
    Net.windowHeight = $(window).height();
    Net.windowWidth = $(window).width();
    $.fn.extend({nodeId: function() { return parseInt(this.attr('id').slice(4)); }})
    var width = $("#" + Net.nodeDestination).width();
    var height = $("#" + Net.nodeDestination).height();
    Net.drawNodes(width, height, Net.nodeCount, Net.nodeDestination);
    Net.drawEdges(Net.maxDistance);
    Net.bindAll();
  },
  bindAll: function() {
    Net.bindMousemove();
    Net.bindPan();
    Net.bindWindowResize();
  },
  bindWindowResize: function() {
    resizeTimer = 0;
    $(window).on('resize', function(e) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        // Mobile browsers resize when scrolling vertically.
        if ($(window).height() != Net.windowHeight || $(window).width() != Net.windowWidth) {
          Net.redrawAll();
          Net.windowHeight = $(window).height();
        }
      }, 250);
    });
  },
  bindMousemove: function() {
    $("#" + Net.nodeDestination).mousemove(function(event) {
      var parentOffset = $(this).offset();
      var relX = event.pageX - parentOffset.left - Net.radius;
      var relY = event.pageY - parentOffset.top - Net.radius;
      Net.moveNodes(relX, relY);
    });
  },
  bindPan: function() {
    $("#" + Net.nodeDestination).hammer().bind("pan", function(event) {
      var parentOffset = $(this).offset();
      var windowOffset = $(window).scrollTop();
      var relX = event.gesture.center.x - parentOffset.left - Net.radius;
      var relY = event.gesture.center.y - parentOffset.top + windowOffset - Net.radius;
      Net.moveNodes(relX, relY);
    });
  },
  redrawAll: function() {
    $("#edges").empty();
    Net.nodes = [];
    $(".node").each(function() {
      $(this).remove();
    });
    var width = $("#" + Net.nodeDestination).width();
    var height = $("#" + Net.nodeDestination).height();
    Net.drawNodes(width, height, Net.nodeCount, Net.nodeDestination);
    Net.drawEdges(Net.maxDistance);
  },
  drawNodes: function(rangeX, rangeY, density, dest) {
    for (var i = 0; i < density; i++) {
      var x = Math.random() * (rangeX - (Net.s)) + Net.s/2;
      var y = Math.random() * (rangeY - (Net.s)) + Net.s/2;
      var node = Net.createNode(x, y, "node" + i);
      Net.edgesFrom[i] = [];
      Net.edgesTo[i] = [];
      $("#" + dest).append(node);
    }
  },
  createNode: function(x, y, id) {
      var nodeObj = {
          x: x,
          y: y,
          id: id,
      }
      Net.nodes.push(nodeObj);
      node_parts = ["<div class='node' id='", id, "' data-x='", x, "' data-y='", y, "' style='height:", Net.diameter, "px;width:", Net.diameter, "px;border-radius:", Net.diameter, "px;left:", x, "px;top:", y, "px;background-color:", Net.nodeColor, ";position:absolute;'></div>"];
      return node_parts.join("");
  },
  oppose: function(refX, refY, mouseX, mouseY) {
      // Return the point opposite (oppX = mouseX, oppY = mouseY).
      // refX = nodeX, refY = nodeY
      var mXN = mouseX - parseFloat(refX);
      var mYN = mouseY - parseFloat(refY);
      if (mXN < 0) {
        var offsetX = mXN/2 + Net.s*Math.sqrt((mXN*mXN)/(mYN*mYN+mXN*mXN))/2
      } else {
        var offsetX = mXN/2 - Net.s*Math.sqrt((mXN*mXN)/(mYN*mYN+mXN*mXN))/2
      }
      var offsetY = mYN*offsetX/mXN
      return { left: offsetX + parseFloat(refX), top: offsetY + parseFloat(refY) };
  },
  drawEdges: function(maxDistance) {
      var pO = $("#edges").offset();
      var i = 0;
      $(".node").each(function() {
          var source = $(this);
          var sourceOffset = source.offset();
          $(".node").each(function() {
              var myOffset = $(this).offset();
              if (source.nodeId() < $(this).nodeId()
                  && distance(sourceOffset.left, sourceOffset.top, myOffset.left, myOffset.top) < maxDistance) {
                  Net.drawEdge(sourceOffset.left - pO.left + Net.radius,
                      sourceOffset.top - pO.top + Net.radius,
                      myOffset.left - pO.left + Net.radius,
                      myOffset.top - pO.top + Net.radius, i);
                  Net.edgesFrom[$(this).nodeId()].push(i);
                  Net.edgesTo[source.nodeId()].push(i);
              }
              i++;
          });
      });
  },
  drawEdge: function(x0, y0, x1, y1, id) {
    var svg = document.getElementsByTagName('svg')[0];
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    $(newElement).attr({"x1":x0,"y1":y0,"x2":x1,"y2":y1,"id":"svg"+id});
    if (Net.useMultipleEdgeColors) {
      newElement.style.stroke = Net.edgeColors[Math.floor((Math.random() * Net.edgeColors.length) + 1)];
    } else {
      newElement.style.stroke = Net.edgeColor;
    }
    newElement.style.strokeWidth = "2px";
    svg.appendChild(newElement);
  },
  moveNodes: function(relX, relY) {
    $(".node").each(function() {
      var dist = distance(relX, relY, this.dataset.x, this.dataset.y);
      if (dist < Net.s) {
        var newPoint = Net.oppose(this.dataset.x, this.dataset.y, relX, relY);
        $(this).css(newPoint);
        var edgesFromNode = Net.edgesFrom[$(this).nodeId()];
        for (var i = 0; i < edgesFromNode.length; i++) {
          $("#svg" + edgesFromNode[i]).attr({"x2": newPoint.left + Net.radius,
                                             "y2": newPoint.top + Net.radius});
        }
        var edgesToNode = Net.edgesTo[$(this).nodeId()];
        for (var i = 0; i < edgesToNode.length; i++) {
          $("#svg" + edgesToNode[i]).attr({"x1": newPoint.left + Net.radius,
                                           "y1": newPoint.top + Net.radius});
        }
      }
    })
  },
}

$(Net.setup);
