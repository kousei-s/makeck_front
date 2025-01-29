import { useNavigate } from 'react-router-dom';
import "../loader.css";
import useMenuData from '../hooks/useMenuData';         // チャート用データ取得

// 豆知識(仮データ)
const trivia = [
    "オリーブオイルは高温調理より低温で",
    "魚は皮目から焼くと食感が良くなる",
    "にんにくを塩で潰すと扱いやすい",
    "卵白を泡立てるときは乾燥した器具を",
    "肉を焼く前に水気を拭き取る",
    "チョコは低温で溶かすと焦げにくい",
    "野菜は短時間加熱。栄養が保たれやすい。",
    "スープは野菜を炒めて深い味に。",
    "ソテーは食材が重ならないように。",
    "パスタの茹で汁は少量残すとソースが絡む。",
    "ハーブは最後に加えると風味が良い。",
    "魚介類は新鮮なものを選ぶ。",
    "揚げ物は油温を管理して焦げに注意。",
    "肉を焼くときは指で押して弾力を確認。",
    "デザートは材料を順に混ぜて均一に。",
    "ソテーにはバターが良い風味。",
    "スープは水分量で調整し、煮詰める。",
    "野菜の皮には栄養がたっぷり",
    "ケーキは焼きすぎに注意。竹串で確認。"
];

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
                <div id='cookingTime'>
                    {trivia[Math.round(Math.random()*19)]}
                </div>
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