# Instagram Selenium Automation Script
## Overview

##### This Python script uses Selenium WebDriver to automate Instagram interactions, including logging in, saving user information, and performing actions on specific accounts. It's designed to automate follower interactions on Instagram using the Firefox WebDriver.
### Prerequisites

    - Python 3.x
    - Selenium WebDriver
    - GeckoDriver for Firefox
    - A .env file containing Instagram credentials and target account
    - csv module for file operations

## Installation
#### Install Selenium

##### To install Selenium, run:

    - bash
    - pip install selenium

### Set up GeckoDriver

Download and install GeckoDriver for Firefox. Ensure the driver path is correctly set in the script.
Environment Variables

Create a .env file in the script's directory with your Instagram credentials and the target account:

makefile

- EMAIL=your_instagram_email
- PASSWORD=your_instagram_password
- ACCOUNT=target_instagram_account

### Features

    Automated Login: Logs into Instagram using the provided credentials.
    User Interaction: Automatically follows users from a specified account's follower list.
    User Tracking: Checks and saves followed users to a CSV file to avoid repeat actions.
    Scroll Functionality: Scrolls through the follower list to load more profiles.

### Usage

#### Run the script from your terminal:

    bash
    python instagram_automation.py

##### The script will initiate a Selenium browser session and perform automated tasks on Instagram.

CSV File Management: 

The script reads and writes to a CSV file (users.csv) to track followed users. Ensure this file is accessible and in the correct format.

### Note

    This script is intended for educational purposes.
    Automated actions may violate Instagram's Terms of Service. Use this script responsibly and at your own risk.
    Be cautious with the rate of interactions to avoid account restrictions.