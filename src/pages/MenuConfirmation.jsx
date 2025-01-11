import { useNavigate } from 'react-router-dom';
import "../loader.css";

// import images from '../hooks/images';


// 調理時間
const cookingTime = 90;

// 献立リスト
let menus = [
    {
        name : "田舎風トリのから揚げ",
        category : "主食",
        image : "https://makeck.mattuu.com/images/ce9c3514d8434f92b0675562466b0284.jpg"
    },
    {
        name : "ジャガイモのカリカリ",
        category : "主菜",
        image : "https://makeck.mattuu.com/images/0d8a47e782c1443295147446a33fa1d0.jpg"
    },
    {
        name : "きゅうりの四川風ピクルス",
        category : "副菜",
        image : "https://makeck.mattuu.com/images/16f14a5052b0469eb4e84b7bea0d71b3.jpg"
    },
    {
        name : "アスパラのクリームスープ",
        category : "汁物",
        image : "https://makeck.mattuu.com/images/523b0de0afda489a964af67918b6b185.jpg"
    }
]

function MenuConfirmation() {
    // 画面遷移用フック
    const navigate = useNavigate();

    // 選択中のレシピを取得
    const select_state = window.localStorage.getItem("select_key");

    // json にする
    JSON.parse(select_state).forEach((value, index) => {
        if (value !== "") {
            menus[index] = {
                name : value["name"],
                category : value["type"],
                image : `https://makeck.tail6cf7b.ts.net:8030/recipe/images/${value["id"]}.jpg`
            };
        }
    })

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
                <div id='cookingTime'>
                    調理時間目安 : {cookingTime} 分
                </div>
                <div id='menuListContainer'>
                    {
                        menus.map((menu, index) => {
                            console.log(menu.name);
                            return (
                                <div className='menuWrapper' key={index}>
                                    <div className='category'>{menu.category}</div>
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
                        setTimeout(() => {
                            navigate('/cookProcess')
                        }, 3000)
                    }
                }>手順書作成</button>
            </footer>
        </div>
    );
}

export default MenuConfirmation;