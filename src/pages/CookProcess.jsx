import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import images from '../hooks/images';

function CookProcess() {
    // 画面遷移用フック
    const navigate = useNavigate();

    // 調理時間
    const cookingTime = 90;

    // 次のページ
    const nextPage = {
        title : "調理完了",
        path : "/"
    }

    // 画像パス
    const menuImages = [
        images.squidRisotto,
        images.frankfurtSaute,
        images.coconutMilkJelly,
        images.brownSeaweedSoup
    ]

    var totalTime;
    var tasks;

    const data = axios.get("https://makeck.mattuu.com/api/chart")
      .then(res => {
        console.log("totalTime : ", JSON.stringify(res.data.totaltime));
        console.log("tasks : ", JSON.stringify(res.data.tasks[0]));
        totalTime = JSON.stringify(res.data.totaltime);
        tasks = JSON.stringify(res.data.tasks);
      })
      .catch(error => {
        console.error(error);
      });

    // ガントチャート用テーブル作成用配列
    var n = 0;
    // const chart = Array.from({length : 4}, () => 
    //     Array.from({length : 20}, () => n++));    
    return (
        <div className='App noScroll'>
            <header>
                {/* 戻るボタン */}
                <div className='backBtn' onClick={() => navigate('/')}>＜</div>
                <div id='pageTitle'>調理手順</div>
            </header>

            <main>
                <div id='cookingTime'>
                    調理時間目安 : {cookingTime} 分
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
                    {/* チャート生成 */}
                    {/* {chart.map((value, index) => {
                        return (
                            <div key={index} className='chartWrappter' style={{gridTemplateRows: `repeat(${testData.totaltime}, 1fr)`}}>
                                {value.map((value, index) => {
                                    // 色変更処理 (あとで実データに合わせて修正)
                                    var c = "gridItem";
                                    if (Math.trunc(Math.random()*10 % 2) === 0) {
                                        c += " changeColor";
                                    }

                                    return <div key={index} className={c}></div>
                                })}
                            </div>
                        )
                    })} */}
                    
                </div>
            </main>

            <footer id='decisionFooter'>
                <button type='button' id='decisionBtn' onClick={() => navigate(nextPage.path)}>{nextPage.title}</button>
            </footer>3
        </div>
    )
}

export default CookProcess;
