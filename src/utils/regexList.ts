// const phoneNumberRegex = /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
// const phoneNumberRegex = /^[0]?[6789]\d{9}$/;
const phoneNumberRegex = /^(?!([0-9])\1{9})[0]?[6789]\d{9}$/;
const numberRegex = /^\d+$/;
// const emailRegEx = (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/);
const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var inValid = /\s/;
const YTRRegEx = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/|watch\?v%3D|%2Fvideos%2F|.+?v=))([a-zA-Z0-9_-]{11})(?:\S+)?/;
const regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
const adharValid = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
const licenseRegex = /^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/;
const Passportregex = /^[A-PR-WYa-pr-wy][0-9]{7}$/;
const IFSCRegex = /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/;
const AmountRegex = /^\d+(\.\d{1,2})?$/;
const decimalRegex = /^\d{0,9}(\.\d{1,2})?$/;
// const englishTextRegex = /[^\x20-\x7E]/g;
const englishTextRegex = /[^\x20-\x7E\n\r]/g;


export {
    phoneNumberRegex,
    numberRegex,
    emailRegEx,
    inValid,
    YTRRegEx,
    regpan,
    adharValid,
    licenseRegex,
    Passportregex,
    IFSCRegex,
    AmountRegex,
    decimalRegex,
    englishTextRegex
};
