# Shopper2
This is the first React project that I have created without following a tutorial. It is largely an adaptation of a Dave Gray exercise, and the initial design used much of that code.

My version, however, has been re-jigged throughout. This variation utilises localStorage to save the stored item list, instead of the JSON file used in the exercise.

Also, my version includes an additional field (rqd) to the object which will store the pantry stock requirement for that item. Thus, if the item had an rqd value of 5, and the pantry currently holds 4 of that item, then a qty value of 1 can be entered for that item.

This version automatically sorts the list, placing checked items to the top and unchecked at the bottom.

Customized scroll bars have been created, allowing the user to scroll through available items within the current window.

A Print feature has been added which will create a printed list of required (checked) items to be purchased.

Items can now be dragged within the list to re-order their positioning. This feature was desired so that checked items could be sorted into the order they exist within the supermarket.

Editing functionality has been added. Item description and req'd value can now be edited in-line.

Search feature has been updated to handle check/uncheck on items in Search
result listings.

