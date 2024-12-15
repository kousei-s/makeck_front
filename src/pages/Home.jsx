import { useNavigate } from 'react-router-dom';

import images from '../hooks/images';

function Home() {
  // 画面遷移用フック
  const navigate = useNavigate();

  return (
    <div className="App noScroll">

      <header>
        <img src={images.icon} id="userIcon" alt="icon" />
        <div id="appName">MakeCK</div>
        {/*デモ後追加*/}
        {/* {<img src={images.logo} id="appLogo" alt="logo"></img>} */}
      </header>

      <main className=''>
        <div className="cookingImgwrapper">
          <img className="cookingImg" src={images.makeckImage} alt="料理写真(暫定)"></img>
        </div>

        <div className="selectionMenu">
          <div className="menuTitle">レシピ選択方法</div>

          <button type="button" id="fromFirst" onClick={() => navigate('/RecipeSelection')}>
            <p className="btnText">1からレシピ選択</p>
            <p className="arrow">＞</p>
          </button>

          <button type="button" id="fromRegistered" onClick={() => navigate('/menuConfirmation')}>
            <p className="btnText">登録レシピから選択</p>
            <p className="arrow">＞</p>
          </button>
        </div>

        <div className="supplementText">
          coming soon...
        </div>
        
        {/* <div className="iconWrapper">
          <img className="potIcon" src={images.pot} alt='鍋アイコン'></img>
          <img className="mixerIcon" src={images.mixer} alt='ミキサーアイコン'></img>
        </div> */}


      </main>

      <footer id='homeFooter'>
        <div id="selectBtn" className='footerMenu'>
          <img className="icon"src={images.book} alt='レシピ本アイコン'></img>
          <div>レシピ選択</div>
        </div>

        <div id="shareBtn" className='footerMenu'>
          <img className="icon" src={images.share} alt='共有アイコン'></img>
          <div>レシピ共有</div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
