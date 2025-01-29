import { useNavigate } from 'react-router-dom';
import "../loader.css";
import useMenuData from '../hooks/useMenuData';         // チャート用データ取得
import Marquee from "react-fast-marquee";               // 文字スライド用
import { APIURL } from '../config';

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
let menus = [
    {
        category: "主食",
    },
    {
        category: "主菜",
    },
    {
        category: "副菜",
    },
    {
        category: "汁物",
    }
]

function MenuConfirmation() {
    // 画面遷移用フック
    const navigate = useNavigate();

    // 選択中のレシピを取得
    const select_state = window.localStorage.getItem("select_key");

    // レシピID
    const recipe_ids = [];

    // json にする
    JSON.parse(select_state).forEach((value, index) => {
        if (value !== "") {
            menus[index] = {
                name: value["name"],
                category: value["type"],
                image: `${APIURL}/recipe/images/${value["id"]}.jpg`
            };

            recipe_ids.push(value["id"]);
        }
    })

    console.log(recipe_ids);

    function GenChart() {
        fetch(`${APIURL}chart/genchart`, {
            method: "POST", body: JSON.stringify({
                recipe_ids: recipe_ids
            }),
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    console.log(data);
                    window.localStorage.setItem("chart_key", JSON.stringify(data));
                    navigate('/cookProcess');
                })
            }
        });
    }

    // ページ名
    const title = "献立確認";

    return (
        <div className='App noScroll'>
            <div style={{ height: "100vh", width: "100vw", display: "none" }} className='loader_screen'>
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
                {/* <div id='cookingTime' >
                    調理時間目安 : {cookingTime} 分
                </div>
                <div id='cookingTime'><Marquee>
                    {`豆知識：${trivia[Math.round(Math.random()*trivia.length)]}`}
                </Marquee></div> */}
                
                <div id='menuListContainer'>
                    {
                        menus.map((menu, index) => {
                            console.log(menu.name);
                            return (
                                <div className='menuWrapper' key={index}>
                                    <div className='category'>{menu["category"]}</div>
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
                    document.querySelector('.loader_screen').style.display = "flex";
                    GenChart();
                    // setTimeout(() => {
                    //     navigate('/cookProcess')
                    // }, 3000)
                }
                }>手順書作成</button>
            </footer>
        </div>
    );
}

export default MenuConfirmation;