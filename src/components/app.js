import React from 'react';
/*import Dashboard from './Dashboard';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import Footer from './Footer';*/
import 'admin-lte/dist/css/AdminLTE.css';
import 'admin-lte/dist/css/skins/_all-skins.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'react-bootstrap-table/css/react-bootstrap-table.css'

import { browserHistory } from "react-router";
import { Header, Dashboard, Sidebar } from "react-adminlte-dash";



const navMenu = () => ([
  <Header.Item
    href={'ttps://github.com/a/a'}
    iconClass="fa fa-user-circle"
    key="1"
    title="Github"
     profileAction={() => browserHistory.push("/Myaccount")}

    signOutAction={() => {
      browserHistory.push("/signin");
      Object.keys(localStorage).forEach(key => {
        if (key.indexOf('firebase') !== -1) {
          browserHistory.push("/signin");
          localStorage.removeItem(key);
        }
      })
    }}
  />,


  <Header.UserMenu
    name="User Name"
    image="./a.jpg"
    profileAction={() => browserHistory.push("/Myaccount")}

    signOutAction={() => {
      browserHistory.push("/signin");
      Object.keys(localStorage).forEach(key => {
        if (key.indexOf('firebase') !== -1) {
          browserHistory.push("/signin");
          localStorage.removeItem(key);
        }
      })
    }}
    key="2"
  />,
]);


const sb = pickTheme => ([
 
 
  <Sidebar.Menu header="NAVIGATION PRINCIPALE" key="3">
    <Sidebar.Menu.Item icon={{ className: 'fa-dashboard' }} title="Acceuil" />
    <Sidebar.Menu.Item icon={{ className: 'fa-user-circle' }} title="Votre Acceuil" href="/Myaccount" />
    <Sidebar.Menu.Item icon={{ className: 'fa-file' }} title="Gestion des fiches" onClick={() => { browserHistory.push("/addFile")}} /> 
    <Sidebar.Menu.Item icon={{ className: 'fa-user-md' }} title="Gestion des medecins" href="/addDoctor" />
    <Sidebar.Menu.Item icon={{ className: 'fa-envelope' }} title="Gestion des alertes" href="/addAlert" />
    <Sidebar.Menu.Item icon={{ className: 'fa-dashboard' }} title="Historiques des alertes" href="/checkhistory" />
    <Sidebar.Menu.Item icon={{ className: 'fa-pie-chart' }} title="Analytics" href="/analytics"/>
    <Sidebar.Menu.Item icon={{ className: 'fa-dashboard' }} title="Support" href="" />
  </Sidebar.Menu>,
]);


const footer = () => ([
  <strong>
    <span>Copyright © 2017-2018 </span>
    <a href="https://katomi.co/">Katomi</a>
    <span>. </span>
  </strong>,
  <span> All rights reserved.</span>,
  <div style={{ float: 'right' }}>
    <b>Version</b>
    <span> 0.1</span>
  </div>,
]);




const App = ({ children, theme, pickTheme }) => (
  <Dashboard
    navbarChildren={navMenu()}
    sidebarChildren={sb(pickTheme)}
    footerChildren={footer()}
    theme={theme}
  >
    <div style={{ height: "200vh" }} id="children">
      {children}
    </div>
  </Dashboard>

);

export default App;
