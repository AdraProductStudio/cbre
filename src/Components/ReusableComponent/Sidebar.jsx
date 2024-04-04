import React, { useContext, useEffect } from 'react'
import { RxDashboard } from "react-icons/rx";
import { MdBarChart } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs"; 
import {  NavLink } from 'react-router-dom'; 
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaRobot } from "react-icons/fa";
import CommonContext from '../StateManagment/CommonContext';


const Sidebar = () => {
    const {portfolioData,getPortFolioToken,diveDeepData,getDiveDeepToken,analysisData,getAnalysisToken} = useContext(CommonContext);

    const handleLogout = () => {
        localStorage.removeItem('initialToken');
        localStorage.removeItem("portfolioToken")
        localStorage.removeItem("diveDeepToken");
        localStorage.removeItem("analysisToken"); 
    }   

    const handlePortfolio = () => {  
        getPortFolioToken(portfolioData.group_id,portfolioData.report_id);
        localStorage.removeItem("diveDeepToken");
        localStorage.removeItem("analysisToken"); 
    }
    const handleDiveDeep = () => { 
        getDiveDeepToken(diveDeepData.group_id,diveDeepData.report_id);
        localStorage.removeItem("analysisToken");
        localStorage.removeItem("portfolioToken"); 
    }
    const handleAnalysis = () => { 
        getAnalysisToken(analysisData.group_id,analysisData.report_id);
        localStorage.removeItem("diveDeepToken");
        localStorage.removeItem("portfolioToken"); 
    }
    const handleMatsuriAi = () => { 
        localStorage.removeItem("diveDeepToken");
        localStorage.removeItem("analysisToken");
        localStorage.removeItem("portfolioToken"); 
    }

    

    return (
        <div className='sidebar-width d-none d-lg-block border-end'>
            <div className="container">
                <div className="row">
                    <div className='sidebar-top-logo d-flex flex-wrap align-items-center justify-content-center'>
                        <div>
                            <img src={require('../Images/cbre_logo.png')} alt='cbre-logo' className='cbre-sidebar-logo' />                       
                        </div>
                    </div>

                    <ul className="sidebar-middle-links nav align-content-start nav_list p-0">
                        <li className='col-12'>
                            <NavLink to={"/home/portfolio"} className="nav-link rounded" onClick={handlePortfolio}>
                                <span className='pe-4 '><RxDashboard className='fs-5' /></span>
                                Portfolio
                            </NavLink>
                        </li>
                       <li className='col-12'>
                            <NavLink to={"/home/dive-deep"} className="nav-link rounded" onClick={handleDiveDeep}>
                                <span className='pe-4'><BsBoxSeam className='fs-5' /></span>
                                Dive deep
                            </NavLink>
                       </li>
                        <li className='col-12'>
                            <NavLink to={"/home/analysis"} className="nav-link rounded" onClick={handleAnalysis}>
                                <span className='pe-4'><MdBarChart className='fs-5' /></span>
                                Analysis
                            </NavLink>
                        </li>
                        <li className='col-12'>
                            <NavLink to={"/home/matsuri-ai"} className="nav-link rounded" onClick={handleMatsuriAi}>
                                <span className='pe-4'><FaRobot className='fs-5' /></span>
                                Matsuri AI
                            </NavLink> 
                        </li>                                     
                    </ul>
                    <div className="logout-container pt-3">
                        <NavLink to="/" className="btn btn-danger w-100" onClick={handleLogout}>
                            <span className='pe-4'><RiLogoutBoxLine className='fs-5' /></span>
                            Logout
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar







