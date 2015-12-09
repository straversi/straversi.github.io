// Net.js - A fun visual experiment
// (c) Steven Traversi 2015

var diameter = 8;
var nodeCount = 100;
var nodeColor = "#1B5E20";
var nodeDestination = "net";
var edgeColor = "#43A047";
var sensitivity = 75;
var maxDistance = 100;
                 // 900           // 600         // 900          // 800            // 500
colors = [{ nodes:"#1B5E20", edges:"#43A047", nav:"#1B5E20", menu:"#2E7D32", button:"#4CAF50" },
         { nodes:"#0D47A1", edges:"#1E88E5", nav:"#0D47A1", menu:"#1565C0", button:"#2196F3" },
         { nodes:"#311B92", edges:"#7E57C2", nav:"#311B92", menu:"#4527A0", button:"#673AB7" },
         { nodes:"#B71C1C", edges:"#E57373", nav:"#B71C1C", menu:"#C62828", button:"#F44336" }];
myScheme = 0;

// Please name the svg element "#edges".

///////////////////////////////////////
// Please be careful below this line //
///////////////////////////////////////

var width = $("#" + nodeDestination).width();
var height = $("#" + nodeDestination).height();

var radius = diameter / 2;
var s = sensitivity;

nodes = [];

var timer = 0;
// setInterval(function() {timer += 5}, 500);

function drawNodes(rangeX, rangeY, density, dest) {
    for (var i = 0; i < density; i++) {
        var x = Math.random() * (rangeX - 20) + 10;
        var y = Math.random() * (rangeY - 140) + 70; // big because overflow hidden
        var node = createNode(x, y, "node" + i);
        drawNode(node, dest);
    }
}

function createNode(x, y, id) {
    var nodeObj = {
        x: x,
        y: y,
        id: id,
        edgesTo: [],
        edgesFrom: []
    }
    nodes.push(nodeObj);
    var node = "";
    node += "<div class='node' " ;
    node += "id='" + id + "' ";
    node += "data-x='" + x + "' ";
    node += "data-y='" + y + "' ";
    node += "style='height:" + diameter + "px;";
    node += "width:" + diameter + "px;"
    node += "border-radius:" + diameter + "px;";
    node += "left:" + x + "px;";
    node += "top:" + y + "px;";
    node += "background-color:" + nodeColor + ";";
    node += "position:absolute;'>";
    node += "</div>";
    return node;
}

function drawNode(node, dest) {
    var doc = document.getElementById(dest);
    doc.innerHTML += node;
}

$("#" + nodeDestination).mousemove(function(event) {
    var parentOffset = $(this).offset();
    var relX = event.pageX - parentOffset.left - radius;
    var relY = event.pageY - parentOffset.top - radius;
    $(".node").each(function() {
        var dist = distance(relX, relY, this.dataset.x, this.dataset.y);
        if (dist < s) {
            var newPoint = oppose(this.dataset.x, this.dataset.y, relX, relY);
            $(this).css({"left": newPoint.left, "top": newPoint.top});
            var edgesFromArray = nodes[parseInt($(this).attr('id').slice(4))].edgesFrom;
            for (var i = 0; i < edgesFromArray.length; i++) {
                thisEdge = document.getElementById("svg" + edgesFromArray[i]);
                thisEdge.setAttribute("x2", newPoint.left + radius);
                thisEdge.setAttribute("y2", newPoint.top + radius);
                // thisEdge.style.stroke = "rgb(" + (timer % 255) + "," + ((timer + 100) % 255) + "," + ((timer + 150) % 255) + ")";
            }
            var edgesToArray = nodes[parseInt($(this).attr('id').slice(4))].edgesTo;
            for (var i = 0; i < edgesToArray.length; i++) {
                thisEdge = document.getElementById("svg" + edgesToArray[i]);
                thisEdge.setAttribute("x1", newPoint.left + radius);
                thisEdge.setAttribute("y1", newPoint.top + radius);
                // thisEdge.style.stroke = "rgb(" + (timer % 255) + "," + ((timer * 5) % 255) + "," + ((timer * 3) % 255) + ")";
            }
        }
    })
})

function distance(x0, y0, x1, y1) {
    return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
}

function force(x0, y0, x1, y1) {
    return 10 / Math.pow(distance(x0, y0, x1, y1), 2);
}

function oppose(refX, refY, mouseX, mouseY) {
    // Return the point opposite (oppX = mouseX, oppY = mouseY).
    // refX = nodeX, refY = nodeY
    var offsetY;
    var offsetX;
    var mXN = parseFloat(refX) - mouseX; // mouseX normalized
    var mYN = parseFloat(refY) - mouseY; // mouseY normalized
    var mXNS = Math.pow(mXN, 2);
    var mYNS = Math.pow(mYN, 2);
    offsetX = -1 * Math.sqrt(-(s*2) * Math.sqrt(mXNS + mYNS) + mXNS + mYNS + Math.pow(s, 2)) / (2 * Math.sqrt(mYNS / mXNS + 1));
    offsetY = -1 * mYN * Math.sqrt(-(s*2) * Math.sqrt(mXNS + mYNS) + mXNS + mYNS + Math.pow(s, 2)) / (2 * mXN * Math.sqrt(mYNS / mXNS + 1));
    if (mXN > 0) {
        offsetY = -1 * offsetY;
        offsetX = -1 * offsetX;
    }
    return { left: offsetX + parseFloat(refX), top: offsetY + parseFloat(refY) };
}

