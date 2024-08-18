import { fetchWrapper } from '../utils/fetchWrapper';

export const fetchRooms = async () => {
  return await fetchWrapper('/rooms');
};

export const updateRoomStatus = async (room_id, status) => {
  await fetchWrapper(`/rooms/${room_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
};

export const fetchAvailableRooms = async () => {
  return await fetchWrapper('/rooms/available');
};
