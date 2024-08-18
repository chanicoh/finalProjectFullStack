import { fetchWrapper } from '../utils/fetchWrapper';

export const createServiceRequest = async (room_id, request_type, request_description) => {
  await fetchWrapper('/service-requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ room_id, request_type, request_description })
  });
};
