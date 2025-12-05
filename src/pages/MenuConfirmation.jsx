import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../loader.css";
import useMenuData from "../hooks/useMenuData"; // チャート用データ取得
import _Marquee from "react-fast-marquee"; // 文字スライド用
import images from "../hooks/images";

// 豆知識(仮データ)
const _trivia = [
  "オリーブオイルは高温で加熱すると香りが失われるので、低温で調理するのがおすすめです。",
  "魚を焼くときに皮目から焼くと、食感が良く仕上がります。",
  "にんにくをみじん切りにするときは、刻む前に塩を加えて潰すと扱いやすくなります。",
  "お米を研ぐときは、水を使いすぎず、やさしく洗うのがコツです。",
  "卵白を泡立てるときには、ボウルや泡立て器が完全に乾燥していることが重要です。",
  "フライパンで肉を焼くときは、肉の水分が飛び出さないように、焼く前に余分な水気をペーパータオルで拭き取ると良いです。",
  "チョコレートを溶かすときは、低温でゆっくりと溶かすと焦げにくくなります。",
  "野菜の栄養素は加熱すると一部失われますが、蒸すよりも短時間で加熱すると栄養が保たれやすいです。",
  "スープやシチューを作るときは、最初に野菜を炒めることで深い味が引き出されます。",
  "ソテーするときは、食材が重ならないようにすると均等に火が通ります。",
  "パスタの茹で汁は、少量残しておくとソースとの絡みが良くなります。",
  "ハーブは加熱しすぎると風味が失われるので、できるだけ最後に加えるのがおすすめです。",
  "魚介類を調理するときは、鮮度が命です。新鮮なものを選ぶとおいしさが格段に違います。",
  "パン粉を使った揚げ物は、油の温度管理がポイントです。高すぎると焦げやすいので注意が必要です。",
  "フライパンで肉を焼くときには、肉に指で軽く押してみて、弾力がある程度戻るまで焼くとジューシーに仕上がります。",
  "デザートを作るときには、材料を粉類から液体へ順に加えると均一に混ざります。",
  "ソテーするときは、オリーブオイルよりもバターを使うと風味が豊かになります。",
  "スープを作るときには、食材の水分量によって調整しながら、煮詰めていくと深い味わいになります。",
  "野菜の皮には栄養が豊富に含まれていますので、できるだけ皮をむかずに調理すると良いです。",
  "ケーキを焼くときは、焼きすぎに注意して、中心部に竹串を刺してみて生地がついてこない状態が理想です。",
  "魚を調理するときには、塩をふってからしばらく置くと、食材のうまみが引き出されます。",
];

// 調理時間
const _ = 85;

// 献立リスト
const category = ["主食", "主菜", "副菜", "汁物"];

// ページ名
const title = "献立確認";

// 画面向き変更検知イベント
window.addEventListener("orientationchange", () => {
  window.location.reload();
});

function MenuConfirmation() {
  // 画面遷移用フック
  const navigate = useNavigate();

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://dev-makeck.mattuu.com//chart/sermaterials",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipe_ids: JSON.parse(localStorage.getItem("select_key")) || [],
            }),
          }
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log("fetchMaterials 結果", data);
        setMaterials(data|| []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  // const {
  //   data: syusyoku,
  //   loading: _syusyokuLoading,
  //   error: _syusyokuError,
  // } = useMenuData("https://makeck.mattuu.com//chart/sermaterials");
  // const {
  //   data: syusai,
  //   loading: _syusaiLoading,
  //   error: _syusaiError,
  // } = useMenuData("https://makeck.mattuu.com//chart/sermaterials");
  // const {
  //   data: sirumono,
  //   loading: _sirumonoLoading,
  //   error: _sirumonoError,
  // } = useMenuData("https://makeck.mattuu.com//chart/sermaterials");
  // var categorys = [syusyoku, syusai, sirumono];

  // 選択料理ID
  const selectId = JSON.parse(localStorage.getItem("select_key"));
  const selectImages = JSON.parse(localStorage.getItem("select_image")) || [];

  const selectMenus = selectId.map((id, index) => {
    const matched = materials.find((m) => m.id === id);
    return {
      id,
      name: matched ? matched.name : "(名前なし)",
      image: selectImages[index] || images.default,
    };
  });

  // 料理データ
  // var selectMenus = []
  // var selectImages = [];

  // selectId?.forEach((element) => {
  //     console.log(`id: ${element} を検索`);

  //     categorys?.forEach((category) => {
  //         category?.forEach((item) => {
  //             // 一致したら終了
  //             if (element == item.id.normalize("NFC")) {
  //                 console.log("発見: " + item.name);
  //                 selectImages.push(item.image);
  //                 selectMenus.push(item);
  //                 console.log(item);
  //                 return true;
  //             }
  //         });
  //     });
  // });

  // 画面が横になっている場合
  if (screen.orientation.angle != 0) {
    return (
      <div className="App">
        <header>
          <div className="backBtn" onClick={() => navigate("/RecipeSelection")}>
            ＜
          </div>
          <div id="pageTitle">{title}</div>
        </header>
        <main>
          <h1 style={{ fontFamily: "KaiseiOpti-Medium" }}>
            画面を縦にしてください
          </h1>
        </main>
      </div>
    );
  }

  console.log(selectMenus);
  localStorage.setItem("select_image", JSON.stringify(selectMenus.map((m) => m.image)));

  return (
    <div className="App noScroll">
      <div
        style={{ height: "100vh", width: "100vw", display: "none" }}
        className="loader_screen"
      >
        <div>
          <h2 className="loader_text">作成中</h2>
          <span className="loader"></span>
        </div>
      </div>
      <header>
        <img
          src={images.backBtn}
          alt="戻るアイコン"
          className="backBtn"
          onClick={() => navigate("/RecipeSelection")}
        />
        <div id="pageTitle">{title}</div>
      </header>

      <main>
        {/* <div id='cookingTime'>
                    調理時間目安 : {cookingTime} 分
                </div> */}
        {/* <div id='cookingTime'><Marquee>
                    {`豆知識：${trivia[Math.round(Math.random()*trivia.length)]}`}
                </Marquee></div> */}

        <div id="menuListContainer">
          {selectMenus.map((menu, index) => {
            console.log(menu.name);
            return (
              <div className="menuWrapper" key={index}>
                <div className="category">{category[index]}</div>
                <div className="border"></div>
                <div className="menu">
                  <img className="menuImage" src={menu.image}></img>
                  <div className="menuName">{menu.name}</div>
                </div>
              </div>
            );
          })}
          <div id="naviText">こちらの献立で手順書を作成します</div>
        </div>
      </main>

      <footer id="decisionFooter">
        <button
          type="button"
          id="decisionBtn"
          onClick={() => {
            // loadscreen 出す
            document.querySelector(".loader_screen").style.display = "flex";
            setTimeout(() => {
              navigate("/MaterialList");
            }, 3000);
          }}
        >
          手順書作成
        </button>
      </footer>
    </div>
  );
}

export default MenuConfirmation;
