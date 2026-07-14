const DEFAULT_TO_EMAIL = "dandi525@hotmail.com";
const DEFAULT_CC_EMAIL = "stepsma@hotmail.com";
const DEFAULT_FROM_EMAIL = "TG Healing <onboarding@resend.dev>";

const jsonHeaders = {
  "Content-Type": "application/json",
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
}

function cleanText(value, fallback = "未填写") {
  const text = typeof value === "string" ? value.trim() : "";
  return text || fallback;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getReplyTo(contact) {
  const emailMatch = contact.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
  return emailMatch ? emailMatch[0] : undefined;
}

function buildEmail(booking) {
  const rows = [
    ["姓名 Name", booking.name],
    ["联系方式 Contact", booking.contact],
    ["想预约的项目 Service", booking.service],
    ["期望时间 Preferred Time", booking.preferredTime],
    ["需求 Message", booking.message],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n\n");
  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <th style="text-align:left;padding:10px 12px;border-bottom:1px solid #eee;color:#44513e;">${escapeHtml(label)}</th>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#333;white-space:pre-line;">${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,'Noto Sans SC',sans-serif;line-height:1.6;color:#333;">
      <h2 style="margin:0 0 16px;color:#44513e;">TG Healing 预约需求</h2>
      <table style="border-collapse:collapse;width:100%;max-width:720px;border:1px solid #eee;">
        ${htmlRows}
      </table>
    </div>
  `;

  return { text, html };
}

export async function onRequestPost({ request, env }) {
  let body;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request body" }, 400);
  }

  if (cleanText(body.website, "") !== "") {
    return jsonResponse({ ok: true });
  }

  const booking = {
    name: cleanText(body.name),
    contact: cleanText(body.contact),
    service: cleanText(body.service),
    preferredTime: cleanText(body.preferredTime),
    message: cleanText(body.message),
  };

  if (!env.RESEND_API_KEY) {
    return jsonResponse({ error: "Missing RESEND_API_KEY" }, 500);
  }

  const { text, html } = buildEmail(booking);
  const replyTo = getReplyTo(booking.contact);

  const emailPayload = {
    from: env.BOOKING_FROM_EMAIL || DEFAULT_FROM_EMAIL,
    to: [env.BOOKING_TO_EMAIL || DEFAULT_TO_EMAIL],
    cc: [env.BOOKING_CC_EMAIL || DEFAULT_CC_EMAIL],
    subject: `TG Healing 预约需求 - ${booking.name}`,
    text,
    html,
  };

  if (replyTo) {
    emailPayload.reply_to = replyTo;
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailPayload),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    return jsonResponse({ error: "Email delivery failed", detail: errorText }, 502);
  }

  return jsonResponse({ ok: true });
}

export function onRequestOptions() {
  return jsonResponse({ ok: true });
}
