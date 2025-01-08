import { useNavigate } from "react-router-dom";
import React from 'react';
import images from '../hooks/images';
import { useState } from "react";

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
const data = [
    {
      materialname: "フランクフルトのソテー",
      answer: 
        [
            "フランクフルト",
            "ブロッコリー",
            "ニンニク",
            "赤唐辛子",
            "オリーブ油(サラダ油)",
            "塩、故障",

        ]
    
    },
    {
      materialname: "イカのリゾット",
      answer:
        [
            "Answer 2",
            "aaaa"
        ]
    },
    {
      materialname: "ココナッツミルクゼリー",
      answer:
        [
            "Answer 3",
            "aaaaa"
        ]
    },
    {
      materialname: "わかめスープ",
      answer:
        [
            "Answer 4",
            "aaa"
        ]
    },
  ]

    return(
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
                    {data.map((item, i) => 
                    <div className="item" key={i}>  {/*パフォーマンス向上のためらしい*/}
                    {console.log("インデックス番号:", i, "要素:", item)}
                        <div className='title' onClick={() => toggle(i)}>  

                        {/*料理名*/}
                        <div className="materialname">
                            {item.materialname}
                        </div>

                        {/* 表示、非表示を切り替えるボタン */}
                        <span>{selected === i ? "-" : "+"}</span>
                        </div>
                        <div 
                        className={
                            selected === i ? "content show" : "content"
                        }
                        >
                            {item.answer.map((line, index) => (
                                <p key={index}>{line}</p> // 各行を段落として表示
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