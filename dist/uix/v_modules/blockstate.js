

class BlockState{


    constructor(){


    }

    async startContext( identifier ){
        return new Promise(resolve => {
            window.addEventListener('load', async () => {
                if (window.ethereum) {  // INITIALIZE ETHEREUM 
                    window.web3 = new Web3(ethereum);
                    try {
                        await ethereum.enable();
                        var lo = await window.web3.eth.getAccounts()
                        var account_x = lo[0];
                    } catch (err) {
                        console.log('Web3 from MM denied?', err)
                    }
                } else if (window.web3) {
                    window.web3 = new Web3(web3.currentProvider)
                } else {
                    console.log('No Metamask (or other Web3 Provider) installed.')
                }
                var resolveObj = {  account: account_x  , web3:web3 };
                resolve( resolveObj );
            })                        
        });
    }
}