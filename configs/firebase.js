const firebase = require('firebase');

const firebaseConfig = {
  apiKey: "AIzaSyCYeSM_5MFi2ycYEpyl3bsyamnZL1Xc-3E",
  authDomain: "sakibott.firebaseapp.com",
  projectId: "sakibott",
  storageBucket: "sakibott.appspot.com",
  messagingSenderId: "92199448824",
  appId: "1:92199448824:web:bb33f296735349915f8b0d"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

module.exports = { db }