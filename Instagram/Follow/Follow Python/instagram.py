from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from dotenv import load_dotenv
import time
import random
import os
import csv

load_dotenv()



try : 
            
    firefox_driver = r"/usr/local/bin/geckodriver" # This path should be the geckodriver's path.
    browser = webdriver.Firefox(executable_path='/usr/local/bin/geckodriver')
    browser.get("https://instagram.com")
    time.sleep(5)

except Exception as e :
    print(f"It was a problem with the Geckodriver. {e}")



email = os.getenv("EMAIL")
password = os.getenv("PASSWORD")


def login() :

    try : 

        input_elem = browser.find_element(By.XPATH, "/html/body/div[2]/div/div/div[2]/div/div/div/div[1]/section/main/article/div[2]/div[1]/div[2]/form/div/div[1]/div/label/input")
        input_elem.send_keys(email)
        time.sleep(3)

        input_pass = browser.find_element(By.XPATH, "/html/body/div[2]/div/div/div[2]/div/div/div/div[1]/section/main/article/div[2]/div[1]/div[2]/form/div/div[2]/div/label/input")
        input_pass.send_keys(password)
        time.sleep(3)

        btn = browser.find_element(By.XPATH, "/html/body/div[2]/div/div/div[2]/div/div/div/div[1]/section/main/article/div[2]/div[1]/div[2]/form/div/div[3]/button")
        btn.click()

    except Exception as e :
        print(f"It was a problem login. {e} try again.")

login()

time.sleep(5)



# Save user 

def check_user(username) :

    try :
        with open('users.csv', 'r', newline='') as csvfile :
            csvreader = csv.reader(csvfile)
            for row in csvreader:
                if username in row:
                    return True
            return False

    except Exception as e :
        print(f'there was an error reading the username: {e}')


def save_user() :

    try :
        with open('users.csv', 'a', newline='') as csvfile :
            csvwriter = csv.writer(csvfile)
            csvwriter.writerow([username])

    except Exception as e :
            print(f'there was an error saving the username: {e}')


def get_account():

    try:
        account = os.getenv("ACCOUNT")
        browser.get(f"https://www.instagram.com/{account}/followers/")
        time.sleep(5)

        scroll = browser.find_element(By.XPATH, "/html/body/div[5]/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div[3]")


        counter = 0 
        while counter < 500:
            fw_btn = browser.find_elements(By.XPATH, "//button[contains(@class, '_acan') and contains(@class, '_acap') and contains(@class,  '_acas') and contains(@class, '_aj1-')]")

            if len(fw_btn) > 0:
                for btn in fw_btn:
                    try:

                        user_elem = browser.find_element(By.XPATH, "/html/body/div[6]/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div[3]/div[1]/div/div[1]/div/div/div/div[2]/div/div/div/span/div/a/div/div/span")
                        username = user_elem.text

                        if not check_user(username) :
                            btn.click()
                            sleep_time = random.randint(60, 90)
                            time.sleep(sleep_time)
                            counter += 1
                            print(counter)
                    except Exception as e:
                        print(f"Click error: {e}")

            else:

                try :
                    browser.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight;', scroll)
                    time.sleep(3)

                except Exception as e : 
                    print(f'Error scrolling down : {e}')


    except Exception as e:
        print(f"General error: {e}")

get_account()