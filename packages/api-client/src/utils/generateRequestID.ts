// utils/generateRequestID.ts

/**
 * Generates a randomized request ID that is 13 characters long
 * @returns {number}
 */
export function generateRequestId(): number {
  // eslint-disable-next-line no-mixed-operators
  const requestID = Math.floor(1000000000000 + Math.random() * 9000000000000);
  return requestID;

}
