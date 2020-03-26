const flags = {
    "Italy": "IT",

    "Spain": "ES",

    "China": "CN",

    "Iran": "IR",

    "France": "FR",

    "US": "US",

    "United Kingdom": "GB",

    "Netherlands": "NL",

    "Germany": "DE",

    "Belgium": "BE",

    "Switzerland": "CH",

    "Korea, South": "KR",

    "Sweden": "SE",

    "Brazil": "BR",

    "Turkey": "TR",

    "Indonesia": "ID",

    "Japan": "JP",

    "Portugal": "PT",

    "Philippines": "PH",

    "Denmark": "DK",

    "Austria": "AT",

    "Iraq": "IQ",

    "Ecuador": "EC",

    "China": "CN",

    "Greece": "GR",

    "Algeria": "DZ",

    "Egypt": "EG",

    "San Marino": "SM",

    "Malaysia": "MY",

    "Romania": "RO",

    "Norway": "NO",

    "Poland": "PL",

    "Canada": "CA",

    "China": "CN",

    "India": "IN",

    "Diamond Princess": "XX",

    "Dominican Republic": "DO",

    "Hungary": "HU",

    "Ireland": "IE",

    "Peru": "PE",

    "Argentina": "AR",

    "Canada": "CA",

    "China": "CN",

    "China": "CN",

    "Luxembourg": "LU",

    "Pakistan": "PK",

    "Panama": "PA",

    "Australia": "AU",

    "China": "CN",

    "Canada": "CA",

    "China": "CN",

    "China": "CN",

    "China": "CN",

    "China": "CN",

    "Czechia": "CZ",

    "Lebanon": "LB",

    "Morocco": "MA",

    "Albania": "AL",

    "Bangladesh": "BD",

    "China": "CN",

    "Israel": "IL",

    "Mexico": "MX",

    "Slovenia": "SI",

    "Tunisia": "TN",

    "Ukraine": "UA",

    "Bahrain": "BH",

    "Burkina Faso": "BF",

    "China": "CN",

    "China": "CN",

    "Colombia": "CO",

    "Ghana": "GH",

    "Lithuania": "LT",

    "Serbia": "RS",

    "Thailand": "TH",

    "Bosnia and Herzegovina": "BA",

    "Bulgaria": "BG",

    "Chile": "CL",

    "China": "CN",

    "China": "CN",

    "China": "CN",

    "China": "CN",

    "Cyprus": "CY",

    "Finland": "FI",

    "North Macedonia": "MK",

    "Paraguay": "PY",

    "Russia": "RU",

    "Afghanistan": "AF",

    "Azerbaijan": "AZ",

    "Canada": "CA",

    "China": "CN",

    "China": "CN",

    "China": "CN",

    "China": "CN",

    "China": "CN",

    "Congo (Kinshasa)": "CD",

    "Costa Rica": "CR",

    "Iceland": "IS",

    "Mauritius": "MU",

    "Saudi Arabia": "SA",

    "Singapore": "SG",

    "Taiwan*": "TW",

    "United Arab Emirates": "AE",

    "Andorra": "AD",

    "Australia": "AU",

    "Cabo Verde": "CV",

    "Cameroon": "CM",

    "China": "CN",

    "China": "CN",

    "China": "CN",

    "China": "CN",

    "China": "CN",

    "Croatia": "HR",

    "Cuba": "CU",

    "Estonia": "EE",

    "France": "FR",

    "France": "FR",

    "Gabon": "GA",

    "Gambia": "GM",

    "Guatemala": "GT",

    "Guyana": "GY",

    "Jamaica": "JM",

    "Moldova": "MD",

    "Montenegro": "ME",

    "Netherlands": "NL",

    "Niger": "NE",

    "Nigeria": "NG",

    "Sudan": "SD",

    "Trinidad and Tobago": "TT",

    "United Kingdom": "GB",

    "Zimbabwe": "ZW",

    "Canada": "CA",

    "Angola": "AO",

    "Antigua and Barbuda": "AG",

    "Armenia": "AM",

    "Australia": "AU",

    "Australia": "AU",

    "Australia": "AU",

    "Australia": "AU",

    "Australia": "AU",

    "Australia": "AU",

    "Bahamas": "BS",

    "Barbados": "BB",

    "Belarus": "BY",

    "Benin": "BJ",

    "Bhutan": "BT",

    "Bolivia": "BO",

    "Brunei": "BN",

    "Cambodia": "KH",

    "Canada": "CA",

    "Canada": "CA",

    "Canada": "CA",

    "Canada": "CA",

    "Canada": "CA",

    "Canada": "CA",
    "Canada": "CA",
    "Central African Republic": "CF",
    "Chad": "TD",
    "China": "CN",
    "China": "CN",
    "China": "CN",
    "China": "CN",
    "China": "CN",
    "China": "CN",
    "Congo (Brazzaville)": "CG",
    "Cote d'Ivoire": "CI",
    "Denmark": "DK",
    "Denmark": "DK",
    "Djibouti": "DJ",
    "El Salvador": "SV",
    "Equatorial Guinea": "GQ",
    "Eritrea": "ER",
    "Eswatini": "SZ",
    "Ethiopia": "ET",
    "Fiji": "FJ",
    "France": "FR",
    "France": "FR",
    "France": "FR",
    "France": "FR",
    "France": "FR",
    "France": "FR",
    "France": "FR",
    "Georgia": "GE",
    "Guinea": "GN",
    "Haiti": "HT",
    "Holy See": "VA",
    "Honduras": "HN",
    "Jordan": "JO",
    "Kazakhstan": "KZ",
    "Kenya": "KE",
    "Kuwait": "KW",
    "Kyrgyzstan": "KG",
    "Latvia": "LV",
    "Liberia": "LR",
    "Liechtenstein": "LI",
    "Madagascar": "MG",
    "Maldives": "MV",
    "Malta": "MT",
    "Mauritania": "MR",
    "Monaco": "MC",
    "Mongolia": "MN",
    "Namibia": "NA",
    "Nepal": "NP",
    "Netherlands": "NL",
    "New Zealand": "NZ",
    "Nicaragua": "NI",
    "Oman": "OM",
    "Papua New Guinea": "PG",
    "Qatar": "QA",
    "Rwanda": "RW",
    "Saint Lucia": "LC",
    "Saint Vincent and the Grenadines": "VC",
    "Senegal": "SN",
    "Seychelles": "SC",
    "Slovakia": "SK",
    "Somalia": "SO",
    "South Africa": "ZA",
    "Sri Lanka": "LK",
    "Suriname": "SR",
    "Tanzania": "TZ",
    "Togo": "TG",
    "Uganda": "UG",
    "Uruguay": "UY",
    "Uzbekistan": "UZ",
    "Venezuela": "VE",
    "Vietnam": "VN",
    "Zambia": "ZM",
    "Dominica": "DM",
    "Grenada": "GD",
    "Mozambique": "MZ",
    "Syria": "SY",
    "Timor-Leste": "TL",
    "Belize": "BZ",
    "Laos": "LA",
    "Libya": "LY",
    "Guinea-Bissau": "GW",
    "Mali": "ML",
    "Saint Kitts and Nevis": "KN",
    "West Bank and Gaza": "XX"

}
export { flags }