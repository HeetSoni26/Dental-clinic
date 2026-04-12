/**
 * Mock SMS service for 0-cost development.
 * Silently logs SMS triggers to the console and tracks them in the database if needed.
 */
export const sendSMS = async (to: string, message: string) => {
  const useMock = process.env.USE_MOCK_SMS === "true";

  if (useMock) {
    console.log(`[SMS MOCK] To: ${to} | Message: ${message}`);
    return { success: true, mock: true };
  }

  // If real Twilio was configured, logic would go here
  console.warn("SMS service requested but not configured for production.");
  return { success: false, error: "SMS service not configured" };
};
