import { Constants } from "../Configurations/Constants";
import configureStore from "../Store/configureStore";
import * as TYPES from '../Store/actions/types';

export const formatDate = (value) => {
    value = new Date(value);
    let date = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate();
    let month = (value.getMonth() + 1) < 10 ? `0${(value.getMonth() + 1)}` : (value.getMonth() + 1);
    return `${date}/${month}/${value.getFullYear()}`
}
export const setDefaultLang = () => {
    const { language: browserLanguage } = window.navigator || {};
    const defaultLang = browserLanguage === 'da-DK' ? 'da' : Constants.defaultLang;
    import('../StorageVariables/languages/' + defaultLang)
        .then((res) => {
            configureStore.dispatch({
                type: TYPES.USER_LANGUAGE_DATA,
                data: { language: defaultLang, translations: res.stringVariables },
            });
        })
        .catch((error) => error);
};
export const allowDanishChar = `/[^a-zA-Z0-9ÄÖÜäöüßÁÐÉÍÓÚÝÞÆÖáðéíóúýþæöïĳåæøÅÆØçÇñÑäÄèòàùç°§öåäÅÖÄøæåÅØÆ!@$%^&æåøÆÅØéèçà$ù£µ§ÓÚẂÝÀÈÌÒÙẀỲÄËÖÜẄŸóúẃýàèìòùẁỳäëöüẅÿa-zA-Z0-9"".,_ ]*$/g, ''`
