export default async function handler(req, res) {
  const { paymentId, txid, accessToken } = req.body;
  const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ txid })
  });
  res.status(200).json({ success: true });
}

