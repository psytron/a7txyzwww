

module.exports = createLayout;
createLayout.get2dLayout = require('ngraph.forcelayout');

function createLayout(graph, physicsSettings) {
    var merge = require('ngraph.merge');
    physicsSettings = merge(physicsSettings, {
        createQuadTree: require('ngraph.quadtreebh3d'),
        //createQuadTree: require('ngraph.forcelayout3d'),
        createBounds: require('../js/lib/bounds'),
        createDragForce: require('../js/lib/dragForce'),
        createSpringForce: require('../js/lib/springForce'),
        integrator: getIntegrator(physicsSettings),
        createBody: require('../js/lib/createBody')
    });

    return createLayout.get2dLayout(graph, physicsSettings);
}

function getIntegrator(physicsSettings) {
    if (physicsSettings && physicsSettings.integrator === 'verlet') {
        return require('../js/lib/verletIntegrator.js');
    }

    return require('../js/lib/eulerIntegrator')
}
