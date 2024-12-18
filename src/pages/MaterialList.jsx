import { useNavigate } from "react-router-dom";
import React from 'react';
import images from '../hooks/images';
import { useState } from "react";

export default function MaterialList() {

    const navigate = useNavigate();   //遷移のやつだよ

    return(
        <div className="App">
            <header>
                <div className='backBtn' onClick={() => navigate('/menuConfirmation')}>＜</div>
                <div id='pageTitle'>材料一覧</div>
            </header>


            <footer id='decisionFooter'>
                <button type='button' id='decisionBtn' onClick={() => navigate('/cookProcess')}>調理開始！</button>
            </footer>
        </div>    
    );

}