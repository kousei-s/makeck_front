import React from 'react';
import { useNavigate } from "react-router-dom";
import CustomDialog from "./CustomDialog";

export default function TestDialog({ isOpen, onConfirm, onCancel }) {
    const content = "テストカスタムダイアログ";
  
    return (
      <CustomDialog
        isOpen={isOpen}
        content={content}
        confirmButtonLabel="OK"
        cancelButtonLabel="キャンセル"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );
}