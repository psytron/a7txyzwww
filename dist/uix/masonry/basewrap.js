//const request = require('request');
import request from 'request';
import fs from 'fs';

 

async function listPerTag( tag ){

    var qwer='where=(tags,like,'+tag+')'
    qwer='where=(org.name,like,'+tag+')'
    qwer='nested[_nc_m2m_ccaa92x__q List][where]=(org.name,like,'+tag+')'
    qwer='nested[_nc_m2m_ccaa92x__q List][where]=((org.name,like,'+tag+')~and(boost, gt, 50))'
    qwer='[where]=((org.name,like,'+tag+')~and(boost, gt, 50))'
    //nested[_nc_m2m_ccaa92x__q List][where]=(field1,eq,value)
    qwer=''
    qwer='[where]=((tags,like,'+tag+')~and(boost,gt,50))'+'&sort=boost'


    var options = {
        method: 'GET',
        url: 'http://base.ocean.coop/api/v1/db/data/noco/p_qzsa4qzr6rzsza/People/views/people',
        //url: 'http://base.ocean.coop/api/v1/db/data/noco/p_qzsa4qzr6rzsza/entities/views/entities',
        qs: { 
            offset: '0', 
            limit: '25', 
            where:qwer 
        },
        headers: {
            'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9yZ29tZUBwcm90b25tYWlsLmNvbSIsImZpcnN0bmFtZSI6bnVsbCwibGFzdG5hbWUiOm51bGwsImlkIjoidXNfNGlpa3B5djd3cHdncmYiLCJyb2xlcyI6InVzZXIsc3VwZXIiLCJ0b2tlbl92ZXJzaW9uIjoiOWJhOTc0ZTI4N2M2MjVjZTNkNGVkMzRlNDI4NTc0YmI2ZWQ2YWViZGUxNTkwOThhMjk3OWY0OWU3YjNhMjBkNDkzYmZiZDMxNGMyYzdkNGUiLCJpYXQiOjE2NjUxMjUxMDksImV4cCI6MTY2NTE2MTEwOX0.z1VmPMwpIL7AMGYgWrt50zlAHJnnUt2xulpa_j15CRM'
        }          
        ,
        json:true
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            resolve( body.list );
            //fs.writeFile('./data/'+'initialz_'+tag+'.json', json, 'utf8', function(e){    console.log('file written')   });        
        });
    });

}


export { listPerTag }




//listPerTag('science')
//listPerTag('media')
//listPerTag('mailinglist')