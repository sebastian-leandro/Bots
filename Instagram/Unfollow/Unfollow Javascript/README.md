# Instagram Puppeteer Unfollow Script

## Overview
This script is a Node.js application using Puppeteer for automating Instagram activities. It mainly focuses on unfollowing users on Instagram based on specific criteria.

## Prerequisites
- Node.js
- Puppeteer
- A `.env` file with Instagram credentials

## Installation

### Install Dependencies
To install Puppeteer, run:

    - bash
    - npm install puppeteer

### Set up Environment Variables

Create a .env file in the script's directory with your Instagram credentials:

makefile

- USERNAME=your_instagram_username
- PASSWORD=your_instagram_password

### Features

    Automated Login: Logs into Instagram using environment variables for credentials.
    Cookie Management: Handles cookies to maintain session state.
    Dynamic Timers: Implements randomized timers for actions to mimic human behavior.
    Unfollow Users: Automatically unfollows users not listed in a predefined set.
    Scroll Functionality: Scrolls through the follower list to load more users.
    Error Handling: Manages errors gracefully and closes the browser in case of failure.

### Usage

Run the script from your terminal:

    - bash
    - node ./index.js

#### The script will initiate a Puppeteer browser session and start the unfollow process on Instagram.

### Note:

    The script is designed for educational purposes and should be used responsibly.
    Automated actions may violate Instagram's Terms of Service. Use this script at your own risk.
    Ensure to use the script cautiously to avoid account restrictions.