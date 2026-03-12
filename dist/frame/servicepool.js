import  { platform } from './platform.js'
class ServicePool{




    constructor( initObj ){

        console.log(' spinning up service pool')

        // out of all available checks 
        // inspect Context: 
        platform.inspect()
        if( platform.device == 'desktop' ){

            console.log(' Desktop ')
        }

        if( platform.device == 'browser'){
            console.log(' Browser ')

        }


    }



    services(){
        return ['connector','auther','binnce']

    }




}


export default ServicePool