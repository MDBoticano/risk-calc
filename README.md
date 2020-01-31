# Risk Calc
Calculate the outcome of your Risk battles. 

## Goals
1. Estimate time to develop and deploy an app
2. Make something that makes me a better Risk player

## Terminology
### Attacker
Player looking to attack units in another territory. They must leave at least one troop in the territory they are attacking from. 

If the territory you're attacking from has...
- 4+ troops: attack with 1 - 3 troops 
- 3 troops: attack with 1 - 2 troops
- 2 troops: attack with 1 troop
- 1 troop: you cannot attack

### Defender
Player being attacked. Defends a territory. They can defend with all the units in the territory.

If the territory you're defending from has...
- 2+ troops: defend with 1 - 2 troops
- 1 troop: defend with 1 troop

### Battle
A roll of dice by an attacker (1 - 3) and a defender (1 or 2). Compare the lowest # of dice, sorted from highest to lowest. The number of dice compared is the lower number of attacking troops and defending troops. 

## Scenarios

### One Battle
|Atk|Def|Losses<sub>atk|Losses<sub>def|Probability|
|:-:|:-:|:-:|:-:|:-:|
|1|1| 1 <br> -- | -- <br> 1| 58.33% <br> 41.67% |
|2|1| 1 <br> -- | -- <br> 1| 42.13% <br> 57.87% |
|3|1| 1 <br> -- | -- <br> 1| 34.03% <br> 65.97% |
|1|2| 1 <br> -- | -- <br> 1| 74.54% <br> 25.46% |
|2|2| 2 <br> 1 <br> -- | -- <br> 1 <br> 2 | 44.83% <br> 32.41% <br> 22.76% |
|3|2| 2 <br> 1 <br> -- | -- <br> 1 <br> 2 | 29.26% <br> 33.58% <br> 37.16% |

### One Battle: Ammo Shortage 
Defender removes 1 from their highest roll

|Atk|Def|Losses<sub>atk|Losses<sub>def|Probability|
|:-:|:-:|:-:|:-:|:-:|
|1|1| 1 <br> -- | -- <br> 1| 41.67% <br> 58.33% |
|2|1| 1 <br> -- | -- <br> 1| 25.46% <br> 74.54% |
|3|1| 1 <br> -- | -- <br> 1| 17.36% <br> 82.64% |
|1|2| 1 <br> -- | -- <br> 1| 57.87% <br> 42.13% |
|2|2| 2 <br> 1 <br> -- | -- <br> 1 <br> 2 | 31.25% <br> 37.50% <br> 31.25% |
|3|2| 2 <br> 1 <br> -- | -- <br> 1 <br> 2 | 18.38% <br> 30.57% <br> 51.05% |

### One Battle: Bunker
Defender adds 1 to their highest roll

|Atk|Def|Losses<sub>atk|Losses<sub>def|Probability|
|:-:|:-:|:-:|:-:|:-:|
|1|1| 1 <br> -- | -- <br> 1| 72.22% <br> 27.78% |
|2|1| 1 <br> -- | -- <br> 1| 58.33% <br> 41.67% |
|3|1| 1 <br> -- | -- <br> 1| 50.62% <br> 49.38% |
|1|2| 1 <br> -- | -- <br> 1| 86.11% <br> 13.89% |
|2|2| 2 <br> 1 <br> -- | -- <br> 1 <br> 2 | 53.32% <br> 32.02% <br> 14.66% |
|3|2| 2 <br> 1 <br> -- | -- <br> 1 <br> 2 | 35.24% <br> 40.84% <br> 23.92% |
---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
