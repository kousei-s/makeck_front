import { useNavigate } from "react-router-dom";
import React from 'react';
import images from '../hooks/images';
import { useState } from "react";
import TestDialog from './TestDialog';

export default function RecipeSelection() {

  const navigate = useNavigate();   //遷移のやつだよ
  
  // カスタムダイアログ表示、非表示管理
  const [testDialogOpen, setTestDialogOpen] = useState(false);

  // ダイアログ表示ボタンクリック処理
  const buttonClickHome = () => {
    setTestDialogOpen(true);
  };

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
      image : images.fishFruitAnkake
    },
    {
      name : "変わり肉じゃが",
      image : images.MeatPotatoes
    },
    {
      name : "フランクフルトのソテー",
      image : images.frankfurtSaute
    },
    {
      name : "わかめスープ",
      image : images.brownSeaweedSoup 
    },
    {
      name : "茄子のおひたしあああああああああああああ",
      image : images.nasuohotasi 
    },
    {
      name : "わかめスープ",
      image : images.brownSeaweedSoup 
    },
    {
      name : "わかめスープ",
      image : images.brownSeaweedSoup 
    },
    {
      name : "わかめスープ",
      image : images.brownSeaweedSoup 
    },
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

          {/*レシピ選択中モーダル*/}
          <div>
            {/* カスタムダイアログ */}
          <TestDialog
            isOpen={testDialogOpen}
            onConfirm={() => {
              setTestDialogOpen(false);
              console.log("okが押されました");
            }}
            onCancel={() => {
              setTestDialogOpen(false);
              console.log("キャンセルが押されました");
            }}
          />

          <button className="DialogButton" onClick={buttonClickHome} >
            <img src={images.selectMenu} alt="ボタン画像" />
          </button>

          </div>
          </main>

          {/* {<div className="modal_bottom">
            <p className="modal_name">選択中レシピ</p>
            <div className="upButton">
              <img src={images.selectingRecipeButton} alt="上向き三角ボタン" />
            </div>} */}
          
            {/*レシピ選択中モーダル内画像コンテナ*/}
            {/*くそコード😭*/}
            {/* {{<div className="noSelectContainer">
              <div className="noSelectWrapper">
                <img src={images.selectStapleFood} alt="選択されていない主食" />
              </div>  
              <div className="noSelectWrapper">
                <img src={images.selectMainDish} alt="選択されていない主菜" />
              </div>  
              <div className="noSelectWrapper">
                <img src={images.selectSideDish} alt="選択されていない副菜" />
              </div>
              <div className="noSelectWrapper"> 
                <img src={images.selectSoup} alt="選択されていない汁物" />
              </div>
            </div>

          </div>}} */}

        {/*レシピ選択中モーダル内フッター*/}
        <footer id='decisionFooter'>
            <button type='button' id='decisionBtn' onClick={() => navigate('/menuConfirmation')}>献立決定</button>    
        </footer>
          
        </div>
    );
    
}
