import { useState, useEffect } from "react";

const useCreateChart = (menuData) => {
  // 状態を定義
  const [chart, setChart] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // データ取得用の非同期関数
    const createChart = async () => {
      try {
        console.log("----- start creating chart -----")
        // メニューデータを取得
        const menus = menuData;
        if (menus == null) {
          throw new Error(`献立が見つかりません`);
        }
        
        console.log("menus : \n" , menus);
        var menuId = [];
        menus.recipies.forEach(element => {
            menuId.push(element.Uid);
        });
        console.log(menuId);

        
        menuId.forEach(element => {
            
        });


        const result = <></>;
        setChart(null); // データを状態に保存
      } catch (err) {
        setError(err.message); // エラーを状態に保存
      }
    };

    createChart();    // 関数を呼び出し
  }, [menuData]);   // 献立が変更されるたびに実行

  // 他のコンポーネントで使えるように値を返す
  return { chart, error };
};

export default useCreateChart;
