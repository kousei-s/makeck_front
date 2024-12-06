import { useNavigate } from "react-router-dom";
import React from 'react';
import images from '../hooks/images';

export default function RecipeSelection() {

  const navigate = useNavigate();   //遷移のやつだよ

  {/*ダミーデータ用*/}
  const menus = [
    {
      name : "イカのリゾット",
      image : images.squidRisotto
    },
    {
      name : "田舎風鶏の唐揚げ",
      image : images.FriedChicken
    },
    {
      name : "魚のフルーツ餡かけ",
      image : images.FishFruit
    },
    {
      name : "変わり肉じゃが",
      image : images.MeatPotatoes
    }
  ]

  
  

    return(
        <div className="App">

          {/*ヘッダー*/}
          <header>
            <div className='backBtn' onClick={() => navigate('/')}>＜</div>
            <div id='pageTitle'>主菜</div>          
          </header>

          <main>

          {/*検索フォーム*/}
          <div className="Form">
            <form>
                <input className="FormDesign" type="text" search = "search" placeholder="キーワード検索"/>
            </form>
          </div>

          {/*レシピ選択コンテナ*/}
          <div>
            
          </div>


          <div id="recipeChoiceContainer">
            {
              menus.map((menu,index)=>{
                return(
                  <div className="menuWrapper" key={index}>
                    <div className="menu">
                      <img className="menuImage" src={menu.image} alt="menuImage" />
                      <div className="menuName">{menu.name}</div>
                    </div>
                  </div>
                )
              })
            }

          </div>
            
         

          </main>
          
        </div>
    );
    
}
