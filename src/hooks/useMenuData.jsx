import { useState, useEffect } from "react";

const useMenuData = (url, category) => {
  // 状態を定義
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // データ取得用の非同期関数
    const fetchData = async () => {
      try {
        setLoading(true); // ローディング開始
        const response = await fetch(url,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "category" : category
          }),
        }); // APIリクエスト
        if (!response.ok) {
          throw new Error(`HTTPエラー: ${response.status}`);
        }
        const result = await response.json(); // JSONを取得
        setData(result["result"]); // データを状態に保存
      } catch (err) {
        setError(err.message); // エラーを状態に保存
      } finally {
        setLoading(false); // ローディング終了
      }
    };

    fetchData(); // 関数を呼び出し
  }, [url]); // URLが変更されるたびに実行

  // 他のコンポーネントで使えるように値を返す
  return { data, loading, error };
};

export default useMenuData;
