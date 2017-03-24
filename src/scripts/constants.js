/**
 * constants
 */
var LEGENDS = {
  connect: {
    title: 'Får respons fra GetCapabilities',
    description: 'Testkallet fikk respons fra GetCapabilities-kall mot adressen'
  },
  email: {
    title: 'Har utfylt kontaktepostadresse',
    description: 'GetCapabilities responsen inneholder en epostadresse til kontaktperson hos tjenesteansvarlig'
  },
  cors: {
    title: 'CORS parametre er satt korrekt',
    description: 'HTTP responsen for GetCapabilities-kallet inneholder korrekte  CORS parametre i feltet Access-Control-Allow-Origin'
  },
  epsgSupported: {
    title: 'Støtter EPSG:32633 eller 25833',
    description: 'GetCapabilities oppgir at tjenesten støtter EUREF89 UTM sone 33 eller ETRS89 UTM sone 33'
  },
  hasGFI: {
    title: 'Støtter egenskapsspørringer',
    description: 'GetCapabilities responsen oppgir at tjenesten støtter GetFeatureInfo-kallet'
  },
  hasLegend: {
    title: 'Støtter tegnforklaringer',
    description: 'GetCapabilities responsen oppgir at tjenesten støtter GetLegendGraphics-kallet eller LegendURL-kallet'
  },
  hasACA: {
    title: 'Oppgir nødvendig lisensinformasjon',
    description: 'Tjenesten oppgir både Attribution og AccessConstraints'
  },
  gfiOnGroupError: {
    title: 'Støtter egenskapsspørringer på gruppelag',
    description: 'GetCapabilities responsen oppgir at tjenesten støtter GetFeatureInfo-kallet for gruppelag'
  },
  svgError: {
    title: 'Korrekt text/xml+svg decoding',
    description: 'Noen kartklienter (Adaptive) har problemer med å dekode '+'-tegnet i responser, derfor tester vi dette'
  },
  stylesError: {
    title: 'Parameteren "style" er valgfri',
    description: 'Noen kartklienter (ESRI) er har problemer med å fortolke "style"-parameteren, selv om den er tom'
  },
  bbox: {
    title: 'Oppgir dekningsområde',
    description: 'Tjenesten oppgir hvilket område dataene befinner seg innenfor angitt som en BoundingBox'
  },
  featuresVisible: {
    title: 'Objekter er synlige innenfor dekningsområdet',
    description: 'For sikre at det kan gis brukerstøtte for hvor objektene faktisk befinner seg. Man kan da spørre på f.eks 100x100 px og se hvor data befinner seg.'
  },
  numLayers: {
    title: 'Antall tjenestelag',
    description: 'Antall lag som er satt opp i tjenesten. Jo flere lag desto tregere kan tjenesten respondere'
  }
}
