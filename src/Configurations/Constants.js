export var Constants = {
    defaultLang: "en",
    supportedLanguages: ["en", "da"],
    appVersion: "1.1",
    domainUrl: window.location.href.indexOf('staging') === -1
        ? 'http://test.event-venue.dk/'
        : 'https://uat-letzwork.azurewebsites.net/',
    googleMapApiKey: "AIzaSyB6ihWhEd-xEVbTS-PXHh8eFLl83VDejRY",
    mapboxToken: "pk.eyJ1IjoiaGFtbzQyNjYxMyIsImEiOiJjbDRkbWJnODAwOXFwM2VtdXlhYjR3eHE0In0.KOvKlcE0RtGEeYIsyd8YRQ"
}