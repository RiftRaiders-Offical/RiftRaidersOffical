importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

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

// Nagha-handle ng notifications kapag nasa background o nakasara ang tab
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message:", payload);

  const notificationTitle = payload.notification?.title || "RiftRaiders";
  const notificationOptions = {
    body: payload.notification?.body || "May bagong update ka.",
    icon: payload.notification?.icon || "/favicon.ico",
    data: payload.data || {}
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Kapag clinick ng user ang lumabas na notification
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
