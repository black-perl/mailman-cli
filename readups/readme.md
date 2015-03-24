Description
-----------
Support for `client-side filters` in **mailman-cli**.

Why
----
There can be situations where we require filteration of data according to a rule like `List(s) with most members` etc.                                          
Since there is no such filteration implemented on the server side, because it's upto user what he wants and the server can't take all things into account.        
So, there should be a support for adding client-side filters in **mailman-cli** to make it more customisable keeping the chaining syntax.
Eg.
    
    > client.lists().maxMembers().get(callback);

The desired functionality should achieve this :

    > var util = require('./utils.js');
    > var maxMembers = util.maxMembers;
    > var MC = require('./cli.js');
    > var client = new MC({"endpoint":"http://localhost:8001/3.0/"});
    > client.lists().auth().get(function(err,data){
    ... if ( err ) {
    ..... console.log(err);
    ..... }
    ... else {
    ..... var new_data = maxMembers(data);
    ..... console.log(new_data);
    ..... }
    ... });


The logged data : 

    > { start: 0,
      total_size: 2,
      entries: 
       [ { http_etag: '"52844393da10bcf242b2ff5d483aa981db1c5996"',
           fqdn_listname: 'list1@domain1.org',
           self_link: 'http://localhost:8001/3.0/lists/list1.domain1.org',
           display_name: 'List1',
           list_name: 'list1',
           volume: 1,
           mail_host: 'domain1.org',
           list_id: 'list1.domain1.org',
           member_count: 3 },
         { http_etag: '"f00b4168a15742bdbeb5befdc06fe47c76f31e0c"',
           fqdn_listname: 'list_4@domain3.org',
           self_link: 'http://localhost:8001/3.0/lists/list_4.domain3.org',
           display_name: 'List_4',
           list_name: 'list_4',
           volume: 1,
           mail_host: 'domain3.org',
           list_id: 'list_4.domain3.org',
           member_count: 3 } ],
      http_etag: '"eafe2044642b827b582fa5884bdafcab3a177bd2"' }
      
The current implementation does not support the chaining style syntax but this can be achived by making a `queue` of such `filter functions` and call them after the data is returned in the call to `get` before calling the `callback` passed to 'get`.

So, the aim is to register  **user implemented filter functions** and use them while keeping the syntax.

**Note** : Actually the loops are blocking in `Node` but the ;ist items are less here, so I have written blocking code in `utils.js`. Sorry :fearful: , next time will use `process`.
