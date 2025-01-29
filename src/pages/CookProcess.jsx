// 各種インポート
import { useNavigate } from 'react-router-dom';         // 画面遷移

import images from '../hooks/images';                   // 画像取得

import useMenuData from '../hooks/useMenuData';         // チャート用データ取得
import useCreateChart from '../hooks/useCreateChart';   // チャート用データ整形

function CookProcess() {
    const navigate = useNavigate();                     // 遷移用インスタンス

    // メニューデータ取得 (4品分献立、カテゴリー*3)
    // const { data, loading, error } = useMenuData("https://makeck.mattuu.com/api/chart");
    const { data, loading, error } = useMenuData("https://makeck.mattuu.com/api/chart2");
    const { data: syusyoku, loading: syusyokuLoading, error: syusyokuError } = useMenuData("https://makeck.mattuu.com/api/syusyoku");
    const { data: syusai, loading: syusaiLoading, error: syusaiError } = useMenuData("https://makeck.mattuu.com/api/syusai");
    const { data: sirumono, loading: sirumonoLoading, error: sirumonoError } = useMenuData("https://makeck.mattuu.com/api/sirumono");
    const menus = data ? data : "";
    // console.log(`menus : \n`, menus);

    var selectImage = JSON.parse(localStorage.getItem("select_image"));

    // チャート用データ整形
    const { chart, chartError } = useCreateChart(menus? menus : null);
    var chartData = chart? chart : null

    console.log(chartData)

    // エラーチェック用変数 (読み込み、エラー)
    var loadState = loading || syusyokuLoading || syusaiLoading || sirumonoLoading;
    var errorState = error || syusyokuError || syusaiError || sirumonoError || chartError;
    
    // 次のページ
    const nextPage = {
        title: "調理完了",
        path: "/",
    };

    // エラー発生時
    if (errorState) {
        return (
            <div className='App noScroll'>
                <header>
                    {/* 戻るボタン */}
                    <div className='backBtn' onClick={() => navigate('/MaterialList')}>＜</div>
                    <div id='pageTitle'>調理手順</div>
                </header>
                <main>
                <h1 id='message'>{error.message}</h1>
                </main>
            </div>
        )
    }

    // 読み込み時
    if (loadState) {
        return (
            <div className='App noScroll'>
                <header>
                    {/* 戻るボタン */}
                    <div className='backBtn' onClick={() => navigate('/MaterialList')}>＜</div>
                    <div id='pageTitle'>調理手順</div>
                </header>
            </div>
        )
    }

    // 正常時
    return (
        <div className='App noScroll'>
            <header>
                {/* 戻るボタン */}
                <div className='backBtn' onClick={() => navigate('/MaterialList')}>＜</div>
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
                        {
                            selectImage.map((element, index) => {
                                return (
                                    <div key={`menuImage-${index}`} className='imageWrapper'>
                                        <div id='speechBubble' className={`bubble-${index}`} style={{backgroundImage: `url(${images.speechBubble})`, display: "none"}}>
                                            <div id='bubbleText'>{chartData?.menu?.[index].name}</div>
                                        </div>
                                        <img src={ element } className='gridItem' alt="献立画像"
                                         onClick={() => {
                                            var bubble = document.getElementsByClassName(`bubble-${index}`);
                                            console.log(bubble);
                                            bubble[0].style.display="block";
                                            setTimeout(() => {
                                                bubble[0].style.display="none";
                                            }, 1000);
                                         }}
                                        ></img>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                
                {/* ガントチャートコンテナ */}
                <div id='startBar'>スタート！</div>
                <div id='chartContainer' className='grid'>
                    {chartData?.menu?.map((element, index) => {
                        let usedTaskIds = new Set();
                        console.log(`--- ${index+1}品目 ---`)

                        return(
                            // 1品分のチャート
                            <div key={element.uid} className='chartWrapper'
                             style={{gridTemplateRows: `repeat(${chartData?.totalTime}, 1fr)`,
                             height: "95%", width: "80%", margin: "auto", marginTop: "0"}}>

                                {/* スタートバーとの間隔確保 */}
                                <div key={`${element.uid}-start`} className='girdItem chartLine' style={{height: `3%`}}></div>

                                {/* 手順 */}
                                {element?.task?.map( t => {
                                    if (t != undefined) {
                                        // 手順カテゴリ名
                                        var category = "";
                                        // クラス指定用
                                        var c = "gridItem ";

                                        if (t.type == undefined) {
                                            c += "chartLine";
                                        }else{
                                            c += `task ${t.type}`;
                                        }

                                        if (usedTaskIds.has(t.taskId)) {
                                            return null; // すでに処理した `taskId` はスキップ
                                        }
                    
                                        usedTaskIds.add(t.taskId); // 処理済みとして登録

                                        // 各手順に遷移先設定
                                        if (t.taskName == "空き時間") {
                                            // 棒線
                                            return(
                                                <div key={t.taskId} className={c} style={{height : `${t.useTime / chartData.totalTime * 100}%`}}></div>
                                            )
                                        }else{
                                            
                                            // 手順(重複防止の判定)
                                            return(
                                                <div key={t.taskId} className={c} 
                                                style={{height : `${t.useTime / chartData.totalTime * 100}%`}}
                                                onClick={() => {
                                                    // 詳細画面用デモデータ
                                                    localStorage.setItem("displayName", t.taskName);
                                                    localStorage.setItem("recipieName", element.name);

                                                    navigate(`/stepsDetail/${t.taskId}`)}}
                                                >
                                                    {t.taskName}
                                                </div>
                                            )
                                        }
                                        
                                    }else{
                                        // エラー防止用にnullを返す
                                        return null
                                    }
                                })}

                            {/* フッターとの間隔確保 */}
                            <div key={`${element.uid}-end`} className='girdItem chartLine' style={{height: `50%`}}></div>
                            </div>
                        )
                    })}
                </div>
                <dialog id='cookFinDialog' onClick={() => {
                    navigate(nextPage.path);
                    localStorage.clear();
                }}>

                        <div id='dialogContainer'>
                        <div id='dialogLine'>
                            <div id='dialogTitle'>調理完了</div>
                            <div id='dialogText'>お疲れさまでした！</div>
                        </div>
                    </div>
                    <div id='closeText'>タップで閉じる</div>
                </dialog>
            </main>

        <footer id='decisionFooter'>
            <button type='button' id='decisionBtn' onClick={() => cookFinDialog.showModal()}>{nextPage.title}</button>
        </footer>
        </div>
    )
}

export default CookProcess;