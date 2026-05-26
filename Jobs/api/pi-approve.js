export default async function handler(req, res) {
  const { paymentId, accessToken } = req.body;
  const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json' 
    }
  });
  res.status(200).json({ success: true });
}

