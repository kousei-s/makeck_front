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
    console.log(`menus : \n`, menus);

    // 張りぼて作成用
    var haribote = {
        totaltime : 85,
        menu : [
            {
                Uid : "f1ac3c05-d055-4695-8083-ec2434dbafa1",
                Name : "田舎風トリのから揚げ",
                tasks : [
                    { time : 15, type : "line" },
                    { time : 10, type : "preparation", name : "下準備" },
                    // { time : 15, type : "task", name : "漬ける" },
                    { time : 15, type : "cooking", name : "調理" },
                    { time : 15, type : "line" },
                    // { time : 20, type : "task", name : "調理" },
                    { time : 20, type : "finishing", name : "仕上げ" },
                    { time : 10, type : "line" }
                ],
            },
            {
                Uid : "1837a368-f6df-4c2a-937d-5a2494782144",
                Name : "ジャガイモのカリカリ炒め",
                tasks : [
                    { time : 35, type : "line" },
                    { time : 10, type : "preparation", name : "下準備" },
                    { time : 30, type : "line" },
                    { time : 10, type : "cooking", name : "調理" }
                ]
            },
            {
                Uid : "6e30f2b1-e3bf-4b87-99fa-6f0293de01d2",
                Name : "キュウリの四川風ピクルス",
                tasks : [
                    { time : 15, type : "preparation", name : "下準備" },
                    // { time : 60, type : "task", name : "冷やす" },
                    { time : 60, type : "finishing", name : "仕上げ" },
                    { time : 10, type : "line" }
                ]
            },
            {
                Uid : "f36c60e5-1345-4bc1-9359-7daee17121d5",
                Name : "アスパラのクリームスープ",
                tasks : [
                    { time : 25, type : "line" },
                    { time : 10, type : "preparation", name : "下準備" },
                    // { time : 15, type : "task", name : "煮込む" },
                    { time : 15, type : "cooking", name : "調理" },
                    // { time : 10, type : "task", name : "調理" },
                    { time : 10, type : "finishing", name : "仕上げ" },
                    { time : 25, type : "line" }
                ]
            }
        ]
    };

    haribote.menu.forEach(element => {
        console.log(element.Name);
        element.tasks.forEach((task, index) => {
            console.log(`手順${index} : ${task.name ? task.name : "なし"}\t|\t所要時間 : ${task.time}分`)
        });
    });

    // チャート生成
    // const { charts, chartError } = useCreateChart(menus); // すべてのチャートを一括生成
    // console.log("charts : ", charts[0] ? charts : "まだ");

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

    if (error) {
    return (
        <div className='App noScroll'>
            <header>
                {/* 戻るボタン */}
                <div className='backBtn' onClick={() => navigate('/')}>＜</div>
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
                <div className='backBtn' onClick={() => navigate('/')}>＜</div>
                <div id='pageTitle'>調理手順</div>
            </header>
            <main>
            <h1 id='message'>nowLoading...</h1>
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
                    調理時間目安 : {menus.totaltime} 分
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
                    { haribote.menu.map((element, index) => {
                        return(
                            <div key={element.Uid} className='chartWrapper'
                            style={{gridTemplateRows: `repeat(${haribote.totaltime}, 1fr)`, height: "100%", width: "80%", margin: "auto"}}>
                                <div key={`${element.Uid}-start`} className='girdItem line' style={{height: `3%`}}></div>
                                { element.tasks.map((task, index) => {
                                    // クラス指定
                                    var c = "gridItem";
                                    
                                    switch (task.type) {
                                        case "line" :
                                            c += ` ${task.type}`;
                                            break;
                                        
                                        default:
                                            c += ` task ${task.type}`;
                                            break;
                                    }
                                    console.log(`${element.Name}-task${index}\n${c}`)
                                    return(
                                        <div key={`${element}-task${index}`} className={c} /* style={{gridRow: `span ${task.time}` }}*/ style={{height : `${task.time / haribote.totaltime * 100}%`}}>
                                            {task.name}
                                        </div>
                                    )
                                })}
                                <div key={`${element.Uid}-end`} className='girdItem line' style={{height: `3%`}}></div>
                            </div>
                        )
                    })}
                </div>
            </main>
            {/* { menus.recipies.map((value, index) => {
                            // let {chart, chartError} = useCreateChart(data, index);
                            return(
                                <div key={value.Uid} id={value.Uid} className="chartWrapper"
                                style={{gridTemplateRows:`repeat(${menus.totalTime}, 1fr)`}}>{
                                    // chart
                                }</div>
                            )
                    })} */}
                    {/* {chart.map((value, index) => {
                        return (
                            <div key={index} className='chartWrappter' style={{gridTemplateRows: `repeat(${testData.totaltime}, 1fr)`}}>
                                {value.map((value, index) => {
                                    // 色変更処理 (あとで実データに合わせて修正)
                                    var c = "gridItem";
                                    if (Math.trunc(Math.random()*10 % 2) === 0) {
                                        c += " line";
                                    }

                                    return <div key={index} className={c}></div>
                                })}
                            </div>
                        )
                    })} */}

        <footer id='decisionFooter'>
            <button type='button' id='decisionBtn' onClick={() => navigate(nextPage.path)}>{nextPage.title}</button>
        </footer>
        </div>
    )
}

export default CookProcess;