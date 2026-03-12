
export default {
    dollar( val_in ){  
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format( val_in )
    },
    percent( val_in ){
        return '%'+Number(val_in).toFixed(2);;
    },
    units( val_in ){
        return Number( val_in ).toLocaleString("en-US");    
    },
    pass( val_in ){
        return val_in; 
    }


}
