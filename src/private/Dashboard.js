import React, { useContext, useEffect, useRef, useState } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import iconuser from '../assets/img/user-128.png'
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import ReactQuill from "react-quill";
import { differenceInDays, format } from 'date-fns';

export default function Dashboard() {
    const [style, setStyle] = useState(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      );
    
    const changeStyle = () => {
        if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled") {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
        } else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
        }
    }

    const currentDate = new Date();
    const dateTime = format(currentDate, "yyyy-MM-dd HH:mm:ss");

    const [tasks, setTasks] = useState([]);

    const [loadingskeletonbutton, setLoadingSkeletonButton] = useState(false);

    const { currentUser, token } = useContext(AuthContext);
    
  return (
    <div id="wrapper">
      <SideBar style={style} changeStyle={changeStyle} />
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <NavBar changeStyle={changeStyle} />
          <div class="container-fluid">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Tableau de Bord</h1><br/>
            </div>
        </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
