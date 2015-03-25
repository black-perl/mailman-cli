WHAT to port and WHAT not to :-
----------------------------

###Hightlights of the current mailman.client :
1. The `_Connection` class handles all the request making.
2. The `Client` class is the frontend for the user. It provides properties like `lists` , `domains` using classes `_List` and `_Domains` respectively.
3. There are classes such as `_Addresses` which are utilised by `_User` i.e which are not directly used by the `Client` class.

###Proposed port : 
1. In the new mailman client the role of `Client` class would be the same. It would do talking to the user. So, it is not required to port this one physically ( I mean not techinally i.e we have to port it to JS though :-) ).
2. In case of `_Connection` a `RequestA` class is proposed which will do `talking` to `mailman-core` and will implement Promises and Callbacks. This `RequestA` class can be further subclass to add further functionality to have a class `RequestB`.
3. The classes analogous to `_Lists`, `_Domains` and others will behave the same as in **mailman.client** but they all will **inherit** `RequestB`. This will facilitate **dynamic request object building** by using the **chaining syntax**.