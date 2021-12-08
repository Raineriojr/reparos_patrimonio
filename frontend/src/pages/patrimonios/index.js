import React from "react";
import Header from '../home';

export default function Services(){
    function RenderContent(){
        return(
            <div>Patrimônios</div>
        )
    }

    return(
        <>
            <Header content={RenderContent}/>
        </>
    )
}