drawNodes(width, height, nodeCount, nodeDestination);

function drawEdges(maxDistance) {
    var pO = $("#edges").offset();
    var i = 0;
    $(".node").each(function() {
        var source = $(this);
        var sourceOffset = source.offset();
        $(".node").each(function() {
            var myOffset = $(this).offset();
            if (distance(sourceOffset.left, sourceOffset.top, myOffset.left, myOffset.top) < maxDistance
                && parseInt(source.attr('id').slice(4)) < parseInt($(this).attr('id').slice(4))) {
                drawEdge(sourceOffset.left - pO.left + radius,
                    sourceOffset.top - pO.top + radius,
                    myOffset.left - pO.left + radius,
                    myOffset.top - pO.top + radius, i);
                nodes[$(this).attr('id').slice(4)].edgesFrom.push(i);
                nodes[source.attr('id').slice(4)].edgesTo.push(i);
            }
            i++;
        })
    })
}

function drawEdge(x0, y0, x1, y1, id) {
    var svg = document.getElementsByTagName('svg')[0];
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    newElement.setAttribute("x1", x0);
    newElement.setAttribute("y1", y0);
    newElement.setAttribute("x2", x1);
    newElement.setAttribute("y2", y1);
    newElement.setAttribute("id", "svg" + id);
    newElement.style.stroke = edgeColor;
    newElement.style.strokeWidth = "2px";
    svg.appendChild(newElement);
}

drawEdges(maxDistance);

// HTML hookups below //

function redrawAll() {
    preserveInputValues();
    $("#edges").empty();
    nodes = [];
    $(".node").each(function() {
        $(this).remove();
    })
    setColors();
    drawInputs();
}

function drawDefaults() {
    width = $("#" + nodeDestination).width();
    height = $("#" + nodeDestination).height();
    s = 100;
    drawNodes(width, height, nodeCount, nodeDestination);
    drawEdges(maxDistance);
}
function drawInputs() {
    width = $("#" + nodeDestination).width();
    height = $("#" + nodeDestination).height();
    nodeColor = colors[myScheme].nodes;
    edgeColor = colors[myScheme].edges;
    drawNodes(width, height, nodeCountInput, nodeDestination);
    drawEdges(maxDistanceInput);
    bindAll();
    setInputValuesFromPreserved();
}

nodeCountInput = $("#slider1").val();
maxDistanceInput = $("#slider3").val();

$(document).ready(function() {
    bindAll();
})
// ELEMENT is a jquery object
function bindAll() {
    $("#toggleSettings").off();
    bindInputs();
    bindSettings();
}
function bindInputs() {
    $("input[type=range]").on("change mousemove", function() {
        var me = $(this);
        if (idCheck(me, "slider1")) {
            $("#value1").html(me.val());
        } else if (idCheck(me, "slider2")) {
            $("#value2").html(me.val());
        } else if (idCheck(me, "slider3")) {
            $("#value3").html(me.val());
        }
    })
}
function idCheck(element, id) {
    return element.attr("id") == id;
}
function preserveInputValues() {
    nodeCountInput = $("#slider1").val();
    s = $("#slider2").val();
    maxDistanceInput = $("#slider3").val();
    var color = $("input[name=colorScheme]:checked").val();
    myScheme = parseInt(color);
}
function setInputValuesFromPreserved() {
    document.getElementById("slider1").value = nodeCountInput;
    document.getElementById("slider2").value = s;
    document.getElementById("slider3").value = maxDistanceInput;
    document.getElementById("radio" + String(myScheme)).checked = true;
}
var settingsState = false;
function bindSettings() {
    $("#toggleSettings").click(function() {
        $("#settings").slideToggle(100);
        settingsState = !settingsState;
        var settingsImg = document.getElementById("toggleSettings");
        if (settingsState) {
            settingsImg.src = "Images/equalizerOn.png";
        } else {
            settingsImg.src = "Images/equalizer.png";
        }
    })
    // $("input[type=radio] + label").click(function() {
    //     var color = $("input[name=colorScheme]:checked").val();
    //     myScheme = parseInt(color);
    // })
}
function setColors() {
    // $(".nav").css("color", colors[myScheme].nav);
    $("button").css({"background-color": colors[myScheme].button, "border-color": colors[myScheme].button});
    $("a, a:visited").not(".theme-safe").css("color", colors[myScheme].menu);
}
