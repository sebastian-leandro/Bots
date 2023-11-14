# LinkedIn Puppeteer Automation Script
## Overview

##### This script is a Node.js application using Puppeteer for automating LinkedIn interactions. It includes functionalities such as automated login, modal handling, and sending connection requests.

### Prerequisites

-   Node.js
-   Puppeteer
-   .env file with LinkedIn credentials (optional for enhanced security)

### Installation
#### Install Dependencies

##### Install Puppeteer and dotenv by running:

    bash
    npm install puppeteer dotenv

###Set up Environment Variables

Create a .env file in the script's directory with your LinkedIn credentials:

- USERNAME=your_email@example.com
- PASSWORD=your_password

## Features

    Automated Login: Securely logs into LinkedIn using the credentials provided.
    Connection Requests: Sends connection requests to profiles on the 'My Network' page.
    Modal Handling: Detects and handles modal pop-ups.
    Rate Limiting and Breaks: Randomized intervals between actions and breaks to mimic human behavior.

## Usage

#### Run the script from your terminal

   - bash
   - node ./index.js

##### The script will initiate a Puppeteer browser instance and perform automated tasks on LinkedIn.