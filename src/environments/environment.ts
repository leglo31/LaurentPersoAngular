import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Initialize Firebase
/* const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyC90IOb2Nuo85ZhwrTNSfYPSCNLB4KnAQQ',
    authDomain: 'laurentpersoangular.firebaseapp.com',
    projectId: 'laurentpersoangular',
    storageBucket: 'laurentpersoangular.appspot.com',
    messagingSenderId: '61102975249',
    appId: '1:61102975249:web:15936e18539378c7db84b0',
    measurementId: 'G-PYP23YPMW6',
  },
};
