import { createContext, useRef, useState } from "react";
import { sha256 } from "js-sha256";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CommonContext = createContext();

export const DataProvider = ({ children }) => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputDetails, setInputDetails] = useState({
    username: "",
    password: "",
  });

  const [selectedTab, setSelectedTab] = useState("Portfolio");

  const [groups, setGroups] = useState([])
  const [groupData1, setGroupData1] = useState({});
  const [groupData2, setGroupData2] = useState({});

  const [report1, setReport1] = useState([])
  const [report2, setReport2] = useState([])

  const [portFolioReportToken, setPortFolioReportToken] = useState("");
  const [diveDeepReportToken, setDiveDeepReportToken] = useState("");
  const [analysisReportToken, setAnalysisReportToken] = useState("");

  const [portfolioData,setPortfolioData]=useState({
          report_id:"f539cc14-d88e-44da-b5ee-c249956c5c77",
          group_id:'ccbd87b7-8bd4-4e34-ba8d-de02251a4624',
          embedUrl:"https://app.powerbi.com/reportEmbed?reportId=f539cc14-d88e-44da-b5ee-c249956c5c77&groupId=ccbd87b7-8bd4-4e34-ba8d-de02251a4624&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtVVMtRS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZSwiZGlzYWJsZUFuZ3VsYXJKU0Jvb3RzdHJhcFJlcG9ydEVtYmVkIjp0cnVlfX0%3d"
  })

  const [diveDeepData,setdiveDeepData]=useState({
      report_id:'4ceeb38d-80ac-4c33-92c9-825d441e58d7',
      group_id:'ccbd87b7-8bd4-4e34-ba8d-de02251a4624',
      embedUrl:"https://app.powerbi.com/reportEmbed?reportId=4ceeb38d-80ac-4c33-92c9-825d441e58d7&groupId=ccbd87b7-8bd4-4e34-ba8d-de02251a4624&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtVVMtRS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZSwiZGlzYWJsZUFuZ3VsYXJKU0Jvb3RzdHJhcFJlcG9ydEVtYmVkIjp0cnVlfX0%3d"
  })

  const [analysisData,setAnalysisData]=useState({
      report_id:"1c0ae235-7c89-4297-9ba6-f93e9883a9e0",
      group_id:'e1b7db3e-7c59-445f-8509-6b00737d9781',
      embedUrl:"https://app.powerbi.com/reportEmbed?reportId=1c0ae235-7c89-4297-9ba6-f93e9883a9e0&groupId=e1b7db3e-7c59-445f-8509-6b00737d9781&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtVVMtRS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZSwiZGlzYWJsZUFuZ3VsYXJKU0Jvb3RzdHJhcFJlcG9ydEVtYmVkIjp0cnVlfX0%3d"
  })

  const getTokenAPI = async() => {
      

      try {
          await axios({
              method: 'post',
              url: 'https://matsuri.adraproductstudio.com/login',
              auth: {
                  username: inputDetails.username,
                  password: sha256(inputDetails.password)
              }
          })
              .then((response) => {
                  if (response.data.error_code === 200) {
                      localStorage.setItem("initialToken", response.data.data.access_token);
                      getGroupDetails(response.data.data.access_token)
                      navigate("/home/portfolio")
                      setLoading(false)
                      

                      localStorage.setItem('heading',"Portfolio")
                  }
                  else if(response.data.error_code === 500){
                      toast.error(response.data.message)
                  }
                  else if(response.data.error_code === 401){
                      toast.error(response.data.message)
                      setLoading(false)
                      setInputDetails({
                          username: "",
                          password: ""
                      })
                      inputRef.current.focus()
                  }
              })
              .catch((err)=>{
                  console.log(err)
              })
      } catch (err) {
          console.log(err.message)
      }
  }

  const getGroupDetails = async (token) => {
      try {
          await axios.get("https://api.powerbi.com/v1.0/myorg/groups", {
              headers: {
                  authorization: `Bearer ${token}`,
              },
          }).then((response) => {

              if (response.status === 200) {
                  // console.log(response)
                  setGroups(response.data.value);
                  setGroupData1(response.data.value[0])
                  setGroupData2(response.data.value[1])

                  getGroup1Report(response.data.value[0].id);
                  getGroup2Report(response.data.value[1].id);
              }

          }).catch((err) => {
              console.log(err)
          })
      }
      catch (err) {
          console.log(err)
      }
  }

  const getGroup1Report = async (group1_id) => {
      try {
          await axios.get(`https://api.powerbi.com/v1.0/myorg/groups/${group1_id}/reports`, {
              headers: {
                  authorization: `Bearer ${localStorage.getItem('initialToken')}`
              }
          }).then((response) => {
              if (response.status === 200) {
                  setReport1(response.data.value);


                  getPortFolioToken(group1_id, response.data.value[1].id)
                  setPortfolioData({...portfolioData,id:response.data.value[1].id,embedUrl:response.data.value[1].embedUrl})


                  getDiveDeepToken(group1_id, response.data.value[0].id)
                  setdiveDeepData({...diveDeepData,id:response.data.value[0].id,embedUrl:response.data.value[0].embedUrl})
              }
          }).catch((err) => {
              console.log(err)
          })
      } catch (err) {
          console.log(err)
      }
  }
  const getGroup2Report = async (group2_id) => {
      try {
          await axios.get(`https://api.powerbi.com/v1.0/myorg/groups/${group2_id}/reports`, {
              headers: {
                  authorization: `Bearer ${localStorage.getItem('initialToken')}`
              }
          }).then((response) => {
              if (response.status === 200) {
                  setReport2(response.data.value)

                  setAnalysisData({...analysisData,id:response.data.value[0].id,embedUrl:response.data.value[0].embedUrl})
                  getAnalysisToken(group2_id, response.data.value[0].id)
              }
          }).catch((err) => {
              console.log(err)
          })
      } catch (err) {
          console.log(err)
      }
  }

  const getPortFolioToken = async (groupId, reportId) => {
      try {
          await axios.post(`https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/GenerateToken`, {}, {
              headers: {
                  authorization: `Bearer ${localStorage.getItem('initialToken')}`
              }
          }).then((response) => {
              if (response.status === 200) {
                  setPortFolioReportToken(response.data.token)
                  localStorage.setItem("portfolioToken",response.data.token)
              }
          }).catch((err) => {
              console.log(err)
          })
      } catch (err) {
          console.log(err)
      }
  }

  const getDiveDeepToken = async (groupId, reportId) => {
      try {
          await axios.post(`https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/GenerateToken`, {}, {
              headers: {
                  authorization: `Bearer ${localStorage.getItem('initialToken')}`
              }
          }).then((response) => {
              if (response.status === 200) {
                  setDiveDeepReportToken(response.data.token)
                  localStorage.setItem("diveDeepToken",response.data.token)
              }
          }).catch((err) => {
              console.log(err)
          })
      } catch (err) {
          console.log(err)
      }
  }

  const getAnalysisToken = async (groupId, reportId) => {
      try {
          await axios.post(`https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/GenerateToken`, {}, {
              headers: {
                  authorization: `Bearer ${localStorage.getItem('initialToken')}`
              }
          }).then((response) => {
              if (response.status === 200) {
                  setAnalysisReportToken(response.data.token)
                  localStorage.setItem("analysisToken",response.data.token)                 
              }
          }).catch((err) => {
              console.log(err)
          })
      } catch (err) {
          console.log(err)
      }
  }

  
  return (
    <CommonContext.Provider
      value={{
        inputDetails,
        setInputDetails,
        inputRef,
        getTokenAPI,
        portfolioData,
        getPortFolioToken,
        diveDeepData,
        getDiveDeepToken,
        analysisData,
        getAnalysisToken,
        loading,
        setLoading,
        portfolioData,
        setPortfolioData,
        diveDeepData,
        setdiveDeepData,
        analysisData,
        setAnalysisData,
        selectedTab,
        setSelectedTab,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export default CommonContext;
