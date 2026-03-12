
class TerminalPanel{

    constructor( container_in ,  dat , desired_id  ) {
        container_in.insertAdjacentHTML( 'beforeend' , factory2d.render( 'terminal', dat ) );
    }

    onDataUpdate( data_in ){


    }

}

export { TerminalPanel }