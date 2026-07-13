export type SendEmailResult = { success: boolean; message?: string };

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_EMAIL_ACCESS_KEY;

/**
 * Submits a prepared FormData (labeled fields + optional file attachments)
 * to Web3Forms.
 *
 * Web3Forms' free tier only accepts requests from the browser (server-side
 * calls are blocked by a Cloudflare bot challenge), so this runs client-side
 * and the access key is a publishable `NEXT_PUBLIC_` value — it can only send
 * mail to the account owner's inbox, so exposing it is safe and expected.
 *
 * Never throws — always resolves to a result the UI can render.
 */
export async function sendEmail(formData: FormData): Promise<SendEmailResult> {
  if (!ACCESS_KEY) {
    return { success: false, message: "Email service is not configured." };
  }

  formData.set("access_key", ACCESS_KEY);

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, { method: "POST", body: formData });
    const data = (await res.json().catch(() => null)) as SendEmailResult | null;
    if (!res.ok || !data?.success) {
      return { success: false, message: data?.message ?? "Something went wrong. Please try again." };
    }
    return { success: true };
  } catch {
    return { success: false, message: "Network error. Please check your connection and try again." };
  }
}
