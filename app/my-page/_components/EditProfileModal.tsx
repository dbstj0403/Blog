"use client";

import { useState } from "react";
import Modal from "@/components/common/Modal";

interface EditProfileModalProps {
  currentName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newName: string) => void;
}

export default function EditProfileModal({
  currentName,
  isOpen,
  onClose,
  onSuccess,
}: EditProfileModalProps) {
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const res = await fetch("/api/users/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("닉네임이 수정되었습니다.");
      onSuccess(name);
      onClose();
    } else {
      alert(data.message || "수정에 실패했습니다.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      actions={[
        {
          label: loading ? "저장 중..." : "저장",
          onClick: handleSave,
          className: "bg-hana-green text-white hover:bg-hana-green/90",
          disabled: loading,
        },
        {
          label: "취소",
          onClick: onClose,
          className: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        },
      ]}
    >
      <div className="flex flex-col gap-3 text-sm">
        <label className="text-gray-700">닉네임</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          placeholder="새 닉네임을 입력하세요"
        />
      </div>
    </Modal>
  );
}
