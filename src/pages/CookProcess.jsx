import { useNavigate } from 'react-router-dom';

import useMenuData from '../hooks/useMenuData';
import useCreateChart from '../hooks/useCreateChart';
import images from '../hooks/images';
import { height } from '@mui/system';


function CookProcess() {
    const navigate = useNavigate();

    // メニューデータ取得
    const { data, loading, error } = useMenuData("https://makeck.mattuu.com/api/chart");
    const { syusyoku, syusyokuLoading, syusyokuError } = useMenuData("https://makeck.mattuu.com/api/syusyoku");
    const { syusai, syusaiLoading, syusaiError } = useMenuData("https://makeck.mattuu.com/api/syusai");
    const { fukusai, fuuksaiLoading, fukusaiError } = useMenuData("https://makeck.mattuu.com/api/fukusai");
    const { sirumono, sirumonoLoading, sirumonoError } = useMenuData("https://makeck.mattuu.com/api/sirumono");
    const menus = data ? data : "";
    // console.log(`menus : \n`, menus);

    // チャート生成
    const { chart, chartError } = useCreateChart(menus? menus : null); // すべてのチャートを一括生成
    var chartData = chart? chart : null

    // 次のページ
    const nextPage = {
        title: "調理完了",
        path: "/",
    };

    // 画像パス
    const menuImages = [
        "https://makeck.mattuu.com/images/ce9c3514d8434f92b0675562466b0284.jpg",
        "https://makeck.mattuu.com/images/0d8a47e782c1443295147446a33fa1d0.jpg",
        "https://makeck.mattuu.com/images/16f14a5052b0469eb4e84b7bea0d71b3.jpg",
        "https://makeck.mattuu.com/images/523b0de0afda489a964af67918b6b185.jpg",
    ];

    if (error || chartError) {
        return (
            <div className='App noScroll'>
                <header>
                    {/* 戻るボタン */}
                    <div className='backBtn' onClick={() => navigate('/menuConfirmation')}>＜</div>
                    <div id='pageTitle'>調理手順</div>
                </header>
                <main>
                <h1 id='message'>{error.message}</h1>
                </main>
            </div>
        )
    }

    if (loading) {
        return (
            <div className='App noScroll'>
                <header>
                    {/* 戻るボタン */}
                    <div className='backBtn' onClick={() => navigate('/menuConfirmation')}>＜</div>
                    <div id='pageTitle'>調理手順</div>
                </header>
            </div>
        )
    }

    return (
        <div className='App noScroll'>
            <header>
                {/* 戻るボタン */}
                <div className='backBtn' onClick={() => navigate('/menuConfirmation')}>＜</div>
                <div id='pageTitle'>調理手順</div>
            </header>

            <main>
                <div id='cookingTime'>
                    調理時間目安 : {chartData?.totalTime} 分
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
                <div id='startBar'>スタート！</div>
                <div id='chartContainer' className='grid'>
                    {chartData?.menu?.map((element, index) => {
                        return(
                            // 1品分のチャート
                            <div key={element.uid} className='chartWrapper'
                             style={{gridTemplateRows: `repeat(${chartData?.totalTime}, 1fr)`,
                             height: "95%", width: "80%", margin: "auto", marginTop: "0"}}>

                                {/* スタートバーとの間隔確保 */}
                                <div key={`${element.uid}-start`} className='girdItem chartLine' style={{height: `3%`}}></div>

                                {/* 手順 */}
                                {element?.task?.map(t => {
                                    if (t != undefined) {
                                        // クラス指定用
                                        var c = "gridItem ";
                                        switch (t.taskName) {
                                            case "下準備" : 
                                            c += "task preparation";
                                            break;
                                        
                                        case "調理" :
                                            c += "task cooking";
                                            break;

                                        case "仕上げ" :
                                            c += "task finishing";
                                            break;
                                    
                                        case "空き時間" :
                                            c += "chartLine";
                                            break;
                                        }

                                        // 各手順に遷移先設定
                                        if (t.taskName == "空き時間") {
                                            // 棒線
                                            return(
                                                <div key={t.taskId} className={c} style={{height : `${t.useTime / chartData.totalTime * 100}%`}}></div>
                                            )
                                        }else{
                                            // 手順
                                            return(
                                                <div key={t.taskId} className={c} 
                                                style={{height : `${t.useTime / chartData.totalTime * 100}%`}}
                                                onClick={() => navigate(`/stepsDetail/${t.taskId}`)}>
                                                    {t.taskName != "空き時間" ? t.taskName : null}
                                                </div>
                                            )
                                        }
                                        
                                    }else{
                                        // エラー防止用にnullを返す
                                        return null
                                    }
                                })}

                            {/* フッターとの間隔確保 */}
                            <div key={`${element.uid}-end`} className='girdItem chartLine' style={{height: `3%`}}></div>
                            </div>
                        )
                    })}
                </div>
            </main>

        <footer id='decisionFooter'>
            <button type='button' id='decisionBtn' onClick={() => navigate(nextPage.path)}>{nextPage.title}</button>
        </footer>
        </div>
    )
}

export default CookProcess;