import { useState, useEffect } from "react"

const useCreateChart = (menuData) => {
  // 状態を定義
  const [chart, setChart] = useState(null)
  const [chartError, setChartError] = useState(null)

  useEffect(() => {
    // データ取得用の非同期関数
    const createChart = async () => {
      try {
        console.log("----- start creating chart task -----")
        // メニューデータを取得
        const menus = menuData
        if (menus == null) {
          throw new Error(`献立が見つかりません`)
        }

        // 4品のID
        var uids = []
        menus.recipies.forEach((element) => {
          console.log(element)
          uids.push(element.Uid)
        })

        // 全タスク
        const recipies = menus.recipies
        const tasks = menus.tasks

        // 配列生成時に使用する変数
        // 1つの手順, 開始時間, 終了時間, 次の手順
        var tejun, startTime, endTime, nextTask

        // レシピチャート用配列
        var result = {
          // 調理時間
          totalTime : menus.totaltime,

          // メニュー4品
          menu : 
            recipies.map((element, index) => {
              var menuId = element.Uid;
              return({
                // メニューID
                uid : menuId,

                // メニュー名
                name : element.Name,

                // 最終状態
                lastState : element.LastSatate,

                // 手順一覧(あとで)
                task : 
                  tasks.map((task, taskIndex) => {
                    tejun = task.tejuns[menuId]

                    // 対象メニューごとにリセット
                    if (taskIndex == 0) {
                      startTime = null
                      endTime = null
                    }

                    // 手順があるかないか
                    if (tejun.name == undefined) {
                      // 空き時間の開始時間
                      if (startTime == null) startTime = task.startTime

                      // 次の手順参照用
                      nextTask = tasks[taskIndex+1]

                      // 空き時間が終了時間まで続いた場合
                      if (taskIndex == (tasks.length-1)) {
                        endTime = menus.totaltime
                      }
                      // 次の手順がある場合
                      else if (nextTask.tejuns[menuId].name != undefined) {
                        endTime = nextTask.startTime
                      }

                      // 空き時間終了時点で格納
                      if (endTime) {
                        return({
                          taskId : `${menuId}-${taskIndex}`,
                          taskName : "空き時間",
                          startTime : startTime,
                          endTime : endTime,
                          useTime : endTime-startTime
                        })
                      }
                                            
                    }else{
                      // 手順がある場合
                      startTime = tejun.time+task.startTime
                      endTime = null

                      return({
                        taskId : tejun.id,
                        taskName : tejun.name,
                        startTime : task.startTime,
                        endTime : tejun.time+task.startTime,
                        useTime : tejun.time
                      })
                    }
                  })
              })
            })
        }

        // 取得確認 (使用部分以外はコメントアウトした方が見やすい)
        console.log(`料理時間目安 : ${result.totalTime}分`)

        result.menu.map(element => {
          console.log(`${element.name}`)
          // console.log(`UID : ${element.uid}`)
          // console.log(`最終状態 : ${element.lastState}`)
          // console.log("手順")
          // element.task.map((t, tIndex) => {
          //   if(t != undefined) {
          //     console.log(`\t${t.taskName}\n\t所要時間 : ${t.useTime}分 (${t.startTime}分～${t.endTime}分)`)
          //   }
          // })
        });
        
        setChart(result) // データを状態に保存
      } catch (err) {
        setError(err.message) // エラーを状態に保存
      }
    }

    createChart()    // 関数を呼び出し
  }, [menuData])   // 献立が変更されるたびに実行

  // 他のコンポーネントで使えるように値を返す
  return { chart, chartError }
}

export default useCreateChart
