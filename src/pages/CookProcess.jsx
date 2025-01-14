// 各種インポート
import { useNavigate } from 'react-router-dom';         // 画面遷移

import useMenuData from '../hooks/useMenuData';         // チャート用データ取得
import useCreateChart from '../hooks/useCreateChart';   // チャート用データ整形

function CookProcess() {
    const navigate = useNavigate();                     // 遷移用インスタンス

    // メニューデータ取得 (4品分献立、カテゴリー*3)
    const { data, loading, error } = useMenuData("https://makeck.mattuu.com/api/chart");
    const { data: syusyoku, loading: syusyokuLoading, error: syusyokuError } = useMenuData("https://makeck.mattuu.com/api/syusyoku");
    const { data: syusai, loading: syusaiLoading, error: syusaiError } = useMenuData("https://makeck.mattuu.com/api/syusai");
    const { data: sirumono, loading: sirumonoLoading, error: sirumonoError } = useMenuData("https://makeck.mattuu.com/api/sirumono");
    const menus = data ? data : "";
    console.log(`menus : \n`, menus);

    var selectImage = JSON.parse(localStorage.getItem("select_image"));
    console.log(selectImage);

    // カテゴリ別データ
    // var categorys = [syusyoku, syusai, sirumono];
    
    // チャート用データ整形
    const { chart, chartError } = useCreateChart(menus? menus : null);
    var chartData = chart? chart : null

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
                    <div className='backBtn' onClick={() => navigate('/menuConfirmation')}>＜</div>
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
                    <div className='backBtn' onClick={() => navigate('/menuConfirmation')}>＜</div>
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
                        {/* {   // 1品ずつ画像表示
                            chartData?.menu?.map((element, index) => {
                                // 画像パス
                                var targetPath = null;

                                // 検索対象
                                var targetName = element.name.normalize("NFC");
                                console.log("検索対象: "+ targetName);

                                // メニュー名から検索
                                // カテゴリー毎
                                for (const category of categorys) {
                                    // カテゴリー内から1品ずつ比較
                                    for (const item of category) {
                                        console.log(`比較中: targetName="${targetName}", item.name="${item.name}"`);
                                        
                                        // 一致したら終了
                                        if (targetName == item.name.normalize("NFC")) {
                                            console.log("発見: " + item.name);
                                            targetPath = item.image;
                                            break;
                                        }
                                    }
                                    if (targetPath) break;
                                }

                                // 見つからなかった場合 (デバッグ用)
                                if (!targetPath) {
                                    console.log(`未発見: ${targetName}`);
                                }

                                // 画像表示処理
                                return ( 
                                    <div key={`menuImage-${index}`} className='imageWrapper'>
                                        <img src={targetPath} className='gridItem' alt="献立画像" onClick={""}></img>
                                    </div>
                                )
                            }
                        )} */}
                        {
                            selectImage.map((element, index) => {
                                console.log(element);
                                return (
                                    <div key={`menuImage-${index}`} className='imageWrapper'>
                                        <img src={element} className='gridItem' alt="献立画像" onClick={""}></img>
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
                                    
                                        default :
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
                                                onClick={() => navigate(`/stepsDetail/${t.taskId}`)}
                                                // onClick={() => { navigate(`/stepsDetail/${t.taskName}`)}}
                                                >
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
                            <div key={`${element.uid}-end`} className='girdItem chartLine' style={{height: `10%`}}></div>
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
            {/* <button type='button' id='decisionBtn' onClick={() => navigate(nextPage.path)}>{nextPage.title}</button> */}
        </footer>
        </div>
    )
}

export default CookProcess;