


class Multibase {

    constructor( initObj ){

        console.log( initObj )
        this.driver=neo4j.driver('bolt://0.0.0.0', neo4j.auth.basic('neo4j', 'loc'));
        this.session = this.driver.session();

    }

//     curl -X POST http://localhost:2480/api/v1/create/school
//     --user root:arcadedb-password
// Now let’s create the type "Class":

// curl -X POST http://localhost:2480/api/v1/command/school
//     -d '{ "language": "sql", "command": "create document type Class"}'
//     -H "Content-Type: application/json"
//     --user root:arcadedb-password



    async query( qryIn ){
    
        //var result = await this.session.run("MATCH (x)-[r]-(y) WITH collect(x) + collect(y) as nds, collect(r) as rls CALL apoc.export.json.data(nds,rls, null, { stream: true , jsonFormat:'JSON' }) YIELD data RETURN data")
       // var resObj =  JSON.parse( result.records[0]._fields[0] )
  //  
        var requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            user:"root:playwithdata"
        };
            //make request to local server
        return fetch('http://localhost:2480/api/v1/exists/school', requestOptions)
        .then((response) => response.json())
        .then((token) => {
            var tkn = token; 
            var l = 9;
        });  
        resObj.links = resObj.rels;
        delete resObj.rels;
        return resObj; 
    }    
    

    async querynnn( qryIn ){
        
        var result = await this.session.run("MATCH (x)-[r]-(y) WITH collect(x) + collect(y) as nds, collect(r) as rls CALL apoc.export.json.data(nds,rls, null, { stream: true , jsonFormat:'JSON' }) YIELD data RETURN data")
        var resObj =  JSON.parse( result.records[0]._fields[0] )
    
        resObj.links = resObj.rels;
        delete resObj.rels;
        return resObj; 
    }    
    
    
    async queryOG1( qryIn ){
        
        var result = await this.session.run("MATCH (x:Person)-[r]-(y) WITH collect(x) + collect(y) as nds, collect(r) as rls CALL apoc.export.json.data(nds,rls, null, { stream: true , jsonFormat:'JSON' }) YIELD data RETURN data")
        var resObj =  JSON.parse( result.records[0]._fields[0] )
    
        resObj.links = resObj.rels;
        delete resObj.rels;
        return resObj; 
    }
    
    async queryOG2( qryIn ){

        this.driver=neo4j.driver('bolt://0.0.0.0', neo4j.auth.basic('neo4j', 'loc'))
        // load map 
        // hash UUID from   address + base_type + foreign_id 
        // add / replace all UUID with new multi-UUID // multi-base 
        var session = this.driver.session()
        var result = await session.run("MATCH (x:Person)-[r]-(y) WITH collect(x) + collect(y) as nds, collect(r) as rls CALL apoc.export.json.data(nds,rls, null, { stream: true , jsonFormat:'JSON' }) YIELD data RETURN data")
        var resObj =  JSON.parse( result.records[0]._fields[0] )
        resObj.links = resObj.rels;
        delete resObj.rels;
        return resObj; 
    }
}

export default new Multibase( { in:'hash '} );



