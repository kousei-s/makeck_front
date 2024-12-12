import { useNavigate } from 'react-router-dom';
import useMenuData from '../hooks/useMenuData';
import useCreateChart from '../hooks/useCreateChart';

import images from '../hooks/images';

function CookProcess() {
  // 画面遷移用フック
  const navigate = useNavigate();
  
  // メニューデータ取得
  var { data, loading, error } = useMenuData("https://makeck.mattuu.com/api/chart")
  var { chart, createError } = useCreateChart( data );
  var totalTime = data?.totaltime;
  
  // 次のページ
  const nextPage = {
      title : "調理完了",
      path : "/"
  }

  // 画像パス
  const menuImages = [
      images.squidRisotto,
      images.frankfurtSaute,
      images.coconutMilkJelly,
      images.brownSeaweedSoup
  ]

  if (error) {
    return (
        <div className='App noScroll'>
            <header>
              {/* 戻るボタン */}
              <div className='backBtn' onClick={() => navigate('/')}>＜</div>
              <div id='pageTitle'>調理手順</div>
          </header>
          <main>
            <h1>{error.message}</h1>
          </main>
        </div>
    )
  }

  if (loading) {
    return (
        <div className='App noScroll'>
            <header>
              {/* 戻るボタン */}
              <div className='backBtn' onClick={() => navigate('/')}>＜</div>
              <div id='pageTitle'>調理手順</div>
          </header>
          <main>
            <h1>nowLoading...</h1>
          </main>
        </div>
    )
  }

  return (
      <div className='App noScroll'>
          <header>
              {/* 戻るボタン */}
              <div className='backBtn' onClick={() => navigate('/')}>＜</div>
              <div id='pageTitle'>調理手順</div>
          </header>

          <main>
              <div id='cookingTime'>
                  調理時間目安 : {totalTime} 分
              </div>
              
              <div id='processCategory'>
                  <div className='colorBox yellow'></div>
                  <div>下準備</div>
                  <div className='colorBox red'></div>
                  <div>調理</div>
                  <div className='colorBox green'></div>
                  <div>仕上げ</div>
              </div>
              
              {/* 献立画像コンテナ */}
              <div id='imagesBorder'>
                  <div id='imageContainer'className='grid'>
                      {/* 画像配列をmapで回して表示 */}
                      {menuImages.map((image, index) => {
                          return ( 
                              <div key={index} className='imageWrapper'>
                                  <img src={image} className='gridItem' alt="料理画像"></img>
                              </div>
                          )
                      })}
                  </div>
              </div>
              
              {/* ガントチャートコンテナ */}
              <div id='startLabel'></div>
              <div id='chartContainer' className='grid'>
                  {/* チャート生成 */}
                  {/* {chart.map((value, index) => {
                      return (
                          <div key={index} className='chartWrappter' style={{gridTemplateRows: `repeat(${testData.totaltime}, 1fr)`}}>
                              {value.map((value, index) => {
                                  // 色変更処理 (あとで実データに合わせて修正)
                                  var c = "gridItem";
                                  if (Math.trunc(Math.random()*10 % 2) === 0) {
                                      c += " line";
                                  }

                                  return <div key={index} className={c}></div>
                              })}
                          </div>
                      )
                  })} */}
              </div>
          </main>

        <footer id='decisionFooter'>
            <button type='button' id='decisionBtn' onClick={() => navigate(nextPage.path)}>{nextPage.title}</button>
        </footer>
      </div>
  )
}

export default CookProcess;
