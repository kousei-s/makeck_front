import { useNavigate } from "react-router-dom";
import React from 'react';
import images from '../hooks/images';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";


export default function CustomDialog({
    isOpen,
    content,
    confirmButtonLabel,
    cancelButtonLabel,
    onConfirm,
    onCancel,
}) {
    return(
    <React.Fragment>
             {/* Dialogコンポーネントの利用 */}
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          left: "0%",   // ダイアログの表示位置のカスタマイズ
        }}
      >
        {/* DialogContentコンポーネントの利用 */}
        <DialogContent>
            
          {/* DialogContentTextコンポーネントの利用 */}
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: "25px", textAlign: "center" }}  // ダイアログのテキストスタイルのカスタマイズ
          >
            {content}
          </DialogContentText>
        </DialogContent>
        <div className="dialogContainer">
          <img src={images.selectStapleFood} alt="選択中レシピNO主食" />
          <img src={images.selectMainDish} alt="選択中レシピNO主菜" />
          <img src={images.selectSideDish} alt="選択中レシピNO副菜" />
          <img src={images.selectSoup} alt="選択中レシピNO汁物" />
        </div>

        {/* DialogActionsコンポーネントの利用 */}
        <DialogActions>
          {/* Buttonコンポーネントの利用 */}
          {/* {<Button onClick={onConfirm} sx={{ fontSize: "20px" }}>
            {confirmButtonLabel}
          </Button>} */}
          {/* Buttonコンポーネントの利用 ダイアログ閉じるボタン*/}
          <Button onClick={onCancel} 
          sx={{ fontSize: "20px", 
                marginRight:"38%",

          }}>
            {cancelButtonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>

        
    );
}    