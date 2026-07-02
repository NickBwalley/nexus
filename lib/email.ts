type EmailPayload = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

type WaitlistEmailInput = {
  name: string;
  email: string;
  company: string;
  role?: string;
  suggestions?: string;
};

const notificationEmail = "nickbiiybwalley@gmail.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendEmail(payload: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "Agentible Nexus <onboarding@resend.dev>";

  if (!apiKey) {
    return { skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      html: payload.html
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend email failed: ${error}`);
  }

  return { skipped: false };
}

export async function sendWaitlistEmails(input: WaitlistEmailInput) {
  const safeName = escapeHtml(input.name);
  const safeEmail = escapeHtml(input.email);
  const safeCompany = escapeHtml(input.company);
  const safeRole = escapeHtml(input.role || "Not provided");
  const safeSuggestions = escapeHtml(input.suggestions || "No suggestions provided.");

  const userEmail = sendEmail({
    to: input.email,
    subject: "You are on the Agentible Nexus waitlist",
    text: `Hi ${input.name},

Thank you for joining the Agentible Nexus waitlist. You will receive priority access as one of our first esteemed customers.

We will reach out soon with confirmation and next steps.

Agentible Nexus`,
    html: `<p>Hi ${safeName},</p>
<p>Thank you for joining the <strong>Agentible Nexus</strong> waitlist. You will receive priority access as one of our first esteemed customers.</p>
<p>We will reach out soon with confirmation and next steps.</p>
<p>Agentible Nexus</p>`
  });

  const ownerEmail = sendEmail({
    to: notificationEmail,
    subject: `New waitlist signup: ${input.email}`,
    text: `A new user has registered for the Agentible Nexus waitlist.

Name: ${input.name}
Email: ${input.email}
Company: ${input.company}
Role: ${input.role || "Not provided"}
Suggestions: ${input.suggestions || "No suggestions provided."}`,
    html: `<p>A new user has registered for the <strong>Agentible Nexus</strong> waitlist.</p>
<ul>
  <li><strong>Name:</strong> ${safeName}</li>
  <li><strong>Email:</strong> ${safeEmail}</li>
  <li><strong>Company:</strong> ${safeCompany}</li>
  <li><strong>Role:</strong> ${safeRole}</li>
  <li><strong>Suggestions:</strong> ${safeSuggestions}</li>
</ul>`
  });

  const results = await Promise.allSettled([userEmail, ownerEmail]);
  const failed = results.find((result) => result.status === "rejected");

  if (failed?.status === "rejected") {
    throw failed.reason;
  }

  return results.some((result) => result.status === "fulfilled" && !result.value.skipped);
}
