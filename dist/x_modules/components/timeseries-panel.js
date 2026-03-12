
class TimeseriesPanel{

    constructor( container_in ,  dat   , desired_id) {
        container_in.insertAdjacentHTML( 'beforeend' , factory2d.render( 'timeseries', dat ) );
    }

    onDataUpdate( data_in ){


    }

}

export { TimeseriesPanel }