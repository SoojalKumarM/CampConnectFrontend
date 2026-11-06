import api from './client';

const d = (p) => p.then((r) => r.data);

export const authApi = {
  register: (body) => d(api.post('/auth/register', body)),
  login: (body) => d(api.post('/auth/login', body)),
  google: (credential) => d(api.post('/auth/google', { credential })),
  me: () => d(api.get('/auth/me')),
};

export const profileApi = {
  mine: () => d(api.get('/profile/me')),
  update: (body) => d(api.put('/profile/me', body)),
  complete: () => d(api.post('/profile/me/complete')),
  addPhoto: (file) => { const f = new FormData(); f.append('file', file); return d(api.post('/profile/me/photos', f)); },
  removePhoto: (i) => d(api.delete(`/profile/me/photos/${i}`)),
  makePrimary: (i) => d(api.put(`/profile/me/photos/${i}/primary`)),
  view: (userId) => d(api.get(`/profiles/${userId}`)),
  setVisibility: (visible) => d(api.put('/account/visibility', { visible })),
  deactivate: () => d(api.delete('/account')),
};

export const discoverApi = {
  list: (params) => d(api.get('/discover', { params })),
  top: () => d(api.get('/discover/top')),
};

export const connectionApi = {
  send: (userId, message) => d(api.post(`/connections/request/${userId}`, { message })),
  received: () => d(api.get('/connections/received')),
  sent: () => d(api.get('/connections/sent')),
  connections: () => d(api.get('/connections')),
  summary: () => d(api.get('/connections/summary')),
  accept: (id) => d(api.post(`/connections/${id}/accept`)),
  decline: (id) => d(api.post(`/connections/${id}/decline`)),
  cancel: (id) => d(api.delete(`/connections/${id}/cancel`)),
  remove: (id) => d(api.delete(`/connections/${id}`)),
};

export const notificationApi = {
  list: () => d(api.get('/notifications')),
  readAll: () => d(api.post('/notifications/read-all')),
  read: (id) => d(api.post(`/notifications/${id}/read`)),
};

export const safetyApi = {
  block: (id) => d(api.post(`/safety/block/${id}`)),
  unblock: (id) => d(api.delete(`/safety/block/${id}`)),
  blocked: () => d(api.get('/safety/blocked')),
  report: (body) => d(api.post('/safety/report', body)),
};
