import { useNavigate } from "react-router-dom";
import React from 'react';
import images from '../hooks/images';
import { useState } from "react";
import TestDialog from './TestDialog';
import useMenuData from '../hooks/useMenuData';
import { APIURL, RecipeURL } from "../config";
// import Swal from "sweetalert2";

export default function RecipeSelection() {

    const navigate = useNavigate();   //遷移のやつだよ

    // カスタムダイアログ表示、非表示管理
    const [testDialogOpen, setTestDialogOpen] = useState(false);

    const [selectsData, setSelects] = useState(["", "", "", ""]);

    // ダイアログ表示ボタンクリック処理
    const buttonClickHome = () => {
        setTestDialogOpen(true);
    };

    {/*ヘッダーの名前変更*/ }
    const headerNames = [
        {
            id: 1,
            name: "主食",
            apipath: "/syusyoku"
        },
        {
            id: 2,
            name: "主菜",
            apipath: "/syusai"
        },
        {
            id: 3,
            name: "副菜",
            apipath: "/fukusai"
        },
        {
            id: 4,
            name: "汁物",
            apipath: "/sirumono"
        },
    ]

    const localkey = "header_state";

    const localstroage = window.localStorage;

    let now_state = localstroage.getItem(localkey)

    if (!now_state) {
        // header の状態がないとき
        localstroage.setItem(localkey, 0);
        now_state = 0;
    }

    // 選択状態のｓstatekey
    const select_state = "select_key";

    const [selectedCategory, setSelectedCategory] = useState(headerNames[now_state]); // 初期状態として主食を設定

    const handleClick = (index) => {
        console.log("押されたよ");
        // localstroage.setItem(localkey,(Number(now_state) + 1) % 4);
        localstroage.setItem(localkey, index);
        // setSelectedCategory(headerNames[2]);  // 画像が押された時にheaderNames[3]を選択
        window.location.reload();
    };

    const handleCard = (cardid,name) => {
        console.log(cardid);
        // Swal.fire({
        //     title: "レシピ追加",
        //     icon: "success", // アイコンの種類（success, error, warning, info, question）
        //     showConfirmButton: false,
        //     timer: 1000,               // 3秒後にアラートを自動で消す
        // });

        selectsData[now_state] = {
            id : String(cardid),
            name : name,
        };

        // localstorage に保存
        localstroage.setItem(select_state, JSON.stringify(selectsData));
    }

    const [initloading, setInitLoading] = useState(true);

    React.useEffect(() => {
        // すでに初期化されていたら処理を抜ける
        if (!initloading) {
            return;
        }

        // 現在の選択状態を取得
        const now_selected = localstroage.getItem(select_state);

        // 存在する時
        if (now_selected) {
            setSelects(JSON.parse(now_selected));
        }
        // 初期化済みのフラグを立てる
        setInitLoading(false);
    }, [initloading]);


    // メニューデータ取得
    //主食
    var { data, loading, error } = useMenuData(`${RecipeURL}/search_category`, headerNames[now_state].name);
    var menus = data ? data : [];
    console.log(menus);

    return (
        <div className="App">

            {/*ヘッダー*/}
            <header>
                <div className='backBtn' onClick={() => navigate('/')}>＜</div>
                <div id='pageTitle'>{selectedCategory.name}</div>
            </header>

            <main>

                {/*検索フォーム*/}
                <div className="Form">
                    <form>
                        <input className="FormDesign" type="text" search="search" placeholder="キーワード検索" />
                    </form>
                </div>

                {/*主食 主菜 副菜 汁物 遷移ボタン*/}
                <div className="wrapButton">
                    <button className="seniButton" onClick={() => handleClick(0)}>主食</button>
                    <button className="seniButton" onClick={() => handleClick(1)}>主菜</button>
                    <button className="seniButton" onClick={() => handleClick(2)}>副菜</button>
                    <button className="seniButton" onClick={() => handleClick(3)}>汁物</button>
                </div>

                {/*区切り線*/}
                <div className="line"></div>

                {/*説明文*/}
                <div className="explanation">
                    <p>レシピを選択してください</p>
                </div>


                {/*レシピ選択コンテナ*/}
                <div id="recipeChoiceContainer">
                    {
                        menus.map((menu, index) => {
                            return (
                                <div className="menuWrapper" key={index}>
                                    <div className="menu" onClick={() => handleCard(menu.id,menu.name)}>
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
                        test_content={selectsData}
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

            {/*レシピ選択中モーダル内フッター*/}
            <footer id='decisionFooter'>
                <button type='button' id='decisionBtn' onClick={() => navigate('/menuConfirmation')}>献立決定</button>
            </footer>

        </div>
    );

}
