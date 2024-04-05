import React, { useContext, useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react'; 
import { models } from "powerbi-client";
import CommonContext from '../StateManagment/CommonContext';


const PowerBIAnalysisReports = () => {

    const {analysisData,setSelectedTab} = useContext(CommonContext);
    useEffect(()=>{
        setSelectedTab("Analysis")
    },[])

    return (
        <PowerBIEmbed
            embedConfig={{
                type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
                id: analysisData.id,
                embedUrl: analysisData.embedUrl,
                accessToken: localStorage.getItem("analysisToken"),
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

export default PowerBIAnalysisReports
