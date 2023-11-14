# LinkedIn Automation Script

## Overview
This Python script automates the process of logging into LinkedIn and performing network expansion activities. It utilizes Selenium WebDriver to interact with the LinkedIn website, allowing users to automatically send connection requests.

## Prerequisites
- Python 3.x
- Selenium WebDriver
- ChromeDriver or GeckoDriver (depending on your browser preference)
- A `.env` file containing your LinkedIn credentials (optional for enhanced security)

## Installation

### Install Selenium
##### To install Selenium, run the following command:

    pip install selenium

### Set up WebDriver

##### Download and install the WebDriver for your preferred browser:

    ChromeDriver
    GeckoDriver

- Ensure the driver path is correctly set in the script.
- Environment Variables

#### Create a .env file in the script's directory with your LinkedIn credentials:


- EMAIL=your_email@example.com
- PASSWORD=your_password

### Usage

#### Run the script from your terminal:

  bash
  python linkedin_automation.py

### Follow the on-screen prompts to choose your browser and start the automation process

#### Features

    Browser Selection: Choose between Firefox and Chrome for automation.
    Automated Login: Securely log into LinkedIn using your credentials.
    Network Expansion: Automatically sends connection requests to suggested contacts.
    Modal Handling: Detects and handles any modal pop-ups from LinkedIn.
    Rate Limiting: Limits the number of connections to avoid excessive activity.