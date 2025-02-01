import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Spinner } from "react-bootstrap"; // Import the Spinner component

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://tes-hg-backend.vercel.app/komisi")
      .then((response) => response.json())
      .then((result) => {
        setData(result); // Store the fetched data in state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  return (
    <div className="container mt-5 mb-3">
      <h1>Hasil Perhitungan Komisi Penjualan</h1>

      <div className="container">
        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table responsive="md mt-5">
            <thead>
              <tr>
                <th>Marketing</th>
                <th>Bulan</th>
                <th>Omzet</th>
                <th>Komisi %</th>
                <th>Komisi Nominal</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.marketing_name}</td>
                  <td>{item.bulan}</td>
                  <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.omzet)}</td>
                  <td>{item.komisi_persen} %</td>
                  <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.komisi)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default HomePage;
