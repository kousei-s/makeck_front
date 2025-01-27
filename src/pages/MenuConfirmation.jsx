import { useNavigate } from 'react-router-dom';
import "../loader.css";
import useMenuData from '../hooks/useMenuData';         // チャート用データ取得
import { APIURL } from '../config';

// import images from '../hooks/images';


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
                image: `https://makeck.tail6cf7b.ts.net/recipe/images/${value["id"]}.jpg`
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
                <div id='cookingTime' >
                    調理時間目安 : {cookingTime} 分
                </div>
                <div id='menuListContainer'>
                    {
                        menus.map((menu, index) => {
                            console.log(menu.name);
                            return (
                                <div className='menuWrapper' key={index}>
                                    {/* <div className='category'>{category[index]}</div> */}
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