import React, { useEffect } from "react";
import { Constants } from "../../Configurations/Constants";
export default function LocationPicker(props) {
  const { name, title, error, type, fieldId = "", order, values, value, key, customWrapperClass, customLocationRight, errorClass, id, onKeyDown, onMouseEnter } =
    props;

  const translations = userLanguageData.translations;
  useEffect(() => {
    loadGooglePlacesScript();
  }, []);
  //169,163=fieldId of pickup address
  //170,165=fieldId of dropOff address
  const loadGooglePlacesScript = () => {
    if (fieldId === 169 || fieldId === 163 || fieldId === "address") {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${Constants.googlePlacesApiKey}&callback=initAutocomplete&libraries=places&v=weekly`;
      script.async = true;
      document.getElementsByTagName("head")[0].appendChild(script);
    }
    else if (fieldId === 170 || fieldId === 165) {
      setTimeout(() => {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${Constants.googlePlacesApiKey}&callback=initAutocomplete2&libraries=places&v=weekly`;
        script.async = true;
        document.getElementsByTagName("head")[0].appendChild(script);
      }, 2000);
    }
  };
  window.initAutocomplete = () => {
    let addressField;
    if (document.getElementById('169')) { addressField = document.getElementById('169'); }
    else if (document.getElementById('163')) { addressField = document.getElementById('163'); }
    else
      if (document.getElementById('address')) { addressField = document.getElementById('address'); }
    let autocomplete;
    autocomplete = new window.google.maps.places.Autocomplete(addressField, {
      componentRestrictions: { country: ["dk"] },
      fields: ["place_id", "address_components", "geometry", "formatted_address"],
    });
    autocomplete.addListener("place_changed", () => {
      if (document.getElementById('169')) {
        props.onChange('169', autocomplete, JSON.parse(localStorage.getItem("values")))
      }
      else if (document.getElementById('163')) {
        props.onChange('163', autocomplete, JSON.parse(localStorage.getItem("values")))
      }
      else {
        props.onChange('address', autocomplete, JSON.parse(localStorage.getItem("values")))
      }
    }
    );
  };
  window.initAutocomplete2 = () => {
    let addressField1 = document.getElementById('170') ? document.getElementById('170') : document.getElementById('165');
    let autocomplete1;
    autocomplete1 = new window.google.maps.places.Autocomplete(addressField1, {
      componentRestrictions: { country: ["dk"] },
      fields: ["place_id", "address_components", "geometry", "formatted_address"],
    });
    autocomplete1.addListener("place_changed", () => {
      if (document.getElementById('170')) props.onChange('170', autocomplete1, JSON.parse(localStorage.getItem("values")))
      else
        props.onChange('165', autocomplete1, JSON.parse(localStorage.getItem("values")))
    }
    );
  };
  return (
    <div className={`inputWrapper ${customWrapperClass}`} style={{ order: `${order}` }} key={key} id={id}>

    </div>
  );
}
