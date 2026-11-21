importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyB7GyUvjxpgvVOpSS_wjH25m6HssUd_jbM",
  authDomain: "riftraiders-348f4.firebaseapp.com",
  databaseURL: "https://riftraiders-348f4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "riftraiders-348f4",
  storageBucket: "riftraiders-348f4.firebasestorage.app",
  messagingSenderId: "103200979693",
  appId: "1:103200979693:web:48d4b7f6e65734f2756ae4"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = (payload.notification && payload.notification.title) || "Rift Raiders";
  const notificationOptions = {
    body: (payload.notification && payload.notification.body) || "New guild notification.",
    icon: "https://i.ibb.co/6R7QW3L/79923.jpg"
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
