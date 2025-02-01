import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Spinner, Button, Form } from "react-bootstrap";

const PembayaranPage = () => {
  const [marketingOptions, setMarketingOptions] = useState([]);
  const [selectedMarketing, setSelectedMarketing] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);
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

  // Handle filter button click
  const handleFilterClick = () => {
    if (!selectedMarketing || !selectedDate) {
      alert("Please select both marketing and date.");
      return;
    }

    setLoading(true);
    fetch(
      `https://tes-hg-backend.vercel.app/pembayaran/${selectedMarketing}/${selectedDate}`
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pembayaran data:", error);
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Pembayaran Kredit (Filter terlebih dahulu)</h1>

      {/* Filter Section */}
      <div className="mt-4">
        <Form.Group controlId="marketingSelect" className="mt-4 mb-3">
          <Form.Label>Select Marketing</Form.Label>
          <Form.Control
            as="select"
            value={selectedMarketing}
            onChange={(e) => setSelectedMarketing(e.target.value)}
          >
            <option value="">Select Marketing</option>
            {marketingOptions.map((marketing) => (
              <option key={marketing.id} value={marketing.id}>
                {marketing.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="dateInput" className="mt-4 mb-3">
          <Form.Label>Select Month and Year</Form.Label>
          <Form.Control
            type="month"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </Form.Group>

        <Button className="mt-4 mb-3" variant="primary" onClick={handleFilterClick}>
          Filter
        </Button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (

        data.length > 0 && (
          <Table responsive="md" className="mt-5">
            <thead>
              <tr>
                <th>Bulan</th>
                <th>Nama</th>
                <th>Jumlah</th>
                <th>Sisa Kredit</th>
                <th>Komisi Yang Harus Dilunasi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.bulan}</td>
                  <td>{item.name}</td>
                  <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.total_amount_paid)}</td>
                  <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.remaining_balance)}</td>
                  <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(5000000)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
      )}
    </div>
  );
};

export default PembayaranPage;
