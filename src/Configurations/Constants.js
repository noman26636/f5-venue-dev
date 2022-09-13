export var Constants = {
    defaultLang: "en",
    supportedLanguages: ["en", "da"],
    appVersion: "1.12",
    domainUrl: window.location.href.indexOf('staging') === -1
        ? 'http://test.event-venue.dk/'
        : 'http://test.event-venue.dk/',
    googleMapApiKey: "AIzaSyB6ihWhEd-xEVbTS-PXHh8eFLl83VDejRY",
    // mapboxToken: "pk.eyJ1IjoiaGFtbzQyNjYxMyIsImEiOiJjbDRkbWJnODAwOXFwM2VtdXlhYjR3eHE0In0.KOvKlcE0RtGEeYIsyd8YRQ"
    mapboxToken: "pk.eyJ1IjoiZGV2aGFtbyIsImEiOiJjbDQ2b2V3ajYwNmlrM2tteGYwZ280aWhoIn0.9HK1MgJZgk6M5puTrrRmRA"
}