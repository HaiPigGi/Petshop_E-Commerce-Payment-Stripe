import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import "./style/style.css";
const NavAdmin = () => {
  const history = useHistory();
  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("token");
      console.log("session Hapus: ", sessionStorage);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        overflow: "hidden",
      }}>
      <CDBSidebar
        className="mb-9"
        textColor="#fff"
        backgroundColor="#333"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
        }}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}>
            Admin Zoepy
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/admin" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="th-large">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/adminUser" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">User</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/adminCret" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Add Product</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/adminProduct" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Product List
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/paymentList" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="credit-card">
                Transaksi
              </CDBSidebarMenuItem>
            </NavLink>

            <CDBSidebarMenuItem icon="chart-line">
              <button
                onClick={handleLogout}
                className="button is-small is-danger">
                Logout
              </button>
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}>
            Zoepy Petshop
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default NavAdmin;
