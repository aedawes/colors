# Color Picker
This project is a variation of coolers.com, a color palette generator and editor. This is mostly to be used my me personally as many of the features I would like to use on coolers.com, are locked features that you would need to pay to unlock. This project also provides a good challenge to understanding React and implementing the more tricky aspects of it.

## Features
- A color palette generator that will generate random colors
-- The ability to lock individual colors to not be included on future color generations
-- The ability to delete a color from the palette
-- The ability to add a color to the palette
-- The  ability to swap colors with their neighbours
-- The ability to select a color from a color range
-- The ability to enter your own hex code for a color
- A contrast checker
-- Displays cards which show the unique combinations of colors with respect to each other
-- Calculates a contrast score based off industry standards
-- Provides a pass or fail base on whether or not the score is greater than 4.5
- Dark mode toggle
- Animations for transitions
- Fully responsive

## About

This was a very successful project. It ended up being quite a bit more work than I expected, but it was very useful in not only implementing a React project, but also for understanding a lot of the semantics that I used in React which I glossed over before.

The first thing I would like to discuss is the structure of the project. This is a single page web app that utilizes the use of components to function. 
ColorSwatch.js refers to each individual color on the palette. It renders in App.js however many times the state keeping track of the colors in the palette is in length. 
ContrastCard.js refers to each 'card' containing a visual of a pair of colors from the palette and the contrast score for those two colors. This component renders when the 'contrast' button is pressed and renders however many times is needed to display each unique pairing.  
NavBar.js of course, refers to the navigation bar.
The other notable file within this project is the ColorContrast.js file within the src folder. This contains a function that is used in multiple files and requires multiple helper functions. This function will calculate a contrast score. It is used to determine whether to use black or white text on each color swatch and also is used when rendering the contrast checker.

The color palette itself has a lot of functionality to it. It has the ability to delete a color, add a color, swap colors, lock colors so they stay to generate everything else, and the ability to choose a color through either your own hex value, rgb value, or color selector. To get this to work there was a lot of helper functions that were passed down from the parent component (App.js) to the child component (ColorSwatch.js). These helper functions were passed down since they altered states that existed within the parent, but were affected by html rendered within the child. There is also a lot of CSS and conditionals provided within this file to manage the responsiveness. There are three main states for the responsiveness of the palette. Normal, medium, and mobile size. Different parts of the palette will stack differently depending on the size, and to avoid using media queries, the size was detected through useEffect hooks to base it off of the size of the palette and color swatches rather than the screen size itself. These hooks work by adding and removing class names to elements dynamically.

The contrast checker utilizes the ColorContrast.js file function as mentioned previously. The most challenging part of this was getting the grid to lay out correctly. I eventually was able to figure out the correct parameters. There were also a lot of smaller bugs that occured in this section like figuring out how to animate properly and generating the correct pairings without repeating. I had a lot of trouble figuring out why the background of the app wasn't reaching the end of this grid and must have tried a million things before discovering that it was the gap property that the grid-container wasn't accounting for so I had to add padding accordingly.

The dark mode toggle was one of the first things I implemented. I did credit a tutorial in a comment seen in NavBar.js to helping me figure this one out, but I did customize it myself and I believe I understand what the tutorial was telling me.  This was one of the first instances of dynamically changing class names for elements that I came across.

The animations were mostly easy except for one. The animation for generating the contrast checker was very frustrating.  I wanted it so that the contrast cards faded in and out, but without the space for all the cards appearing at the end of the webpage if the contrast button was not clicked. This involved using useEffect hooks and timeouts to render the contrast with the opacity of 0 and then fade in once that was done. It also got confusing because fading the contrast cards out ended up being different. I implemented a scroll to the top when the cards were closed but needed to make sure that the animation completed to fade to opacity of 0 before removing the cards themselves, and all of that had to be done not before the scroll reached the top or it got jumpy. 

The responsiveness probably took most of the time. I mentioned the bulk of it up above, but I am very happy with the way it turned out and how it looks on mobile. I did not specifically account for the use of an ipad but since it accounted for as much screen size as I felt necessary on a web browser and mobile it ended up still looking great on ipad too!

## conclusion
This was a very fun project and I was glad to complete it. I feel that it will be very useful for my portfolio and was a fun challenge. Hopefully once I get my personal site up and running, I will be able to host it to use for my own purposes and keep iterating on it!

### Link to video: https://byu.box.com/s/xv515f1z4nmtkc6osn75l69gpjqa934e

### Link to Github repo: https://github.com/aedawes/colors.git