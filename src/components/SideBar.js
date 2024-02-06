import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function SideBar({ style, changeStyle }) {

  const location = useLocation();

  const isActiveMenuItem = (paths) => {
    return paths.some((path) => location.pathname.includes(path));
  };

  const { currentUser, token } = useContext(AuthContext);

  return (
        <ul class={style} id="accordionSidebar">
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-icon">
                  BPCE
                </div>
                <div class="sidebar-brand-text mx-3">GESTION</div>
            </a>
            <hr class="sidebar-divider my-0"/>
            <li class={isActiveMenuItem(["/Dashboard"])? "nav-item active": "nav-item"}>
                <Link class="nav-link" to="/Dashboard">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Tableau de bord</span></Link>
            </li>
            <li class={isActiveMenuItem(["/Departments","/Add-Department","/Posts","/Add-Post","/All-Users","/Update-Department","/Update-Post","/Update-User"])? "nav-item active": "nav-item"}>
                <Link class="nav-link" to="/All-Users">
                    <i class="fas fa-fw fa-user"></i>
                    <span>Utilisateurs</span>
                </Link>
            </li>

            <li class={isActiveMenuItem(["/Profile"])? "nav-item active": "nav-item"}>
                <Link class="nav-link" to="/Profile">
                    <i class="fa fa-cog"></i>
                    <span>Paramètres</span></Link>
            </li>

            <li class={isActiveMenuItem(["/Notifications"])? "nav-item active": "nav-item"}>
                <Link class="nav-link" to="/Notifications">
                    <i class="fas fa-bell fa-fw"></i>
                    <span>Notifications</span></Link>
            </li>

            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" onClick={changeStyle} id="sidebarToggle"></button>
            </div>

        </ul>
  );
}
