export const sitePagesInfo = {
  home: {
    name: 'Home',
  },
  about: {
    name: 'About',
  },
  activities: {
    name: 'Activities',
  },
  referral: {
    name: 'Refer & Earn',
  },
  blog: {
    name: 'Blog',
  },
  // mybookings: {
  //   name: 'My Bookings',
  // },
  partner: {
    name: 'List Your Class',
  },
};

// export const blogRedirectUrl = 'https://medium.com/@learnifii';
// export const partnerRedirectUrl = 'http://learnifii.renderforestsites.com';
// eslint-disable-next-line prefer-destructuring
export const partnerRedirectUrl = 'https://partner.learnifii.com';
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
console.log(process.env.ACCESS_TOKEN);
console.log(process.env.API_BASE_URL);
console.log(process.env);

const OAUTH2_REDIRECT_URI = `${window.location.origin}/oauth2/redirect`;
console.log('outhredirect', OAUTH2_REDIRECT_URI);
//export const GOOGLE_AUTH_URL = `${
//  process.env.API_BASE_URL
//}/oauth2/authorize/google?redirect_uri=${OAUTH2_REDIRECT_URI}`;
export const GOOGLE_AUTH_URL = ``;
export const FACEBOOK_AUTH_URL = ``;
//export const FACEBOOK_AUTH_URL = `${
//  process.env.API_BASE_URL
//}/oauth2/authorize/facebook?redirect_uri=${OAUTH2_REDIRECT_URI}`;
export const GITHUB_AUTH_URL = `${
  process.env.API_BASE_URL
}/oauth2/authorize/github?redirect_uri=${OAUTH2_REDIRECT_URI}`;
