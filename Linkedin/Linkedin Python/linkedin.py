from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from dotenv import load_dotenv
import time 
import random
import os


load_dotenv() # Here load your .env file you can use it or erase it if you want to introduce your password and email in this code.

while True : 

    choise = input ("Choose the browser \nFirefox : 1\nChrome : 2\nExit : 3\nChoise: ")

    if choise == "1" :

        try:  
            firefox_driver = r"C:\\geckodriver\\geckodriver.exe" # This path should be the geckodriver's path.
            firefox_options = Options()
            browser = webdriver.Firefox()
            browser.get("https://linkedin.com")
            break
        
        except Exception as err:
            print(f"There was an error with firefox: {err}")

    elif choise == "2" : 

        try : 
            chrome_driver = r"C:\\chromedriver\\chromedriver.exe" # This path should be the chromedriver's path.
            chrome_options = Options()
            chrome_options.add_argument("--incognito")
            browser = webdriver.Chrome(options=chrome_options)
            browser.get("https://linkedin.com")
            break

        except Exception as err :
            print(f"There was an error with chrome: {err}")


    elif choise == "3":
        print("Exiting.")
        break

    time.sleep(2)



# Login

email = os.getenv("EMAIL") # You can create .env file and introduce your email here.
password  = os.getenv("PASSWORD") # and you password here.

def start() :
    
    try :  
        input_elem = browser.find_element(By.ID, "session_key")
        input_elem.send_keys(email)
        time.sleep(3)

        input_password = browser.find_element(By.ID, "session_password")
        input_password.send_keys(password)
        time.sleep(3)

        btn = browser.find_element(By.XPATH, "/html/body/main/section[1]/div/div/form/div[2]/button")
        btn.click()
        time.sleep(5)
    
    except Exception as err:
        print(f"There was an error login : {err}")

start()

# Linkedin sometimes throw a modal window. This function works only in that case.

def modal() : 
    try : 
        time.sleep(3)
        btn_modal = browser.find_element(By.XPATH, "//button[@aria-label='Entendido']")
        btn_modal.click()
        time.sleep(3)
        
    except Exception as e : 
        print(f"No modal found. Exception : {e}")


# Access to my network to find the connections.

def my_network(counter=0) :

    try: 
        browser.get("https://www.linkedin.com/mynetwork/")
        time.sleep(5)

        btn_elem = browser.find_elements(By.XPATH, "//button[contains(@class, 'artdeco-button--2') and contains(@class, 'artdeco-button--secondary') and contains(@aria-label, 'conectar')]")

        if len(btn_elem) > 0:
            for btn in btn_elem:
                if counter >= 100:
                    print("Reach the maximum connections peer week, stopping.")
                    return  # We break the loop after onehundred clicks
                
                modal() # We check if linkedin throw a modal window 

                try:
                    btn.click()
                    sleep_time = random.randint(15, 30)
                    time.sleep(sleep_time)
                    counter += 1

                except Exception as e:
                    print(f"There was an error in the click button : {e}")

        else:
            print("No buttons found")
            my_network(counter)

    except Exception as err:
        print(f"There was an error : {err}")

my_network()
