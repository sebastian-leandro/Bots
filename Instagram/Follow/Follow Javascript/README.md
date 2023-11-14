# Instagram Puppeteer Automation Script

## Overview

##### This Node.js script automates various activities on Instagram using Puppeteer. It includes features like automated login and following users based on certain criteria.

### Prerequisites

    - Node.js.
    - Puppeteer.
    - Optional: .env file for secure credential management.
    - fs module for file operations.

## Installation

#### Install Dependencies

##### To install Puppeteer and dotenv, run:

    - bash
    - npm install puppeteer dotenv

Create a .env file in the script's directory with your Instagram credentials and the account you want to interact with:

makefile

- USERNAME=your_instagram_username
- PASSWORD=your_instagram_password
- ACCOUNT=target_instagram_account

## Features

    Automated Login: Logs into Instagram using provided   credentials.
    Follow Users: Automatically follows users from a specified account's followers list.
    Scroll Functionality: Scrolls through the followers list to load more users.
    Rate Limiting: Implements delays and breaks between actions to mimic human behavior and avoid triggering rate limits.
    User Tracking: Keeps track of which users have been followed and saves the list to a file.

## Usage

Run the script from your terminal:

    bash
    node ./index.js

#####   The script initiates a Puppeteer browser session and performs tasks on Instagram based on the provided logic.