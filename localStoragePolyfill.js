import storage from 'local-storage-fallback';

if (!('localStorage' in window)) {
  window.localStorage = storage;
}
