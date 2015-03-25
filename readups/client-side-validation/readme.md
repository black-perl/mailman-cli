Description
-----------
Support for `client-side validation` in **mailman-cli**.

Demo
----
I have implemented **client-side validation** in the proof of concept module. Using an invalid email address `pat@gmail@email.com` will throw error:

    > var MC = require('./cli.js')
    undefined
    > var client = new MC({'endpoint':'http://localhost:8001/3.0'})
    undefined
    > client.lists().auth().listId('list1.domain1.org').members('pat@gmail@email.com').get(function(err,data){
    ... if (err)
    ... {
    ..... console.log(err);
    ..... }
    ... else {
    ..... console.log(data);
    ..... }
    ... });
    Error: actionId does not match /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    
In the above error `actionId` refers to the `member email` which is used  INVALID here. This let us do validation on the client side only, no need to get `404` from the server. These type of error messages are more **clear** than a **404** error in **such** situations.  
**Note** : I am not saying always prefer client validations and do not expect error messages from the server. Both have their different domain.

**Note** : The following `/lists/list1.domain1.org/roster/member/pat@gmail@email.com` endpoint will be requested above which is not a valid endpoint as far as `mailman.client` is considered. It is used above for illustration purposes.

Implementation
--------------
I have implemented it here https://github.com/black-perl/mailman-cli/blob/master/lib/shared/mailman-request.js#L167 by using a path validator function. The path validation information is contained in the `_options` ( **state** object ) and it's here : https://github.com/black-perl/mailman-cli/blob/master/lib/lists.js#L98 .

Similary, `listId` supplied can be validated but I have not implmented support for it in my current prototype.


