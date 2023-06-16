import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

const HomeOwner = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10); // Jumlah data yang ditampilkan per halaman
  const history = useHistory();

  const getMonthFromDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const monthIndex = date.getMonth();
    return monthNames[monthIndex];
  };

  useEffect(() => {
    getTransaksi();
  }, []);

  const getTransaksi = async () => {
    try {
      const response = await axios.get("http://localhost:5000/payment");
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Logout = async () => {
    try {
      const response = await axios.delete("http://localhost:5000/logout", {
        withCredentials: true, // Send session cookies
      });
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('token');
      console.log("session Hapus: ", sessionStorage);
      console.log("Logout Message: ", response.data.msg); // Menampilkan pesan logout
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Mengelompokkan transaksi berdasarkan bulan
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const month = getMonthFromDate(transaction.createdAt);
    if (!groups[month]) {
      groups[month] = [];
    }
    groups[month].push(transaction);
    return groups;
  }, {});

  const handleMonthSelect = (event) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);
  };

  // Menghitung total harga untuk setiap bulan
  const calculateTotalHarga = (month) => {
    const transactions = groupedTransactions[month];
    if (transactions && transactions.length > 0) {
      return transactions.reduce(
        (total, transaction) => total + transaction.total_harga,
        0
      );
    }
    return 0;
  };

  // Render total harga untuk setiap bulan
  const renderTotalHarga = () => {
    return (
      <div>
        <h3>Total Harga Bulanan:</h3>
        {Object.keys(groupedTransactions).map((month) => (
          <p key={month}>
            {month}:{" "}
            {selectedMonth === month
              ? `Rp.${calculateTotalHarga(month)}`
              : " - "}
          </p>
        ))}
      </div>
    );
  };

  const filteredTransactions = selectedMonth
    ? groupedTransactions[selectedMonth] || []
    : transactions;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredTransactions.length / transactionsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <Button
            variant="outline-dark"
            className="mx-2 mb-5"
            style={{
              borderRadius: "50px",
              border: "2px solid black",
            }}
            onClick={Logout}
          >
            Logout
          </Button>
          <h1
            style={{
              textDecoration: "underline",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              color: "#27374D",
            }}
          >
            LAPORAN BULANAN
          </h1>

          <div style={{ marginBottom: "2rem" }}>
            <h3>Pilih Bulan:</h3>
            <select
              value={selectedMonth}
              onChange={handleMonthSelect}
              style={{ width: "200px" }}
            >
              <option value="">Semua Bulan</option>
              {Object.keys(groupedTransactions).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          {selectedMonth && groupedTransactions[selectedMonth] ? (
            <div>
              <h2 style={{ marginTop: "2rem" }}>{selectedMonth}</h2>
              {renderTotalHarga()}
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">ID Transaksi</th>
                      <th scope="col">ID Product</th>
                      <th scope="col">ID Pelanggan</th>
                      <th scope="col">ID Pegawai</th>
                      <th scope="col">Total Harga</th>
                      <th scope="col">Tanggal Pemasukan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTransactions.map((transaction, index) => (
                      <tr key={transaction.id}>
                        <th scope="row">
                          {index + 1 + indexOfFirstTransaction}
                        </th>
                        <td>{transaction.id}</td>
                        <td>{transaction.id_Produk}</td>
                        <td>{transaction.id_Pelanggan}</td>
                        <td>{transaction.id_Pegawai}</td>
                        <td> Rp.{transaction.total_harga}</td>
                        <td>{transaction.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredTransactions.length > transactionsPerPage && (
                <nav className="d-flex justify-content-center mt-3">
                  <ul className="pagination">
                    {pageNumbers.map((number) => (
                      <li key={number} className="page-item">
                        <button
                          onClick={() => paginate(number)}
                          className="page-link"
                          style={{
                            borderRadius: "50%",
                            width: "30px",
                            height: "30px",
                          }}
                        >
                          {number}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          ) : (
            <p>
              {selectedMonth ? "Data belum tersedia" : "Silakan pilih bulan"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeOwner;
