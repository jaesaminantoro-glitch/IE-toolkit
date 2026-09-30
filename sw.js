// Service Worker minimal — tidak cache apa pun
// Supaya web tetap online & real-time seperti biasa
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());