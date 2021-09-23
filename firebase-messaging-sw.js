importScripts("https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js");

const config = {
  apiKey: "<%=process.env.VUE_APP_apiKey %>",
  authDomain: "<%=process.env.VUE_APP_authDomain %>",
  databaseURL: "<%=process.env.VUE_APP_databaseURL %>",
  projectId: "<%=process.env.VUE_APP_projectId %>",
  storageBucket: "<%=process.env.VUE_APP_storageBucket %>",
  messagingSenderId: "<%=process.env.VUE_APP_messagingSenderId %>",
  appId: "<%=process.env.VUE_APP_appId %>",
  measurementId: "<%=process.env.VUE_APP_measurementId %>",
};
firebase.initializeApp(config);
console.log(
  "firebase.messaging.isSupported()",
  firebase.messaging.isSupported()
);
let messaging;

if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
}
// const messaging = firebase.messaging();

// create one broadcast channel to listen setBackgroundMessageHandler at client side
const broadcast = new BroadcastChannel("notification-channel");

messaging.setBackgroundMessageHandler(function(payload) {
  broadcast.postMessage({
    type: "SEND_NOTIFICATION",
    payload: payload.data.title,
  });

  const notificationTitle = payload.data.title;

  const notificationOptions = {
    body: payload.data.body,
    icon: "/firebase-logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", (event) => {
  return event;
});
