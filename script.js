const euCountryCodes = new Set([
  '400', '401', '402', '403', '404', '405', '406', '407', '408', '409',
  '410', '411', '412', '413', '414', '415', '416', '417', '418', '419',
  '420', '421', '422', '423', '424', '425', '426', '427', '428', '429',
  '430', '431', '432', '433', '434', '435', '436', '437', '438', '439',
  '440', // Germany
  '475', // Latvia
  '477', // Lithuania
  '539', // Ireland
  '540', '541', '542', '543', '544', '545', '546', '547', '548', '549',  // Belgium and Luxembourg
  '570', '571', '572', '573', '574', '575', '576', '577', '578', '579', // Denmark
  '590', // Poland
  '594', // Romania
  '599', // Hungary
  '800', '801', '802', '803', '804', '805', '806', '807', '808', '809',
  '810', '811', '812', '813', '814', '815', '816', '817', '818', '819',
  '820', '821', '822', '823', '824', '825', '826', '827', '828', '829',
  '830', '831', '832', '833', '834', '835', '836', '837', '838', '839',  // Italy
  '840', '841', '842', '843', '844', '845', '846', '847', '848', '849',  // Spain
  '870', '871', '872', '873', '874', '875', '876', '877', '878', '879',  // Netherlands
  '380', // Bulgaria
  '383', // Slovenia
  '385', // Croatia
  '730', '731', '732', '733', '734', '735', '736', '737', '738', '739',  // Sweden
  '640', '641', '642', '643', '644', '645', '646', '647', '648', '649',  // Finland
  '560', // Portugal
  '520', '521', // Greece
  '535', // Malta
  '858',  // Slovakia
  '529', // Cyprus
  '900', '901', '902', '903', '904', '905', '906', '907', '908', '909',
  '910', '911', '912', '913', '914', '915', '916', '917', '918', '919' // Austria
]);

const gs1CountryCodes = {
  '000-019': 'USA & Canada',
  '020-029': 'In-store Functions, USA Retailers',
  '030-039': 'USA Drugs, Pharmaceuticals',
  '040-049': 'USA In-store & Warehouse',
  '060-139': 'USA & Canada',
  '200-299': 'In-store Functions, Restricted Circulation',
  '300-379': 'France & Monaco',
  '380': 'Bulgaria',
  '383': 'Slovenia',
  '385': 'Croatia',
  '387': 'Bosnia and Herzegovina',
  '389': 'Montenegro',
  '390': 'Kosovo',
  '400-440': 'Germany',
  '450-459': 'Japan',
  '460-469': 'Russia',
  '470': 'Kyrgyzstan',
  '471': 'Taiwan',
  '474': 'Estonia',
  '475': 'Latvia',
  '476': 'Azerbaijan',
  '477': 'Lithuania',
  '478': 'Uzbekistan',
  '479': 'Sri Lanka',
  '480': 'Philippines',
  '481': 'Belarus',
  '482': 'Ukraine',
  '484': 'Moldova',
  '485': 'Armenia',
  '486': 'Georgia',
  '487': 'Kazakhstan',
  '488': 'Tajikistan',
  '489': 'Hong Kong',
  '490-499': 'Japan',
  '500-509': 'United Kingdom',
  '520-521': 'Greece',
  '528': 'Lebanon',
  '529': 'Cyprus',
  '530': 'Albania',
  '531': 'Macedonia',
  '535': 'Malta',
  '539': 'Ireland',
  '540-549': 'Belgium & Luxembourg',
  '560': 'Portugal',
  '569': 'Iceland',
  '570-579': 'Denmark',
  '590': 'Poland',
  '594': 'Romania',
  '599': 'Hungary',
  '600-601': 'South Africa',
  '603': 'Ghana',
  '604': 'Senegal',
  '608': 'Bahrain',
  '609': 'Mauritius',
  '611': 'Morocco',
  '613': 'Algeria',
  '615': 'Nigeria',
  '616': 'Kenya',
  '618': 'Ivory Coast',
  '619': 'Tunisia',
  '621': 'Syria',
  '622': 'Egypt',
  '624': 'Libya',
  '625': 'Jordan',
  '626': 'Iran',
  '627': 'Kuwait',
  '628': 'Saudi Arabia',
  '629': 'United Arab Emirates',
  '640-649': 'Finland',
  '690-695': 'China',
  '700-709': 'Norway',
  '729': 'Israel',
  '730-739': 'Sweden',
  '740': 'Guatemala',
  '741': 'El Salvador',
  '742': 'Honduras',
  '743': 'Nicaragua',
  '744': 'Costa Rica',
  '745': 'Panama',
  '746': 'Dominican Republic',
  '750': 'Mexico',
  '754-755': 'Canada',
  '759': 'Venezuela',
  '760-769': 'Switzerland & Liechtenstein',
  '770': 'Colombia',
  '773': 'Uruguay',
  '775': 'Peru',
  '777': 'Bolivia',
  '779': 'Argentina',
  '780': 'Chile',
  '784': 'Paraguay',
  '785': 'Ecuador',
  '786': 'Brazil',
  '789': 'Brazil',
  '790': 'Brazil',
  '800-839': 'Italy',
  '840-849': 'Spain',
  '850': 'Cuba',
  '858': 'Slovakia',
  '859': 'Czech Republic',
  '860': 'Yugoslavia',
  '867': 'North Korea',
  '868-869': 'Turkey',
  '870-879': 'Netherlands',
  '880': 'South Korea',
  '884': 'Cambodia',
  '885': 'Thailand',
  '888': 'Singapore',
  '890': 'India',
  '893': 'Vietnam',
  '899': 'Indonesia',
  '900-919': 'Austria',
  '930-939': 'Australia',
  '940-949': 'New Zealand',
  '950': 'GS1 Global Office',
  '951': 'EPCglobal',
  '955': 'Malaysia',
  '958': 'Macau'
};

function checkEUCountry(code) {
  let countryCode = '';
  let countryName = '';

  // Find the matching country code and name
  for (const key in gs1CountryCodes) {
    const range = key.split('-');
    if (range.length === 1) {
      if (code.startsWith(range[0])) {
        countryCode = range[0];
        countryName = gs1CountryCodes[key];
        break;
      }
    } else {
      for (let i = parseInt(range[0], 10); i <= parseInt(range[1], 10); i++) {
        if (code.startsWith(i.toString())) {
          countryCode = i.toString();
          countryName = gs1CountryCodes[key];
          break;
        }
      }
    }
  }

  // Check if the country code is in the EU set
  const isEU = euCountryCodes.has(countryCode);
  return "Country: "+countryCode+" "+countryName+" <b>(" + (isEU ? 'EU' : 'Non-EU') +"</b>)<br>"+code;
}

Quagga.init({
  inputStream: {
    name: "Live",
    type: "LiveStream",
    target: document.querySelector('#interactive')
  },
  decoder: {
    readers: ["ean_reader"]
  }
}, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Initialization finished. Ready to start");
  Quagga.start();
});

Quagga.onDetected(data => {
  const result = checkEUCountry(data.codeResult.code);
  document.getElementById('result').innerHTML = result;
  console.log(result);
});
