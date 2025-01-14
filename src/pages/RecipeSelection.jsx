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

    const [now_menus, setMenus] = useState([]);

    // ダイアログ表示ボタンクリック処理
    const buttonClickHome = () => {
        setTestDialogOpen(true);
    };

    //選択中
    const selectRecipeIdChanger = (cardid, name) => {
        console.log(cardid);

        // 選択中の状態を設定
        const updatedSelectsData = [...selectsData];
        updatedSelectsData[now_state] = {
            id: String(cardid),
            name: name,
            type: headerNames[now_state].name
        };
        setSelects(updatedSelectsData);

        // localstorage に保存
        localstroage.setItem(select_state, JSON.stringify(updatedSelectsData));
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

    async function submitSearch(event) {
        event.preventDefault();

        const req = await fetch(`${RecipeURL}search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: event.target.search.value,
                category: headerNames[now_state].name
            }),
        });

        const res = await req.json();
        const data = res.result;

        const menus = data ? data : [];
        console.log(`menus : \n`, menus);
        setMenus(menus);

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

        // メニューデータ取得
        //主食
        fetch(`${RecipeURL}/search_category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: headerNames[now_state].name
            }),
        }).then(res => res.json()).then(
            (result) => {
                setMenus(result.result);
            },
            (error) => {
                console.log('error', error);
            }
        );


        // 初期化済みのフラグを立てる
        setInitLoading(false);
    }, [initloading]);

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
                    <form onSubmit={submitSearch}>
                        <input className="FormDesign" type="text" search="search" name="search" placeholder="キーワード検索" />
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
                        now_menus.map((menu, index) => {
                            const isSelected = selectsData[now_state]["id"] === String(menu.id); // 選択状態を判定
                            return (
                                <div
                                    className={`menuWrapperR ${isSelected ? 'selected' : ''}`}
                                    key={index}
                                    onClick={() => selectRecipeIdChanger(menu.id, menu.name)}
                                >
                                    <div className="menuR" onClick={() => selectRecipeIdChanger(menu.id, menu.name)}>
                                        <div className="imageWrapper">
                                            <img className="menuImage" src={menu.image} alt="menuImage" />
                                            {/*選択中囲みなう*/}
                                            {isSelected && <div className="overlay">選択中</div>}
                                        </div>
                                        <div className="menuName">{menu.name}</div>
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>

                {/* <img className="selectNow" src={images.selectNow} alt="選択中囲み" /> */}



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

