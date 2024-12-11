import { useNavigate } from 'react-router-dom';

import images from '../hooks/images';

// 調理時間
const cookingTime = 90;

// 献立リスト
const menus = [
    {
        name : "イカのリゾット",
        category : "主食",
        image : images.squidRisotto
    },
    {
        name : "フランクフルトのソテー",
        category : "主菜",
        image : images.frankfurtSaute
    },
    {
        name : "ココナッツミルクゼリー",
        category : "副菜",
        image : images.coconutMilkJelly
    },
    {
        name : "わかめスープ",
        category : "汁物",
        image : images.brownSeaweedSoup
    }
]

function MenuConfirmation() {
    // 画面遷移用フック
    const navigate = useNavigate();

    // ページ名
    const title = "献立確認";

    return (
        <div className='App noScroll'>
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
                <button type='button' id='decisionBtn' onClick={() => navigate('/cookProcess')}>手順書作成</button>
            </footer>
        </div>
    );
}

export default MenuConfirmation;