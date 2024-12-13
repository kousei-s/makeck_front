import { useState, useEffect } from "react";

const useCreateChart = (menuData, menuIndex) => {
  // 状態を定義
  const [chart, setChart] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // データ取得用の非同期関数
    const createChart = async () => {
      try {
        console.log("----- start creating chart task",menuIndex, " -----")
        // メニューデータを取得
        const menus = menuData;
        if (menus == null) {
          throw new Error(`献立が見つかりません`);
        }
        
        // 最終結果
        let result = [[]];

        let freeStart, freeEnd = null;
        // 4品のID
        let uid = menus.recipies[menuIndex].Uid;
        console.log("Uid : ", uid)

        // 全タスク
        const tasks = menus.tasks;
        console.log("tasks : ", tasks);

        tasks.forEach((element, index) => {
          console.log(`element :`, element.tejuns[uid])
          if (element.tejuns[uid].time) {
            console.log(`タスク${index}\n開始時間 : ${element.startTime}\n手順 : ${element.tejuns[uid].name} | ${element.tejuns[uid].time}`);
            result[menuIndex].push(
              <div key={`uid-${uid}-task-${index}`} className='gridItem' style={{gridRow: `span ${element.tejuns[uid].time}`}}>
                a
              </div>
            );
          }else{
            if ( freeStart == null ) freeStart = element.startTime;
            freeEnd = tasks[index+1].startTime-1;
            console.log(`空白時間 : ${freeStart}-${freeEnd}`)

            if (freeEnd != null) {
              console.log(`空白時間 : ${freeEnd - freeStart}`)
              result[menuIndex].push(
                <div key={`uid-${uid}-task-${index}`} className='gridItem line' style={{gridRow: `span ${freeEnd-freeStart}`}}>
                  a
                </div>
              );
              freeStart, freeEnd = null;
            }
          }
        });
        
        console.log(`result : ${result}`);

        setChart(result); // データを状態に保存
      } catch (err) {
        setError(err.message); // エラーを状態に保存
      }
    };

    createChart();    // 関数を呼び出し
  }, [menuData,  menuIndex]);   // 献立が変更されるたびに実行

  // 他のコンポーネントで使えるように値を返す
  return { chart, error };
};

export default useCreateChart;
