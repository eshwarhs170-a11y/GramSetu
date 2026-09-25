import os
import datetime
import firebase_admin
from firebase_admin import credentials, firestore
import requests
from bs4 import BeautifulSoup
import re

# ==============================================================================
# ADVANCED AUTOMATIC SCHOLARSHIP SCRAPER
# 
# This script is designed to run automatically (e.g., via a daily cron job).
# It scrapes official government portals for deadline updates and updates the
# Firebase Firestore database so the GramSetu app always has live dates.
#
# PREREQUISITES:
# 1. pip install firebase-admin requests beautifulsoup4
# 2. You need a Firebase Service Account Key JSON file from your Firebase Console.
#    (Settings -> Project Settings -> Service Accounts -> Generate New Private Key)
# 3. Save the key file as `serviceAccountKey.json` in the same directory as this script.
# ==============================================================================

# 1. Initialize Firebase Admin
try:
    cred = credentials.Certificate('serviceAccountKey.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    print("[*] Firebase initialized successfully.")
except Exception as e:
    print(f"[!] Error initializing Firebase. Make sure serviceAccountKey.json exists.\nError: {e}")
    exit(1)

# 2. Define the scraping targets and rules
# Note: Government sites are notoriously difficult to scrape reliably due to CAPTCHAs,
# dynamic React/Angular rendering, and frequent layout changes.
# This is a conceptual implementation of how you would extract dates.
TARGETS = [
    {
        'id': 'ssp-karnataka',
        'url': 'https://ssp.postmatric.karnataka.gov.in/',
        # Regex to find dates like "Last date to apply is 31-10-2026"
        'regex': r'Last date.*?(?:is|:)\s*(\d{2}[-/]\d{2}[-/]\d{4})'
    },
    {
        'id': 'nmmss',
        'url': 'https://scholarships.gov.in/',
        'regex': r'NMMSS.*?closing date.*?:?\s*(\d{2}[-/]\d{2}[-/]\d{4})'
    }
    # Add other scholarships here...
]

def parse_date(date_str):
    """Convert DD-MM-YYYY or DD/MM/YYYY to YYYY-MM-DD for Firebase."""
    try:
        # Assuming DD-MM-YYYY or DD/MM/YYYY
        parts = date_str.replace('/', '-').split('-')
        if len(parts) == 3:
            return f"{parts[2]}-{parts[1]}-{parts[0]}"
    except:
        pass
    return None

def scrape_and_update():
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    updated_count = 0
    
    for target in TARGETS:
        print(f"\n[*] Checking {target['id']} at {target['url']}...")
        try:
            # Note: Many govt sites block automated requests. In production, 
            # you might need Selenium or Playwright instead of simple requests.
            response = requests.get(target['url'], headers=headers, timeout=10, verify=False)
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                text_content = soup.get_text()
                
                # Search for the deadline using the regex rule
                match = re.search(target['regex'], text_content, re.IGNORECASE)
                
                if match:
                    found_date_str = match.group(1)
                    iso_date = parse_date(found_date_str)
                    
                    if iso_date:
                        print(f"    -> Found new deadline: {iso_date}")
                        
                        # Update Firestore
                        doc_ref = db.collection('scholarships').document(target['id'])
                        doc_ref.update({
                            'deadline': iso_date,
                            'lastScraped': datetime.datetime.now().isoformat()
                        })
                        print("    -> Firebase updated successfully.")
                        updated_count += 1
                    else:
                        print(f"    -> Could not parse date format: {found_date_str}")
                else:
                    print("    -> No deadline match found on the page.")
            else:
                print(f"    -> Failed to fetch page. Status: {response.status_code}")
                
        except Exception as e:
            print(f"    -> Error scraping {target['id']}: {e}")

    print(f"\n[*] Finished scraping. Updated {updated_count} scholarships.")

if __name__ == "__main__":
    import urllib3
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    scrape_and_update()
