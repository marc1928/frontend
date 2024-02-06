import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import { Link } from 'react-router-dom'
import SkeletonTable from '../components/SkeletonTable'
import Swal from 'sweetalert2'
import axiosClient from '../axios-client'
import icon from '../assets/img/user-128.png'

export default function User() {

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

  const [loadingskeletonbutton, setLoadingSkeletonButton] = useState(false);

  const [loadingbutton, setLoadingButton] = useState(false);

  const [users, setUsers] = useState([]);

  const [filteredUsers, setFilteredUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.user_lastname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoadingSkeletonButton(true);
    axiosClient.get('/users').then( ({data})=> {
      setUsers(data.data);
      setLoadingSkeletonButton(false);
    }).catch(err => {
      setLoadingSkeletonButton(false);
    });
  };


  const ChangeStateUser  = async(id,user_state) => {
    Swal.fire({
      title: 'Choose a Operation', icon: 'question',showDenyButton: true,showCancelButton: true, confirmButtonColor: '#61396d',confirmButtonText: 'Activer',denyButtonText: `Desactiver`, cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        if(user_state !== "asset")
        {
          let state = "asset";
          const formData = new FormData();
          formData.append('_method', 'PUT');
          setLoadingButton(true);
          await axiosClient.post(`/setstate/${id}/${state}`,formData).then(async ({data})  => {
            const datanotification = { user_id : id, content : "Votre compte ont été activé avec succes", state : "unread", type : "user" };
            await axiosClient.post('/storenotification',datanotification);
            getUsers();
            Swal.fire({position: 'top-right',icon: 'success',title: 'Thanks you!',text: 'This User has been activated',showConfirmButton: true})
          }).catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              Swal.fire({position: 'top-right',icon: 'error',title: 'Oops!',text: 'An error occurred while executing the program',showConfirmButton: true,confirmButtonColor: '#61396d',})
            }
          });
          setLoadingButton(false);
        }
        else{
          Swal.fire({position: 'top-right',icon: 'warning',title: 'Information',text: 'This User is already active',showConfirmButton: true,confirmButtonColor: '#61396d',})
        }
      }
      else if (result.isDenied) {
        if(user_state !== "idle")
        {
          let state = "idle";
          const formData = new FormData();
          formData.append('_method', 'PUT');
          setLoadingButton(true);
          await axiosClient.post(`/setstate/${id}/${state}`,formData).then(async ({data})  => {
            getUsers();
            Swal.fire({position: 'top-right',icon: 'success',title: 'Thanks you!',text: 'This User has been deactivated',showConfirmButton: true})
          }).catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              Swal.fire({position: 'top-right',icon: 'error',title: 'Oops!',text: 'An error occurred while executing the program',showConfirmButton: true,confirmButtonColor: '#61396d',})
            }
          });
          setLoadingButton(false);
        }
        else{
          Swal.fire({position: 'top-right',icon: 'warning',title: 'Information',text: 'This User is already inactive',showConfirmButton: true,confirmButtonColor: '#61396d',})
        }
      }
    });
  };

  return (
    <div id="wrapper">
      <SideBar style={style} changeStyle={changeStyle} />
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <NavBar onSearch={handleSearch} changeStyle={changeStyle} />
          <div class="container-fluid">
            <div class="card shadow mb-4" style={{ overflowY : "scroll", scrollBehavior: "inherit", height : "84vh" }}>
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">
                        Tous les Utilisateurs
                    </h6>
                    <h6 class="m-0 font-weight-bold text-primary float-right">
                        <Link to="/Add-User" title="Envoyer un utilisateur" class="btn btn-primary" style={{ borderRadius : "6px" }}><i class="fas fa-fw fa-plus"></i> </Link>
                    </h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Email</th>
                                <th>Statut</th>                                
                                <th>Matricule</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadingskeletonbutton ? <>{SkeletonTable(7,7)}</>:
                                <>
                                    {filteredUsers && filteredUsers.map((user) => {
                                        let classState = "";
                                        let contentState = "";
                                        if (user.user_state === "asset") {classState = "bg-primary text-white";contentState = "Actif";} 
                                        else if (user.user_state === "idle") { classState = "bg-danger text-white";contentState = "Inactif";}
                                        else{ classState = "bg-warning text-white";contentState = "en Attente";}
                                        return (
                                        <tr>
                                            <td className="vertical-align-middle text-center">
                                              <Link to={!user.user_img || user.user_img == "" || user.user_img == null ? icon : user.user_img}>
                                                <img src={!user.user_img || user.user_img == "" || user.user_img == null ? icon : user.user_img} style={{ height: "40px", width: "40px", borderRadius: "10px", objectFit : "cover" }} /> 
                                              </Link>
                                            </td> 
                                            <td title={ user.user_lastname } style={{ fontSize : "16px", cursor : "pointer" }}>{ user.user_lastname } </td>
                                            <td style={{ fontSize : "16px" }}> { user.user_firstname } </td>
                                            <td style={{ fontSize : "16px" }}> { user.user_email } </td>
                                            <td style={{ fontSize : "16px" }}>
                                              <button href="#" class={`btn btn-circle ${classState}`} style={{ borderRadius : "50%",width: "80px", padding : "10px" }}>
                                                  {contentState}
                                              </button>
                                            </td>
                                            <td style={{ fontSize : "16px" }}> { user.user_matricule } </td>
                                            <td>
                                              <a onClick={() => ChangeStateUser(user.user_id,user.user_state)} class="btn btn-sm btn-secondary " style={{ textDecoration : "none", backgroundColor : "#eeeeee",padding : "5px" }}><span class="text-success">act</span><span class="text-dark">/</span><span class="text-danger">dst</span> {loadingbutton ? <i class="fa fa-refresh fa-spin" style={{ color : "black" }}></i> : null} </a>
                                            </td>                                                                        
                                        </tr> 
                                        );
                                    })} 
                                </>                     
                            }
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
