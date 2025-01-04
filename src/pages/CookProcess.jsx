import { useNavigate } from 'react-router-dom';

import useMenuData from '../hooks/useMenuData';
import useCreateChart from '../hooks/useCreateChart';
import images from '../hooks/images';
import { height } from '@mui/system';

function CookProcess() {
    const navigate = useNavigate();

    // メニューデータ取得
    const { data, loading, error } = useMenuData("https://makeck.mattuu.com/api/chart");
    const menus = data ? data : "";
    // console.log(`menus : \n`, menus);

    // 張りぼて作成用
    var haribote = {
        totaltime : 90,
        menu : [
            {
                Uid : "f1ac3c05-d055-4695-8083-ec2434dbafa1",
                Name : "田舎風トリのから揚げ",
                tasks : [
                    { time : 15 },
                    { time : 10, name : "下準備" },
                    { time : 15, name : "調理" },
                    { time : 15 },
                    { time : 20, name : "仕上げ" },
                    { time : 10 }
                ],
            },
            {
                Uid : "1837a368-f6df-4c2a-937d-5a2494782144",
                Name : "ジャガイモのカリカリ炒め",
                tasks : [
                    { time : 35 },
                    { time : 10, name : "下準備" },
                    { time : 30 },
                    { time : 10, name : "調理" }
                ]
            },
            {
                Uid : "6e30f2b1-e3bf-4b87-99fa-6f0293de01d2",
                Name : "キュウリの四川風ピクルス",
                tasks : [
                    { time : 15, name : "下準備" },
                    { time : 60, name : "調理" },
                    { time : 10 }
                ]
            },
            {
                Uid : "f36c60e5-1345-4bc1-9359-7daee17121d5",
                Name : "アスパラのクリームスープ",
                tasks : [
                    { time : 25 },
                    { time : 10, name : "下準備" },
                    { time : 15, name : "調理" },
                    { time : 10, name : "仕上げ" },
                    { time : 25 }
                ]
            }
        ]
    };

    haribote.menu.forEach(element => {
        // console.log(element.Name);
        element.tasks.forEach((task, index) => {
            // console.log(`手順${index} : ${task.name ? task.name : "なし"}\t|\t所要時間 : ${task.time}分`)
        });
    });

    // チャート生成
    const { chart, chartError } = useCreateChart(menus? menus : null); // すべてのチャートを一括生成
    var chartData = chart? chart : null
    console.log("chartData : ")
    console.log(chartData? chartData : null)

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
                                {element?.task?.map((t, tIndex) => {
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

                                        return(
                                            <div key={t.taskId} className={c} 
                                            style={{height : `${t.useTime / chartData.totalTime * 100}%`}}
                                            onClick={() => navigate('/stepsDetail')}>
                                                {t.taskName != "空き時間" ? t.taskName : null}
                                            </div>
                                        )
                                    }else{
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