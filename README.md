
# Rec Take Home Project Review

To run the application, clone this repository.
then run `npm install` this will install all dependencies needed in both, client and server. Once this has finished you can run `npm run dev` and visit `localhost:5137` 

will update with a deployed version promptly. 


## __An explanation of anything you skipped, as well as any trade-offs or shortcuts you took.__

- looking at the project one major tradeoff is security, the input field is not validated or sanitized and can lead to contaminated strings, which can inpact the application. 
- while I am happy with the readibility and composability of the application, there was still room for improvement, maybe smaller more versitile components could help in the future. 
- Another area of improvement is performance while I did try to reduce the load to the frontend, we could have cached the response, also worked with smaller data sets 


## __What you would do if you wanted to make this project "production-ready"__
- improvements on the user experience, we could have added better Error handling, toast messages to notify the user of certain actions. 
- Create a pipeline for deployment
- Review if the code is up to standards for Complicance and legal matters like GDPR 
- Logging to debug future issues that may arise 
- increase both documentation and testing
- Create a production plan and process, how will the brancing and process of taking code from a developers hand to prod. 

## __A paragraph or two describing what you think the most impactful 1-2 features would be to build next if this app was real.__

While its nice to see a list, people are visual creatures, the best feature I can think of, is the use of map (mapbox, googlemaps etc) this will help the user visualize himself and the proximity of the food trucks. We can also provide image and details about the food. 

Another important feature code be some way to verify if the Food Truck is actually at the location, worst feeling would be to drive/walk to the truck only for it to not be there/gone/closed etc. We can most likely achieve this with the use of a social media api, a rating system, user feedback

Another item that came to mind will building the app was infinte scroll (virtualization), Favoriting a food truck, for easy finding, and the social aspect, share the locaiton of the truck with someone else. also allowing users to copy and paste the address or one button to get directions will help with use. 

