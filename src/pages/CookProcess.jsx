import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import useMenuData from '../hooks/useMenuData';
import useCreateChart from '../hooks/useCreateChart';
import images from '../hooks/images';

function CookProcess() {
    const navigate = useNavigate();

   // メニューデータ取得
   const { data, loading, error } = useMenuData("https://makeck.mattuu.com/api/chart");
   const menus = data ? data : "";
   
    // チャート生成
    const { charts, chartError } = useCreateChart(data); // すべてのチャートを一括生成

    console.log("charts : ", charts);

    // 次のページ
    const nextPage = {
        title: "調理完了",
        path: "/",
    };

    // 画像パス
    const menuImages = [
        images.squidRisotto,
        images.frankfurtSaute,
        images.coconutMilkJelly,
        images.brownSeaweedSoup,
    ];

    if (error) {
    return (
        <div className='App noScroll'>
            <header>
                {/* 戻るボタン */}
                <div className='backBtn' onClick={() => navigate('/')}>＜</div>
                <div id='pageTitle'>調理手順</div>
            </header>
            <main>
            <h1>{error.message}</h1>
            </main>
        </div>
    )
    }

    if (loading) {
    return (
        <div className='App noScroll'>
            <header>
                {/* 戻るボタン */}
                <div className='backBtn' onClick={() => navigate('/')}>＜</div>
                <div id='pageTitle'>調理手順</div>
            </header>
            <main>
            <h1>nowLoading...</h1>
            </main>
        </div>
    )
    }

    return (
        <div className='App noScroll'>
            <header>
                {/* 戻るボタン */}
                <div className='backBtn' onClick={() => navigate('/')}>＜</div>
                <div id='pageTitle'>調理手順</div>
            </header>

            <main>
                <div id='cookingTime'>
                    調理時間目安 : {menus.totalTime} 分
                </div>
                
                <div id='processCategory'>
                    <div className='colorBox yellow'></div>
                    <div>下準備</div>
                    <div className='colorBox red'></div>
                    <div>調理</div>
                    <div className='colorBox green'></div>
                    <div>仕上げ</div>
                </div>
                
                {/* 献立画像コンテナ */}
                <div id='imagesBorder'>
                    <div id='imageContainer'className='grid'>
                        {/* 画像配列をmapで回して表示 */}
                        {menuImages.map((image, index) => {
                            return ( 
                                <div key={index} className='imageWrapper'>
                                    <img src={image} className='gridItem' alt="料理画像"></img>
                                </div>
                            )
                        })}
                    </div>
                </div>
                
                {/* ガントチャートコンテナ */}
                <div id='startLabel'></div>
                <div id='chartContainer' className='grid'>
                    {
                        menus.recipies.map((value, index) => {
                            // let {chart, chartError} = useCreateChart(data, index);
                            return(
                                <div key={value.Uid} id={value.Uid} className="chartWrapper"
                                style={{gridTemplateRows:`repeat(${menus.totalTime}, 1fr)`}}>{
                                    // chart
                                }</div>
                            )
                        })
                    }
                </div>
            </main>

        <footer id='decisionFooter'>
            <button type='button' id='decisionBtn' onClick={() => navigate(nextPage.path)}>{nextPage.title}</button>
        </footer>
        </div>
    )
}

export default CookProcess;