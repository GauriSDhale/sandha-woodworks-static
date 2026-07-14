import emailjs from "@emailjs/browser";

export type SendEmailResult = { success: boolean; message?: string };

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_SERIVCE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_ACCESS_KEY;

/**
 * Sends a set of template parameters through EmailJS from the browser.
 *
 * The service id, template id and public key are all publishable
 * `NEXT_PUBLIC_` values — EmailJS is designed to run client-side, so exposing
 * them is expected and safe.
 *
 * Never throws — always resolves to a result the UI can render.
 */
export async function sendEmail(
  params: Record<string, unknown>,
): Promise<SendEmailResult> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    return { success: false, message: "Email service is not configured yet." };
  }

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
    return { success: true };
  } catch (error) {
    return { success: false, message: friendlyEmailError(error) };
  }
}

/** Turn an EmailJS error (status + text) into a message the user can act on. */
function friendlyEmailError(error: unknown): string {
  const status =
    typeof error === "object" && error !== null && "status" in error
      ? (error as { status?: number }).status
      : undefined;

  switch (status) {
    case 412:
      // Gmail/provider connection in the EmailJS dashboard lost its send scope.
      return "Our email service is temporarily unavailable. Please email us directly and we'll get right back to you.";
    case 422:
      return "Some required details are missing. Please review the form and try again.";
    case 429:
      return "Too many attempts in a short time. Please wait a moment and try again.";
    case 400:
    case 401:
    case 403:
      return "We couldn't send your message right now. Please try again shortly or email us directly.";
    default:
      return "Network error. Please check your connection and try again, or email us directly.";
  }
}
