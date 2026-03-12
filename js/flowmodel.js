

class FlowModel {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }


    ping(){

        console.log(' pinging outbound: ')
        this.dispatchEvent(new CustomEvent('ping',{detail: {message:'big ping data from FlowModel '} }))
    }
}