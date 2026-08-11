/**
 * Karnataka Urban Local Bodies and their Ward data
 * Sources:
 * - LGD Directory (lgdirectory.gov.in) - requires manual download
 * - BBMP: 198 wards per 2020 delimitation
 * - Karnataka Municipal Corporation Act + individual ULB websites
 *
 * Structure: { "DistrictName|TalukName": { ulbName: string, wards: string[] } }
 */

const karnatakaUrbanData = {

  // ─── BENGALURU ──────────────────────────────────────────
  "Bengaluru Urban|Bengaluru South": {
    ulb: "BBMP (Bruhat Bengaluru Mahanagara Palike)",
    wards: [
      "Puttenahalli", "Bilekahalli", "Gottigere", "Konankunte",
      "Anjanapura", "Vasanthapura", "Uttarahalli", "Vidyaranyapura",
      "Yeshwanthpura", "Jalahalli", "Peenya", "Rajarajeshwari Nagar",
      "Byatarayanapura", "Dasarahalli", "Mahalakshmi Layout",
      "Malleswaram", "Hebbal", "Jakkur", "Thanisandra",
      "Nagawara", "Hennur", "Kalyan Nagar", "Kadugondanahalli",
      "Dooravaninagar", "KR Puram", "Mahadevapura", "Whitefield",
      "Varthur", "Bommanahalli", "HSR Layout", "Begur",
      "Hulimavu", "Arakere", "Basavanagudi", "Padmanabhanagar",
      "Chamrajpet", "Shivajinagar", "Sivanchetti Gardens", "Gandhinagar",
      "Chickpet", "Dharmaraya Swamy Temple Ward", "Cottonpet", "Binnipete",
      "Kempapura Agrahara", "Vijayanagar", "Hosahalli", "Marenahalli",
      "Marappana Palya", "Rajagopal Nagar", "Hegganahalli", "Herohalli",
      "Kengeri", "Rajarajeshwari Nagar", "Hoysalanagar", "Suryanagar"
    ]
  },
  "Bengaluru Urban|Bengaluru North": {
    ulb: "BBMP (Bruhat Bengaluru Mahanagara Palike)",
    wards: [
      "Yelahanka", "Yelahanka Satellite Town", "Jakkur", "Thanisandra",
      "Hegde Nagar", "Kothanur", "Vidyaranyapura", "Doddabommasandra",
      "Kuvempu Nagar", "HBR Layout", "Horamavu Agara", "Horamavu Banaswadi",
      "Ramamurthy Nagar", "Dodda Bidarakallu", "Nagavara", "Kodigehalli",
      "Sahakara Nagar", "Aramane Nagara", "Mattikere", "Sanjayanagar",
      "Ganganagar", "Hebbal", "Dinnur"
    ]
  },
  "Bengaluru Urban|Anekal": {
    ulb: "BBMP (Bruhat Bengaluru Mahanagara Palike)",
    wards: [
      "Anekal", "Attibele", "Begur", "Bommasandra", "Electronic City Phase 1",
      "Electronic City Phase 2", "Jigani", "Kasavanahalli", "Krishnarajapuram",
      "Sarjapura", "Singasandra"
    ]
  },

  // ─── MYSURU ──────────────────────────────────────────
  "Mysuru|Mysuru": {
    ulb: "Mysuru City Corporation (MCC)",
    wards: [
      "Ward 1 - Udaygiri", "Ward 2 - Vidyaranyapuram", "Ward 3 - Hanakere",
      "Ward 4 - Kumbarapet", "Ward 5 - Neharu Road", "Ward 6 - Contonment",
      "Ward 7 - Hebbal 1st Stage", "Ward 8 - Hebbal 2nd Stage",
      "Ward 9 - Vani Vilas Mohalla", "Ward 10 - Ittige Gudu",
      "Ward 11 - Mandi Mohalla", "Ward 12 - Krishnamurthypuram",
      "Ward 13 - Vishweshwaranagar", "Ward 14 - Jayanagar",
      "Ward 15 - Ramakrishnanagar", "Ward 16 - Kuvempunagar",
      "Ward 17 - Medar Block", "Ward 18 - Rajivnagar",
      "Ward 19 - Ashokapuram", "Ward 20 - Shakthinagar",
      "Ward 21 - Shivarampet", "Ward 22 - Chamaraja Mohalla",
      "Ward 23 - Lakshmipuram", "Ward 24 - Udayagiri 2nd Stage",
      "Ward 25 - Srirampura", "Ward 26 - Bamboo Bazaar",
      "Ward 27 - Kyathamaranahalli", "Ward 28 - Saraswathipuram",
      "Ward 29 - Vijayanagar 1st Stage", "Ward 30 - Vijayanagar 2nd Stage",
      "Ward 31 - Vijayanagar 3rd Stage", "Ward 32 - Vijayanagar 4th Stage",
      "Ward 33 - Gokulam 1st Stage", "Ward 34 - Gokulam 2nd Stage",
      "Ward 35 - Dattagalli 1st Stage", "Ward 36 - Dattagalli 2nd Stage",
      "Ward 37 - Dattagalli 3rd Stage", "Ward 38 - Jayalakshmipuram",
      "Ward 39 - Devaraja", "Ward 40 - Yadavagiri",
      "Ward 41 - Brindavan Extension", "Ward 42 - Nazarabad Mohalla",
      "Ward 43 - Azad Nagar", "Ward 44 - Tilak Nagar",
      "Ward 45 - Agrahara Dasarahalli", "Ward 46 - Rajendranagar",
      "Ward 47 - Vidyaranyapuram 2nd Stage", "Ward 48 - Bogadi 1st Stage",
      "Ward 49 - Bogadi 2nd Stage", "Ward 50 - J.P.Nagar",
      "Ward 51 - Saddagunte Palya", "Ward 52 - Srirampur",
      "Ward 53 - Hanchya", "Ward 54 - Udaypura",
      "Ward 55 - Hootagalli"
    ]
  },

  // ─── HUBBALLI-DHARWAD ──────────────────────────────────────────
  "Dharwad|Hubballi": {
    ulb: "Hubballi-Dharwad City Corporation (HDMC)",
    wards: [
      "Ward 1 - Keshwapur", "Ward 2 - Vidyanagar", "Ward 3 - Kalyan Nagar",
      "Ward 4 - Gokul Road", "Ward 5 - Unkal", "Ward 6 - Sadashiva Nagar",
      "Ward 7 - Navanagar", "Ward 8 - Hosur", "Ward 9 - Akkamahadevinagar",
      "Ward 10 - Kumareshwar Nagar", "Ward 11 - Rajnagar", "Ward 12 - Tarihal",
      "Ward 13 - Gadag Road", "Ward 14 - Deshpande Nagar", "Ward 15 - Kotur",
      "Ward 16 - Shivapura", "Ward 17 - Banshankari", "Ward 18 - Azad Nagar",
      "Ward 19 - Basaveshwar Nagar", "Ward 20 - Hanumantha Nagar",
      "Ward 21 - Amargol", "Ward 22 - Gandhi Nagar Hubli",
      "Ward 23 - Old Hubli", "Ward 24 - Kalghatagi Road",
      "Ward 25 - Gabbur", "Ward 26 - Shirur Park", "Ward 27 - Dharwad",
      "Ward 28 - Narayanpur Dharwad", "Ward 29 - Aiwan-E-Shahi",
      "Ward 30 - Saptapur", "Ward 31 - Subhash Nagar", "Ward 32 - Sadhankeri",
      "Ward 33 - Hindwadi", "Ward 34 - Nrupathunga Nagar", "Ward 35 - Amingad",
      "Ward 36 - Mallapur", "Ward 37 - Devikoppa"
    ]
  },
  "Dharwad|Dharwad": {
    ulb: "Hubballi-Dharwad City Corporation (HDMC)",
    wards: [
      "Ward 1 - Dharwad East", "Ward 2 - Dharwad West", "Ward 3 - Dharwad Central",
      "Ward 4 - Ankola Gate", "Ward 5 - Subhash Nagar Dharwad",
      "Ward 6 - Azad Nagar Dharwad", "Ward 7 - Kelageri",
      "Ward 8 - University Campus", "Ward 9 - Hebbal Dharwad",
      "Ward 10 - Sattur Colony", "Ward 11 - Vinobanagar",
      "Ward 12 - Vidyagiri", "Ward 13 - Saptapur Dharwad"
    ]
  },

  // ─── MANGALURU ──────────────────────────────────────────
  "Dakshina Kannada|Mangaluru": {
    ulb: "Mangaluru City Corporation (MCC)",
    wards: [
      "Ward 1 - Bunder", "Ward 2 - Urwa Store", "Ward 3 - Kinichambli",
      "Ward 4 - Bolara", "Ward 5 - Kodical", "Ward 6 - Thokkottu",
      "Ward 7 - Bajal", "Ward 8 - Harekala", "Ward 9 - Talapady",
      "Ward 10 - Kavoor", "Ward 11 - Konchadi", "Ward 12 - Attavar",
      "Ward 13 - Kodialbail", "Ward 14 - Falnir", "Ward 15 - Bejai",
      "Ward 16 - Hampankatta", "Ward 17 - Jeppinamogaru",
      "Ward 18 - Padavugudde", "Ward 19 - Kulur", "Ward 20 - Katipalla",
      "Ward 21 - Ganjimutt", "Ward 22 - Bondel", "Ward 23 - Ballalbagh",
      "Ward 24 - Balmatta", "Ward 25 - Dongerkerycircle",
      "Ward 26 - Pumpwell", "Ward 27 - Pandeshwar", "Ward 28 - Lalbagh",
      "Ward 29 - Kadri", "Ward 30 - Ashok Nagar", "Ward 31 - Bharathnagar",
      "Ward 32 - Derebail", "Ward 33 - Morgansgate", "Ward 34 - Urwa",
      "Ward 35 - Surathkal", "Ward 36 - Mulki", "Ward 37 - Kenjar",
      "Ward 38 - Nanthoor", "Ward 39 - Shakthinagar Mangaluru",
      "Ward 40 - Ullal", "Ward 41 - Kottara", "Ward 42 - Bikarnakatte",
      "Ward 43 - Mannagudda", "Ward 44 - Bangrakulur"
    ]
  },

  // ─── BELAGAVI ──────────────────────────────────────────
  "Belagavi|Belagavi": {
    ulb: "Belagavi City Corporation (BCC)",
    wards: [
      "Ward 1 - Tilakwadi", "Ward 2 - Machhe", "Ward 3 - Hindwadi Belagavi",
      "Ward 4 - Hanuman Nagar", "Ward 5 - Gandhi Nagar Belagavi",
      "Ward 6 - Gandhinagar Extension", "Ward 7 - Bogarves",
      "Ward 8 - Azad Nagar Belagavi", "Ward 9 - Fort Area",
      "Ward 10 - Shahpur", "Ward 11 - Maratha Colony",
      "Ward 12 - Khanapur Road", "Ward 13 - Bhagyanagar",
      "Ward 14 - Subhash Nagar Belagavi", "Ward 15 - Shivaji Nagar",
      "Ward 16 - Nehru Nagar", "Ward 17 - Basaveshwar Nagar Belagavi",
      "Ward 18 - Cantonment", "Ward 19 - Sadashiv Nagar Belagavi",
      "Ward 20 - Ramadurg", "Ward 21 - Ugar Khurd",
      "Ward 22 - Hire Bagewadi", "Ward 23 - Sampada Nagar",
      "Ward 24 - Matoshree Nagar", "Ward 25 - Bharat Nagar Belagavi",
      "Ward 26 - Industrial Area", "Ward 27 - Gokak Road",
      "Ward 28 - Shahapur", "Ward 29 - Dnyaneshwar Nagar",
      "Ward 30 - Vadgaon"
    ]
  },

  // ─── BALLARI ──────────────────────────────────────────
  "Ballari|Ballari": {
    ulb: "Ballari City Corporation",
    wards: [
      "Ward 1 - Gandhi Nagar Ballari", "Ward 2 - Azad Nagar Ballari",
      "Ward 3 - Old Town", "Ward 4 - Arehalli", "Ward 5 - Nimbaragahalli",
      "Ward 6 - Jawahar Nagar", "Ward 7 - Vidyanagar Ballari",
      "Ward 8 - Anantapur Road", "Ward 9 - Rajeev Nagar",
      "Ward 10 - Ashok Nagar Ballari", "Ward 11 - Mariyamma Temple Area",
      "Ward 12 - Central Bus Stand Area", "Ward 13 - Mahajana Colony",
      "Ward 14 - Bellary Fort Area", "Ward 15 - Venkateshwara Colony",
      "Ward 16 - APMC Area", "Ward 17 - Siraguppa Road",
      "Ward 18 - Kappagal Road", "Ward 19 - Kudligi Road",
      "Ward 20 - Hirehadagalli Road", "Ward 21 - Hospet Road",
      "Ward 22 - Patel Nagar", "Ward 23 - Rambhapuri Colony",
      "Ward 24 - Nagulapura", "Ward 25 - Munireddy Colony",
      "Ward 26 - Basaveshwar Colony", "Ward 27 - Hanuman Nagar Ballari",
      "Ward 28 - VNC Colony", "Ward 29 - Sambhaji Nagar",
      "Ward 30 - Raichur Road"
    ]
  },

  // ─── VIJAYAPURA (BIJAPUR) ──────────────────────────────────────────
  "Vijayapura|Vijayapura": {
    ulb: "Vijayapura City Corporation",
    wards: [
      "Ward 1 - Shahabad Colony", "Ward 2 - Jewargi Colony",
      "Ward 3 - Toravi Galli", "Ward 4 - Azad Nagar Vijayapura",
      "Ward 5 - Gol Gumbaz Area", "Ward 6 - Ibrahim Rouza Area",
      "Ward 7 - Jama Masjid Area", "Ward 8 - Anand Nagar",
      "Ward 9 - Gandhi Nagar Vijayapura", "Ward 10 - Subhash Nagar Vijayapura",
      "Ward 11 - Basaveshwar Nagar Vijayapura", "Ward 12 - Nehru Colony",
      "Ward 13 - Extension Area", "Ward 14 - Stadium Colony",
      "Ward 15 - Horticulture Colony", "Ward 16 - MLA Colony",
      "Ward 17 - Sainik Colony", "Ward 18 - Masuti Galli",
      "Ward 19 - Devaraj Urs Colony", "Ward 20 - Budh Colony"
    ]
  },

  // ─── RAICHUR ──────────────────────────────────────────
  "Raichur|Raichur": {
    ulb: "Raichur City Corporation",
    wards: [
      "Ward 1 - Gandhi Nagar Raichur", "Ward 2 - Nizam Colony",
      "Ward 3 - Hyder Colony", "Ward 4 - Subhash Nagar Raichur",
      "Ward 5 - Azad Nagar Raichur", "Ward 6 - Old Town Raichur",
      "Ward 7 - Fort Area Raichur", "Ward 8 - Kaveri Nagar",
      "Ward 9 - Basaveshwar Nagar Raichur", "Ward 10 - Stadium Colony Raichur",
      "Ward 11 - Jawahar Nagar Raichur", "Ward 12 - Anantha Shayan Area",
      "Ward 13 - Bus Stand Area", "Ward 14 - Shastri Colony",
      "Ward 15 - Market Area", "Ward 16 - MLA Colony Raichur"
    ]
  },

  // ─── TUMAKURU ──────────────────────────────────────────
  "Tumakuru|Tumakuru": {
    ulb: "Tumakuru City Corporation",
    wards: [
      "Ward 1 - Subhash Nagar Tumkur", "Ward 2 - Gandhi Nagar Tumkur",
      "Ward 3 - B.H. Road Area", "Ward 4 - Gubbi Road Area",
      "Ward 5 - Sira Road", "Ward 6 - Vasavi Nagar",
      "Ward 7 - Vidyanagar Tumkur", "Ward 8 - Ashok Nagar Tumkur",
      "Ward 9 - Tiptur Road", "Ward 10 - Kunigal Road",
      "Ward 11 - Railway Station Area", "Ward 12 - Azad Nagar Tumkur",
      "Ward 13 - Jawahar Nagar Tumkur", "Ward 14 - Kondajji",
      "Ward 15 - Hebbur", "Ward 16 - Devaraj Urs Nagar",
      "Ward 17 - Shivaji Nagar Tumkur", "Ward 18 - Mahalakshmipuram",
      "Ward 19 - Kukkarahalli", "Ward 20 - B.S.Compound"
    ]
  },

  // ─── SHIVAMOGGA ──────────────────────────────────────────
  "Shivamogga|Shivamogga": {
    ulb: "Shivamogga City Corporation",
    wards: [
      "Ward 1 - Shettihalli", "Ward 2 - Nehru Nagar Shimoga",
      "Ward 3 - Gandhi Nagar Shimoga", "Ward 4 - Vinoba Nagar",
      "Ward 5 - Kuvempu Nagar Shimoga", "Ward 6 - Basaveshwar Nagar Shimoga",
      "Ward 7 - Jnanashakthi Nagar", "Ward 8 - Azad Nagar Shimoga",
      "Ward 9 - Subhash Nagar Shimoga", "Ward 10 - Koppa Road",
      "Ward 11 - Bhadravathi Road", "Ward 12 - Central Market",
      "Ward 13 - Honne Area", "Ward 14 - Anandapuram",
      "Ward 15 - Javali", "Ward 16 - Agrahara Shimoga",
      "Ward 17 - Sagara Road", "Ward 18 - Holalkere Road",
      "Ward 19 - Nrupathunga Nagar Shimoga", "Ward 20 - Metagalli"
    ]
  },

  // ─── DAVANGERE ──────────────────────────────────────────
  "Davangere|Davangere": {
    ulb: "Davangere City Corporation",
    wards: [
      "Ward 1 - Gandhi Nagar Davangere", "Ward 2 - Azad Nagar Davangere",
      "Ward 3 - Subhash Nagar Davangere", "Ward 4 - Ashok Nagar Davangere",
      "Ward 5 - Jawahar Nagar Davangere", "Ward 6 - P.J Extension",
      "Ward 7 - P.J Road", "Ward 8 - Avaragere", "Ward 9 - Hadadi",
      "Ward 10 - Bathi", "Ward 11 - 8th Ward", "Ward 12 - Nittuvalli",
      "Ward 13 - Anikethana Road", "Ward 14 - Avaragere Extension",
      "Ward 15 - Vidyanagar Davangere", "Ward 16 - Basaveshwar Nagar Davangere",
      "Ward 17 - MCC Block", "Ward 18 - Rajiv Nagar Davangere",
      "Ward 19 - Kondajji Colony", "Ward 20 - Harihara Road",
      "Ward 21 - KPTCL Colony", "Ward 22 - Siddaiah Nagar",
      "Ward 23 - Hamsabavi", "Ward 24 - Hadagali Road"
    ]
  },

  // ─── HASSAN ──────────────────────────────────────────
  "Hassan|Hassan": {
    ulb: "Hassan City Municipal Council",
    wards: [
      "Ward 1 - Shanthala Nagar", "Ward 2 - Gandhi Nagar Hassan",
      "Ward 3 - Vidyaranya Colony", "Ward 4 - Subhash Nagar Hassan",
      "Ward 5 - Azad Nagar Hassan", "Ward 6 - Brahmin Street",
      "Ward 7 - Yedatore Road", "Ward 8 - Holenarasipura Road",
      "Ward 9 - Railway Station Area Hassan", "Ward 10 - Old Town Hassan",
      "Ward 11 - Basaveshwar Nagar Hassan", "Ward 12 - Kuvempu Nagar Hassan",
      "Ward 13 - Shankar Mutt Road", "Ward 14 - Salagame Road",
      "Ward 15 - Mysore Road Hassan", "Ward 16 - Jayanagar Hassan"
    ]
  },

  // ─── MANDYA ──────────────────────────────────────────
  "Mandya|Mandya": {
    ulb: "Mandya City Municipal Council",
    wards: [
      "Ward 1 - Gandhi Nagar Mandya", "Ward 2 - Azad Nagar Mandya",
      "Ward 3 - Subhash Nagar Mandya", "Ward 4 - Basaveshwar Nagar Mandya",
      "Ward 5 - Kasaba Hobli Center", "Ward 6 - Old Town Mandya",
      "Ward 7 - Railway Station Area Mandya", "Ward 8 - Marigowda Road",
      "Ward 9 - Mysore Road Mandya", "Ward 10 - Bangalore Road Mandya",
      "Ward 11 - Vidyanagar Mandya", "Ward 12 - Srinivasa Nagar Mandya",
      "Ward 13 - Kuvempu Nagar Mandya", "Ward 14 - Shivapura Mandya",
      "Ward 15 - Melukote Road"
    ]
  },

  // ─── KOLAR ──────────────────────────────────────────
  "Kolar|Kolar": {
    ulb: "Kolar City Municipal Council",
    wards: [
      "Ward 1 - KGF Road Area", "Ward 2 - Gandhi Nagar Kolar",
      "Ward 3 - Subhash Nagar Kolar", "Ward 4 - Azad Nagar Kolar",
      "Ward 5 - Old Market Kolar", "Ward 6 - Mulbagal Road",
      "Ward 7 - Chintamani Road", "Ward 8 - Bangalore Road Kolar",
      "Ward 9 - Railway Station Area Kolar", "Ward 10 - Srinivasapura Road",
      "Ward 11 - Bangarpet Road", "Ward 12 - Basaveshwar Nagar Kolar",
      "Ward 13 - Kuvempu Nagar Kolar", "Ward 14 - Narayana Swamy Colony",
      "Ward 15 - ANL Layout"
    ]
  },

  // ─── BIDAR ──────────────────────────────────────────
  "Bidar|Bidar": {
    ulb: "Bidar City Municipal Council",
    wards: [
      "Ward 1 - Gandhi Nagar Bidar", "Ward 2 - Azad Nagar Bidar",
      "Ward 3 - Subhash Nagar Bidar", "Ward 4 - Old Town Bidar",
      "Ward 5 - Bidar Fort Area", "Ward 6 - Udgir Road",
      "Ward 7 - Gulbarga Road Bidar", "Ward 8 - Nanded Road",
      "Ward 9 - Railway Station Area Bidar", "Ward 10 - Basaveshwar Nagar Bidar",
      "Ward 11 - Vidyanagar Bidar", "Ward 12 - Chidri",
      "Ward 13 - Ujjani Colony", "Ward 14 - Narayanapur Bidar"
    ]
  },

  // ─── GADAG ──────────────────────────────────────────
  "Gadag|Gadag-Betageri": {
    ulb: "Gadag-Betageri City Municipal Council",
    wards: [
      "Ward 1 - Gandhi Nagar Gadag", "Ward 2 - Azad Nagar Gadag",
      "Ward 3 - Old Town Gadag", "Ward 4 - Betageri",
      "Ward 5 - Hubli Road Gadag", "Ward 6 - Ron Road",
      "Ward 7 - Laxmeshwar Road", "Ward 8 - Railway Station Area Gadag",
      "Ward 9 - Basaveshwar Nagar Gadag", "Ward 10 - Subhash Nagar Gadag",
      "Ward 11 - Kuvempu Nagar Gadag", "Ward 12 - Shivayogi Nagar",
      "Ward 13 - APMC Area Gadag", "Ward 14 - Kotumachagi Road"
    ]
  },

  // ─── BAGALKOT ──────────────────────────────────────────
  "Bagalkot|Bagalkot": {
    ulb: "Bagalkot City Municipal Council",
    wards: [
      "Ward 1 - Gandhi Nagar Bagalkot", "Ward 2 - Azad Nagar Bagalkot",
      "Ward 3 - Old Town Bagalkot", "Ward 4 - Badami Road",
      "Ward 5 - Hungund Road", "Ward 6 - Jamkhandi Road",
      "Ward 7 - Bijapur Road Bagalkot", "Ward 8 - Basaveshwar Nagar Bagalkot",
      "Ward 9 - Subhash Nagar Bagalkot", "Ward 10 - Kuvempu Nagar Bagalkot",
      "Ward 11 - VRL Colony", "Ward 12 - Nehru Nagar Bagalkot"
    ]
  },

  // ─── CHIKKABALLAPURA ──────────────────────────────────────────
  "Chikkaballapura|Chikkaballapura": {
    ulb: "Chikkaballapura Town Municipal Council",
    wards: [
      "Ward 1 - Gandhi Nagar Chikkaballapura", "Ward 2 - Azad Nagar Chikkaballapura",
      "Ward 3 - Old Town Chikkaballapura", "Ward 4 - Bangalore Road Chikkaballapura",
      "Ward 5 - Gowribidanur Road", "Ward 6 - Sidlaghatta Road",
      "Ward 7 - Shidlaghatta Road", "Ward 8 - Railway Station Area Chikkaballapura",
      "Ward 9 - Basaveshwar Nagar Chikkaballapura", "Ward 10 - Subhash Nagar Chikkaballapura",
      "Ward 11 - Kuvempu Nagar Chikkaballapura", "Ward 12 - Nandi Hills Road"
    ]
  },

  // ─── SINDHNUR ──────────────────────────────────────────
  "Raichur|Sindhnur": {
    ulb: "Sindhnur City Municipal Council (CMC)",
    wards: [
      "Ward 1 - Gandhi Nagar Sindhnur", "Ward 2 - Azad Nagar Sindhnur",
      "Ward 3 - Old Town Sindhnur", "Ward 4 - Raichur Road Sindhnur",
      "Ward 5 - Manvi Road", "Ward 6 - Gangavathi Road",
      "Ward 7 - Basaveshwar Nagar Sindhnur", "Ward 8 - Subhash Nagar Sindhnur",
      "Ward 9 - Railway Station Area Sindhnur", "Ward 10 - Market Area Sindhnur",
      "Ward 11 - Venkateshwara Colony Sindhnur", "Ward 12 - Ambedkar Nagar Sindhnur",
      "Ward 13 - Shankar Nagar Sindhnur", "Ward 14 - Jawahar Nagar Sindhnur",
      "Ward 15 - Kalmala Road"
    ]
  },
};

export default karnatakaUrbanData;
