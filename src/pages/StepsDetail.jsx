import { useNavigate } from 'react-router-dom';
import images from '../hooks/images';

function StepsDetail() {
    // 画面遷移用フック
    const navigate = useNavigate();
    
    // ページ名
    const title = "手順詳細";

    // 手順番号
    const stepNumber = 2;
    // 手順名
    const menuName = "フランクフルトのソテー";

    // 材料　テストデータ
    const materials = [
        {name : "下準備で刻んだニンニク", quantity  : null},
        {name : "赤唐辛子", quantity  : "1本"},
        {name : "オリーブ油（サラダ油）", quantity  : "大匙2"}
    ]

    // 調理手順　テストデータ
    const methodText = [
        "フライパンにオリーブ油大さじ2、ニンニク、赤唐辛子1本を入れ、中火にかけます。",
        "こんにちは私はこうらるいです。20歳です。すっかりおばさんになりましたね",
        "悲しいなぁ・・・😭",
        "ところで皆さん、松本流星群とはご存じですか？",
        "え？知らないって？",
        "なら私が松本流星群とは何か教えてあげましょう",
        "松本流星群とは夜空に「MATSUMOTO」と文字を描きながら流れていくという前代未聞のパフォーマンスを披露する流星群のことです",
        "ああああああああああああああああああああああああああああああああああああいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいううううううううううううううううううううううえええええええええええええええええええええええええええええええ"
    ]

    return (
        
        <div className='App'>
            <header>
                <div className='backBtn' onClick={() => navigate('/')}>＜</div>
                <div id='pageTitle'>{title}</div>
            </header>

            <main>
                {/* 調理手順番号、料理名 */}
                <div id='stepTitle'>
                    <div id='stepNumber'>調理{stepNumber}</div>
                    <div id='stepName'>{menuName}</div>
                </div>

                {/* 材料一覧 */}
                <div id='materialsContainer'>
                    <div className='caption'>
                        <div className='captionText'>使用する材料</div>
                        <div className='captionBorder'></div>
                    </div>
                    <div className='materialList'>
                        {materials.map((material, index) => {
                            return(
                                <div className='material' key={index}>
                                    <div className='materialName'>{material.name}</div>
                                    <div className='quantity'>{material.quantity }</div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* 調理方法 */}
                <div id='methodContainer'>
                    <div className='caption'>
                        <div className='captionText'>調理方法</div>
                        <div className='captionBorder'></div>
                    </div>
                    <div id='method'>
                        {methodText.map((text, index) => {
                            return(
                                <div className='paragraph' key={index}>{text}</div>
                            )
                        })}
                    </div>
                </div>
            </main>
        </div>


    );
}

export default StepsDetail;