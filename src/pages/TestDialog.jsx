import React from 'react';
import { useNavigate } from "react-router-dom";
import CustomDialog from "./CustomDialog";

export default function TestDialog({ isOpen,test_content, onConfirm, onCancel }) {
    const content = "選択中レシピ";
  
    return (
      <CustomDialog
        isOpen={isOpen}
        content={content}
        test_content={test_content}
        // confirmButtonLabel="OK"
        cancelButtonLabel="閉じる"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );
}