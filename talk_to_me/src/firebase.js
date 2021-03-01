import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCGPozXn-gK8q0Suv6IY35VLjE86u1twx8",
    authDomain: "talktome-ec7f2.firebaseapp.com",
    databaseURL: "https://talktome-ec7f2-default-rtdb.firebaseio.com",
    projectId: "talktome-ec7f2",
    storageBucket: "talktome-ec7f2.appspot.com",
    messagingSenderId: "693873571305",
    appId: "1:693873571305:web:b9cfeae4cbb02bb4a8c778"
})

export const auth = app.auth();
export default app;