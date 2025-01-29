import { useNavigate } from "react-router-dom";
import React from 'react';
import images from '../hooks/images';
import { useState } from "react";
import useMenuData from "../hooks/useMenuData";


export default function MaterialList() {

    const navigate = useNavigate();   //遷移のやつだよ

    const [selected, setSelected] = useState(null);     //アコーディオンリスト用


    const toggle = (i) => {
        if (selected === i) {   //クリックされたアイテムがすでに選択されていたらselected(null)返す
            return setSelected(null)
        }
        setSelected(i)  //クリックされたアイテムを選択状態にする
    }


    // サンプルデータ
    // const datas = [
    //     {
    //         materialname: "フランクフルトのソテー",
    //         answer:
    //             [
    //                 "フランクフルト",
    //                 "ブロッコリー",
    //                 "ニンニク",
    //                 "赤唐辛子",
    //                 "オリーブ油(サラダ油)",
    //                 "塩、故障",
    //             ],
    //         number:
    //             [
    //                 "4",
    //                 "420",
    //                 "1",
    //                 "1",
    //                 "2",
    //                 "1"
    //             ],
    //         unit:
    //             [
    //                 "本",
    //                 "g",
    //                 "かけ",
    //                 "本",
    //                 "大匙",
    //                 "つまみ"
    //             ],

    //     },
    //     {
    //         materialname: "イカのリゾット",
    //         answer:
    //             [
    //                 "イカ",
    //                 "ご飯",
    //                 "タマネギ",
    //                 "白ワイン",
    //                 "オリーブオイル",
    //                 "塩",
    //                 "バター"
    //             ],
    //         number:
    //             [
    //                 "140",
    //                 "1",
    //                 "80",
    //                 "1/3",
    //                 "1",
    //                 "1",
    //                 "30"
    //             ],
    //         unit:
    //             [
    //                 "g",
    //                 "カップ",
    //                 "g",
    //                 "カップ",
    //                 "大匙",
    //                 "つまみ",
    //                 "g"

    //             ]
    //     },
    //     {
    //         materialname: "ココナッツミルクゼリー",
    //         answer:
    //             [
    //                 "ココナッツミルク",
    //                 "牛乳",
    //                 "砂糖",
    //                 "粉ゼラチン"
    //             ],

    //         number:
    //             [
    //                 "200",
    //                 "50",
    //                 "2",
    //                 "4"
    //             ],
    //         unit:
    //             [
    //                 "ml",
    //                 "ml",
    //                 "大匙",
    //                 "g"

    //             ]
    //     },
    //     {
    //         materialname: "わかめスープ",
    //         answer:
    //             [
    //                 "乾燥わかめ",
    //                 "だし汁",
    //                 "胡椒",
    //                 "ごま油",
    //                 "しょうゆ"
    //             ],
    //         number:
    //             [
    //                 "3",
    //                 "300",
    //                 "1",
    //                 "1",
    //                 "1"
    //             ],
    //         unit:
    //             [
    //                 "g",
    //                 "ml",
    //                 "つまみ",
    //                 "小匙",
    //                 "小匙"

    //             ]
    //     },
    // ]

    //材料JSON取得
    var { data, loading, error } = useMenuData(`https://makeck.mattuu.com/api/materials`)
    var material = data ? data : [];
    console.log(material);

    return (
        <div className="App">

            {/*ヘッダー*/}
            <header>
                <div className='backBtn' onClick={() => navigate('/menuConfirmation')}>＜</div>
                <div id='pageTitle'>材料一覧</div>
            </header>

            <main>
                <div id='cookingTime'>
                    調理時間目安 :  分
                </div>

                <div className="wrapper">
                    <div className="accordion">
                        {material.map((item, i) =>
                            <div className="item" key={i}>  {/*パフォーマンス向上のためらしい*/}
                                {/* {console.log("インデックス番号:", i, "要素:", item)} */}
                                <div className='title' onClick={() => toggle(i)}>

                                    {/*料理名*/}
                                    <div className="materialname">
                                        {item.name}
                                    </div>

                                    {/* 表示、非表示を切り替えるボタン */}
                                    <span>{selected === i ? <img src={images.closeButton} /> : <img src={images.openButton} />}</span>
                                </div>
                                <div
                                    className={
                                        selected === i ? "content show" : "content"
                                    }
                                >
                                    {/* {item.number.map((num,index) => (
                                <p key={index}>{num}</p>
                            ))} */}
                                    {item.materials.map((line, index) => (
                                        <div className="materialBr">
                                            <p className="pMaterial" key={index}>
                                                {/*{line}: 現在のインデックス番号を取得*/}
                                                {/* {console.log(line.name)} */}

                                                {/*材料名     数量                 単位  で表示*/}
                                                {line.name} {line.quantity || ""} {line.unit || ""}
                                                {/* {line} {item.number?.[index] || ""} {item.unit?.[index] || ""} */}
                                            </p> {/* 各行を段落として表示 */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                </div>




            </main>

            {/*フッター*/}
            <footer id='decisionFooter'>
                <button type='button' id='decisionBtn' onClick={() => navigate('/cookProcess')}>調理開始！</button>
            </footer>

        </div>

    );

}