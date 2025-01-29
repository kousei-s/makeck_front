import { useNavigate } from 'react-router-dom';
import "../loader.css";
import useMenuData from '../hooks/useMenuData';         // チャート用データ取得
import Marquee from "react-fast-marquee";               // 文字スライド用

// 豆知識(仮データ)
const trivia = [
    "オリーブオイルは高温で加熱すると香りが失われるので、低温で調理するのがおすすめです。",
    "魚を焼くときに皮目から焼くと、食感が良く仕上がります。",
    "にんにくをみじん切りにするときは、刻む前に塩を加えて潰すと扱いやすくなります。",
    "お米を研ぐときは、水を使いすぎず、やさしく洗うのがコツです。",
    "卵白を泡立てるときには、ボウルや泡立て器が完全に乾燥していることが重要です。",
    "フライパンで肉を焼くときは、肉の水分が飛び出さないように、焼く前に余分な水気をペーパータオルで拭き取ると良いです。",
    "チョコレートを溶かすときは、低温でゆっくりと溶かすと焦げにくくなります。",
    "野菜の栄養素は加熱すると一部失われますが、蒸すよりも短時間で加熱すると栄養が保たれやすいです。",
    "スープやシチューを作るときは、最初に野菜を炒めることで深い味が引き出されます。",
    "ソテーするときは、食材が重ならないようにすると均等に火が通ります。",
    "パスタの茹で汁は、少量残しておくとソースとの絡みが良くなります。",
    "ハーブは加熱しすぎると風味が失われるので、できるだけ最後に加えるのがおすすめです。",
    "魚介類を調理するときは、鮮度が命です。新鮮なものを選ぶとおいしさが格段に違います。",
    "パン粉を使った揚げ物は、油の温度管理がポイントです。高すぎると焦げやすいので注意が必要です。",
    "フライパンで肉を焼くときには、肉に指で軽く押してみて、弾力がある程度戻るまで焼くとジューシーに仕上がります。",
    "デザートを作るときには、材料を粉類から液体へ順に加えると均一に混ざります。",
    "ソテーするときは、オリーブオイルよりもバターを使うと風味が豊かになります。",
    "スープを作るときには、食材の水分量によって調整しながら、煮詰めていくと深い味わいになります。",
    "野菜の皮には栄養が豊富に含まれていますので、できるだけ皮をむかずに調理すると良いです。",
    "ケーキを焼くときは、焼きすぎに注意して、中心部に竹串を刺してみて生地がついてこない状態が理想です。",
    "魚を調理するときには、塩をふってからしばらく置くと、食材のうまみが引き出されます。"
]


// 調理時間
const cookingTime = 85;

// 献立リスト
const category = [
    "主食", "主菜", "副菜", "汁物"
]

function MenuConfirmation() {
    // 画面遷移用フック
    const navigate = useNavigate();

    const { data: syusyoku, loading: syusyokuLoading, error: syusyokuError } = useMenuData("https://makeck.mattuu.com/api/syusyoku");
    const { data: syusai, loading: syusaiLoading, error: syusaiError } = useMenuData("https://makeck.mattuu.com/api/syusai");
    const { data: sirumono, loading: sirumonoLoading, error: sirumonoError } = useMenuData("https://makeck.mattuu.com/api/sirumono");
    var categorys = [syusyoku, syusai, sirumono];

    // 選択料理ID
    const selectId = JSON.parse(localStorage.getItem("select_key"));
    console.log(selectId);

    // 料理データ
    var selectMenus = []
    var selectImages = [];

    selectId?.forEach((element) => {
        console.log(`id: ${element} を検索`);

        categorys?.forEach((category) => {
            category?.forEach((item) => {
                // 一致したら終了
                if (element == item.id.normalize("NFC")) {
                    console.log("発見: " + item.name);
                    selectImages.push(item.image);
                    selectMenus.push(item);
                    console.log(item);
                    return true;
                }
            });
        });
    });

    console.log(selectMenus);
    localStorage.setItem("select_image", JSON.stringify(selectImages));
    
    // ページ名
    const title = "献立確認";

    return (
        <div className='App noScroll'>
            <div style={{height: "100vh", width: "100vw", display: "none"}} className='loader_screen'>
                <div>
                    <h2 className='loader_text'>作成中</h2>
                    <span className="loader"></span>
                </div>
            </div>
            <header>
                <div className='backBtn' onClick={() => navigate('/RecipeSelection')}>＜</div>
                <div id='pageTitle'>{title}</div>
            </header>

            <main>
                {/* <div id='cookingTime'>
                    調理時間目安 : {cookingTime} 分
                </div> */}
                <div id='cookingTime'><Marquee>
                    {`　　豆知識：${trivia[Math.round(Math.random()*trivia.length)]}`}
                </Marquee></div>
                
                <div id='menuListContainer'>
                    {
                        selectMenus.map((menu, index) => {
                            console.log(menu.name);
                            return (
                                <div className='menuWrapper' key={index}>
                                    <div className='category'>{category[index]}</div>
                                    <div className='border'></div>
                                    <div className='menu'>
                                        <img className='menuImage' src={menu.image}></img>
                                        <div className='menuName'>{menu.name}</div>
                                    </div>
                                    
                                </div>
                            )
                        })
                        
                    }
                    <div id='naviText'>こちらの献立で手順書を作成します</div>
                </div>
            </main>

            <footer id='decisionFooter'>
                <button type='button' id='decisionBtn' onClick={() => {
                        // loadscreen 出す
                        document.querySelector('.loader_screen').style.display = "flex"
                        // setTimeout(() => {
                        //     navigate('/MaterialList')
                        // }, 3000)
                    }
                }>手順書作成</button>
            </footer>
        </div>
    );
}

export default MenuConfirmation;