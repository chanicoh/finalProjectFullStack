import { fetchWrapper } from '../utils/fetchWrapper';

export const createReservation = async (room_id, check_in, check_out) => {
  await fetchWrapper('/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ room_id, check_in, check_out })
  });
};
