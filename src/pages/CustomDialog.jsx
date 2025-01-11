import React from 'react';
import images from '../hooks/images';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import { ImageURL } from "../config";


export default function CustomDialog({
  isOpen,
  content,
  test_content,
  confirmButtonLabel,
  cancelButtonLabel,
  onConfirm,
  onCancel,
}) {
  return (
    <React.Fragment>
      
      {/* Dialogコンポーネントの利用 */}
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          left: "0%",   // ダイアログの表示位置のカスタマイズ
          "& .MuiPaper-root": { // ダイアログ全体のスタイルを変更
          backgroundColor: "#F8F5F2",
          borderRadius: "25px", // 角丸
          },
        }}
      >
        {/* DialogContentコンポーネントの利用 */}
        <DialogContent>

          {/* DialogContentTextコンポーネントの利用 */}
          <DialogContentText id="alert-dialog-description">
            {content} {/*選択中レシピ(ダイアログタイトル)*/}
          </DialogContentText>

        </DialogContent>
        <div className="dialogContainer">
          <img src={test_content[0] ? `${ImageURL}/${test_content[0]["id"]}.jpg` : images.selectStapleFood} width={125} height={95} alt="選択中レシピNO主食" />
          {/* <img src="${ImageURL}/00e60535e7e545c6a43b3a0baafb9200.jpg" width={125} alt="" /> */}
          <img src={test_content[1] ? `${ImageURL}/${test_content[1]["id"]}.jpg` : images.selectMainDish} width={125} height={95} alt="選択中レシピNO主菜" />
          <img src={test_content[2] ? `${ImageURL}/${test_content[2]["id"]}.jpg` : images.selectSideDish} width={125} height={95} alt="選択中レシピNO副菜" />
          <img src={test_content[3] ? `${ImageURL}/${test_content[3]["id"]}.jpg` : images.selectSoup} width={125} height={95} alt="選択中レシピNO汁物" />
        </div>

        {/* DialogActionsコンポーネントの利用 */}
        <DialogActions>
          {/* Buttonコンポーネントの利用 */}
          {/* {<Button onClick={onConfirm} sx={{ fontSize: "20px" }}>
            {confirmButtonLabel}
          </Button>} */}
          {/* Buttonコンポーネントの利用 ダイアログ閉じるボタン*/}
          <Button onClick={onCancel}
            sx={{
              fontSize: "20px",
              marginRight: "38%",
                
            }}>
            {cancelButtonLabel}
          </Button>
        </DialogActions>
      </Dialog>
      
    </React.Fragment>


  );
}    