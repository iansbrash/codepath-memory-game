# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Ian Brash**

Time spent: **2** hours spent in total

Link to project: https://glitch.com/edit/#!/noble-abstracted-motion

## Required Functionality

The following **required** functionality is complete:

* [✅] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [✅] "Start" button toggles between "Start" and "Stop" when clicked. 
* [✅] Game buttons each light up and play a sound when clicked. 
* [✅] Computer plays back sequence of clues including sound and visual cue for each button
* [✅] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [✅] User wins the game after guessing a complete pattern
* [✅] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [✅] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [✅] Buttons use a pitch (frequency) other than the ones in the tutorial
* [✅] More than 4 functional game buttons
* [✅] Playback speeds up on each turn
* [✅] Computer picks a different pattern each time the game is played
* [✅] Player only loses after 3 mistakes (instead of on the first mistake)
* [✅] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [✅] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [✅] Live counter for number of rounds left in the game
- [✅] Live counter for number of mistakes left

## Video Walkthrough (GIF)
https://recordit.co/fiqvrRufLX

If you recorded multiple GIFs for all the implemented features, you can add them here:


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
- https://cssgradient.io/
- - Helped me make the nice looking gradients on the button
- https://www.w3schools.com/css/
- - Lots of great CSS tutorials for specific styling
- https://fonts.google.com/
- - I made the font different (love the Poppins font)

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)  
* I do have a decent amount of frontend web development experience, and started my web development journey using vanilla CSS, HTML, and JavaScript so this coding challenge felt very familiar to me. However, I have been using other frameworks like React which do a lot of abstraction on your behalf, and thus it has lead me to take organization and code clarity for granted.  
* Working on this submission and using vanilla HTML/CSS/JS immediately reminded me of the importance of code clarity and organization. My style sheet and script.js was originally a huge mess of copy-pasted code and styling and groups, and looked horrible, although it did technically compile and work.  
* To solve this issue, I spent time to organize the code in a more intuitive and readable way, and also added comments in functions and variables to effectively organize my work, especially as it is going to be reviewed by someone else later. I grouped different types of variables together, as well as functions, and looking back, it has made an immense difference in the readability of my code.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)  
* I personally have experience with web development and using technologies like JS/CSS/HTML and some backend technologies, so I am most interested in the tech in the SITE program such as SQL, PostgreSQL, Heroku, D3.js, GraphQL, and Kafka (the backend technologies) and the role they play in an entire application. While I do have experience in backend, I've mostly used tools that abstract much of the work for you (i.e. AWS Lambda), and I have zero experience with concepts like relational databases, so I am excited to learn more about them.

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)  
* Giving the user more customizability. i.e. the user can choose the number of buttons, number of rounds, number of mistakes, how fast the buttons light up for, how much faster the rounds become. Or, instead of giving this customizability to the user, I could implement multiple rounds that get harder as the user succeeds, or gets easier as they fail (i.e. if the user successfully completes 8 rounds, the next game will have 10 rounds that are a little faster).



## Interview Recording URL Link

[My 5-minute Interview Recording](https://www.loom.com/share/ec787ccca2dd4a6c9bfbcb5adef778d7)


## License

    Copyright [Ian Brash]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    
    
    
    
- Need more help? [Check out our Help Center](https://help.glitch.com/) for answers to any common questions.
- Ready to make it official? [Become a paid Glitch member](https://glitch.com/pricing) to boost your app with private sharing, more storage and memory, domains and more.