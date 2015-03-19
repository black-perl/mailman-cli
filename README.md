Description
-----------
This is a proof of concept thing for the idea of having mailman client written in javascript for GSOC'15.

Quick start
-----------

        $ git clone https://github.com/black-perl/mailman-cli.git
        $ cd mailman-cli
        $ npm install
        $ node
        > var MC = require('./cli.js')
        > // make the client object
        > var cli = new MC({'endpoint':'http://localhost:8001/3.0/'})
        > // getting the lists 
        > cli.lists().auth().get() 
        
Main Dependencies
-------------
- `Bluebird` - Prmoise library for js.
- `Superagent` - Super easy request making js library.

Syntax styling
--------------

It offers `chaining`, `promises` and of course the `callbacks` style syntax.

Methods supported
-----------------

`.lists()` - Makes request to the endpoint `/lists/`              
`.auth()` - Does auth with the REST Server             
`.listId()` - Makes request to the endpoint `/lists/<list-id>`                    
`.owner()` - Lists owners of the list           
`.members()` - Lists members of the list               
`.moderators()` - List moderators of the list  


####Chaining calls
- Get moderators for a particular list                                    
`cli.lists().auth().listId(<list-id>).moderators()` 


####Listing lists
- *Callbacks*

        > cli.lists().auth().get(function(err,data){
             if (err) {
                // handle error
             }
             else{
                console.log(data);
             }
            });
            
- *Promises*

        > cli.lists().auth().get().then(function(data){
            console.log(data);
            });

####Listing owners of a list
- *Callbacks*

        > cli.lists().auth().listId(<list-id>).owner().get(function(err,data){
             if (err) {
                // handle error
             }
             else{
                console.log(data);
             }
            });
            
- *Promises*

        > cli.lists().auth().listId(<list-id>).owner().get().then(function(data){
            console.log(data);
            });


Core Classes
------------
`MC` - The base constructor for the Mailman API service.         
`MCRequest` - `MCRequest` is the base API request object constructor.      
`CollectionRequest` - `CollectionRequest` extends `MCRequest` with properties & methods for filtering collections.                   
`ListsRequest` - `ListsRequest` extends `CollectionRequest` to handle the `/lists` API endpoint.                                       

PS
--
If you try to read the code,  you may find some unnecessary things as this is aimed towards something big :smiley:
And, sorry for not implementing a testing framework, I had spent most of my time while figuring out different things for the styling and structure of the API.




   
