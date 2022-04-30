## Progressive Web Applications (PWA): Budget Tracker

### Description

*Giving users a fast and easy way to track their money is important, but allowing them to access that information at any time is even more important. Having offline functionality is paramount to the success of an application that handles users’ financial information*

### User Story

```text
AS AN avid traveler
I WANT to be able to track my withdrawals and deposits with or without a data/internet connection
SO THAT my account balance is accurate when I am traveling 
```

### Acceptance Criteria

```text
GIVEN a budget tracker without an internet connection
WHEN the user inputs an expense or deposit
THEN they will receive a notification that they have added an expense or deposit
WHEN the user reestablishes an internet connection
THEN the deposits or expenses added while they were offline are added to their transaction history and their totals are updated
```

![License Badge](https://img.shields.io/github/license/mmeii/progressive-budget-tracker) ![Top Language](https://img.shields.io/github/languages/top/mmeii/progressive-budget-tracker)

A Budget Tracker application that allows users to add expenses and deposits to their budget with or without a connection. When entering transactions offline, they should populate the total when brought back online.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Links](#Links)
* [Features](#Features)
* [License](#License)

## Installation

1. Download or clone repository
2. `npm install` to install the required npm packages to run

## Usage

* Application will be invoked by using the following command:

  `node server.js`

* Open your browser and go to
  
  `http://localhost:3001`

* User can add transactions as deposits or expenses by inputting the following:
  * Name of transaction
  * Transaction amount
  * For deposits - select **Add Funds**
  * For expenses - select **Subtract Funds**

* The total amount is reflected as soon as funds are entered

* The graph portrays the total funds over time by date entered for each transaction

  ![PWA Budget Tracker Screenshot](./public/assets/images/budget-tracker_app.png)

* The app can be used online and offline

* Offline Functionality:
  * Enter deposits offline
  * Enter expenses offline

* When brought back online:
  * Offline entries should be added to tracker

* There is also the option to download the app

  ![Download App](./public/assets/images/app-appliaction_install.png)

## Links

* [Github](https://github.com/DonL44/financially-responsible)
* [Live Heroku App](https://financially-responsible.herokuapp.com/)

## Features

* Node
* Express
* JavaScript
* MongoDB
* Mongoose
* Progressive Web Application

## License
  
  Licensed under the [MIT](LICENSE) license.