import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const PembayaranForm = () => {
  const [marketingOptions, setMarketingOptions] = useState([]);
  const [selectedMarketing, setSelectedMarketing] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://tes-hg-backend.vercel.app/marketing")
      .then((response) => response.json())
      .then((result) => {
        setMarketingOptions(result);
      })
      .catch((error) => {
        console.error("Error fetching marketing options:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedMarketing || !amountPaid) {
      alert("Please fill in both fields.");
      return;
    }

    setLoading(true);

    const payload = {
      marketing_id: selectedMarketing,
      amount_paid: parseInt(amountPaid),
    };

    fetch("https://tes-hg-backend.vercel.app/pembayaran", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        alert("Pembayaran berhasil!");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error posting data:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className="container mt-4">
      <h1>Form Pembayaran</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="marketingSelect">
          <Form.Label>Select Marketing</Form.Label>
          <Form.Control
            as="select"
            value={selectedMarketing}
            onChange={(e) => setSelectedMarketing(e.target.value)}
          >
            <option value="">-- Select Marketing --</option>
            {marketingOptions.map((marketing) => (
              <option key={marketing.id} value={marketing.id}>
                {marketing.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="amountPaid">
          <Form.Label>Amount Paid</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default PembayaranForm;
