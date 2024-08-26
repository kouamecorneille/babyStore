importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA1Y6YIoIOvfW2lhJ9enVN9RYej2wqh9W0",
  authDomain: "djassa2baby-275ef.firebaseapp.com",
  projectId: "djassa2baby-275ef",
  storageBucket: "djassa2baby-275ef.appspot.com",
  messagingSenderId: "954955986841",
  appId: "1:954955986841:web:a1f3d26049526356934508",
  measurementId: "G-4J4K3QYEQS"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
