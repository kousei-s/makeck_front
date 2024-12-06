import { useNavigate } from 'react-router-dom';

function FromFirst() {
    // 画面遷移用フック
    const navigate = useNavigate();

    return (
        <div>
            <header>
                <div className='backBtn' onClick={() => navigate('/')}>＜</div>
                <div id='pageTitle'>1からレシピ選択</div>
            </header>
            <main></main>
        </div>
    )
}

export default FromFirst;