



import { ngraph_graph } from "/web_modules/ngraph.graph.js";
import { ngraph_path } from "/web_modules/ngraph.path.js";
import { ngraph_merge } from "/web_modules/ngraph.merge.js";
import { ngraph_forcelayout } from "/web_modules/ngraph.forcelayout.js";
import { ngraph_quadtreebh3d } from "/web_modules/ngraph.quadtreebh3d.js";
import { ngraph_physics_simulator } from '/web_modules/ngraph.physics.simulator.js';

// simulator ::: springForce , dragForce , createBody, bounds, eulerIntegrator 
createLayout.get2dLayout = ngraph_forcelayout;
function createLayout(graph, physicsSettings) {
    var merge = ngraphMerge;
    physicsSettings = merge(physicsSettings, {
        createQuadTree: createQuadTree ,
        //createQuadTree: require('ngraph.forcelayout3d'),
        createBounds: bounds,
        createDragForce: dragForce,
        createSpringForce: springForce,
        integrator: getIntegrator(physicsSettings),
        createBody: createBody
    });
    return createLayout.get2dLayout(graph, physicsSettings);
}

function getIntegrator(physicsSettings) {
    return eulerIntegrator;
}

// YES !!


var boss = function(){
    basic.ping()
    return "Total Order"
}
var vers = function(){
    return "Bundle Vers. 0.36"
}

export { vers, boss, ngraph_graph, createLayout }


//
//<myapp-qrcode data="hello world!"></myapp-qrcode>
//exports.qrcode = QRCode;





/*
exports = createLayout;
createLayout.get2dLayout = require('ngraph.forcelayout');

function createLayout(graph, physicsSettings) {
    var merge = require('ngraph.merge');
    physicsSettings = merge(physicsSettings, {
        createQuadTree: require('ngraph.quadtreebh3d'),
        //createQuadTree: require('ngraph.forcelayout3d'),
        createBounds: require('./lib/bounds'),
        createDragForce: require('./lib/dragForce'),
        createSpringForce: require('./lib/springForce'),
        integrator: getIntegrator(physicsSettings),
        createBody: require('./lib/createBody')
    });

    return createLayout.get2dLayout(graph, physicsSettings);
}

function getIntegrator(physicsSettings) {
    if (physicsSettings && physicsSettings.integrator === 'verlet') {
        return require('./lib/verletIntegrator.js');
    }

    return require('./lib/eulerIntegrator')
}

require('./isomodel.js')
require('./isocontroller.js')
require('./main.js') */