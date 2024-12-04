import { Link } from "react-router-dom";

export default function Home() {
    return(
        <nav>
            <ul className="menu bg-base-200 rounded-box">
                <li>
                    <h2 className="menu-title">遷移用HOME</h2>
                    <ul>
                        <li><Link to="/RecipeSelection" className="link">カテゴリ別レシピ選択画面</Link></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}