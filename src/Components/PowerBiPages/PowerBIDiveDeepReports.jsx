import React, { useContext, useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react'; 
import { models } from "powerbi-client";
import CommonContext from '../StateManagment/CommonContext';


const PowerBIDiveDeepReports = () => {

    const {diveDeepData,setSelectedTab} = useContext(CommonContext);
    useEffect(()=>{
        setSelectedTab("Dive Deep")
    },[])

    return (
        <PowerBIEmbed
            embedConfig={{
                type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
                id: diveDeepData.id,
                embedUrl: diveDeepData.embedUrl,
                accessToken: localStorage.getItem("diveDeepToken"),
                tokenType: models.TokenType.Embed, // Use models.TokenType.Aad for SaaS embed
                settings: {
                    panes: {
                        filters: {
                            expanded: false,
                            visible: false
                        }
                    },
                    background: models.BackgroundType.Transparent,
                }
            }}

            cssClassName={"reportClass"}

            getEmbeddedComponent={(embeddedReport) => {
                window.report = embeddedReport;
            }}
        />
    )
}

export default PowerBIDiveDeepReports
