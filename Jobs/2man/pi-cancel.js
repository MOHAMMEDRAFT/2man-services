export default async function handler(req, res) {
  // التحقق من أن الطلب هو POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Vercel يقوم بفك الـ JSON تلقائياً في req.body
    const { paymentId } = req.body;

    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/cancel`, {
      method: "POST",
      headers: {
        "Authorization": `Key ${process.env.PI_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({ success: true, data });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
