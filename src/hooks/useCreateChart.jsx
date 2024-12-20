import { useState, useEffect } from "react";

const useCreateChart = (menuData) => {
  // 状態を定義
  const [chart, setChart] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // データ取得用の非同期関数
    const createChart = async () => {
      try {
        console.log("----- start creating chart task -----")
        // メニューデータを取得
        const menus = menuData;
        if (menus == null) {
          throw new Error(`献立が見つかりません`);
        }
        console.log(`menus : `, menus);

        // 4品のID
        var uids = [];
        menus.recipies.forEach((element) => {
          uids.push(element.Uid);
        });

        // 全タスク
        const recipies = menus.recipies;
        const tasks = menus.tasks;
        // console.log("tasks : ", tasks);

        // 最終結果格納配列
        // 総時間, メニュー格納用空配列
        var result = {
          totalTime : menus.totaltime,
          menu : []
        }

        // メニュー格納用配列に要素格納
        // uid, 名前, タスク格納用から配列
        recipies.forEach((element, index) => {
          result.menu.push({
            uid : element.Uid,
            name : element.Name,
            tasks : []
          })
        });

        // タスク格納用配列
        // uid, タスク名, 必要時間,
        result.menu.forEach((menuItem, index) => {
          console.log(`menuItem : `, menuItem);

        });
        
        
        

        console.log("result : " , result);

        // 4品分のチャート作成
        for (let i = 0; i < menus.recipies.length; i++) {
          // console.log(`--- ${i}品目 ---`);
          // 商品のID指定
          var uid = uids[i];

          // チャート作成
          tasks.forEach((element, index)=> {
            // 手順が存在するか判断
            if (element.tejuns[uid].time == null) {
            }else{
              // console.log(element.tejuns[uid].name);
              // console.log("result[", i, "][", index, "]に代入");
              result[i][index].push(
                <div key={`${uid}-task${index}`} className='gridItem' style={{gridRow: `span ${element.tejuns[uid].time}`}}>
                  {element.tejuns[uid].name}
                </div>
              )
            }
            
          });
        }

        // tasks.forEach((element, index) => {
        //   console.log(`element :`, element.tejuns[uid])
        //   if (element.tejuns[uid].time) {
        //     console.log(`タスク${index}\n開始時間 : ${element.startTime}\n手順 : ${element.tejuns[uid].name} | ${element.tejuns[uid].time}`);
        //     result[menuIndex].push(
        //       <div key={`uid-${uid}-task-${index}`} className='gridItem' style={{gridRow: `span ${element.tejuns[uid].time}`}}>
        //         a
        //       </div>
        //     );
        //   }else{
        //     if ( freeStart == null ) freeStart = element.startTime;
        //     freeEnd = tasks[index+1].startTime-1;
        //     console.log(`空白時間 : ${freeStart}-${freeEnd}`)

        //     if (freeEnd != null) {
        //       console.log(`空白時間 : ${freeEnd - freeStart}`)
        //       result[menuIndex].push(
        //         <div key={`uid-${uid}-task-${index}`} className='gridItem line' style={{gridRow: `span ${freeEnd-freeStart}`}}>
        //           a
        //         </div>
        //       );
        //       freeStart = null;
        //       freeEnd = null;
        //     }
        //   }
        // });
        
        setChart(result); // データを状態に保存
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
