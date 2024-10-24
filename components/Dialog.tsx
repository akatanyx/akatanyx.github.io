"use client";
import { useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";

type Props = {
  title: string;
  onClose: () => void;
  onOk: () => void;
  children: React.ReactNode;
};

export default function Dialog({ title, onClose, onOk, children }: Props) {
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get("showDialog");

  useEffect(() => {
    if (showDialog === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeDialog = () => {
    dialogRef.current?.close();
    onClose();
  };

  const clickOk = () => {
    onOk();
    closeDialog();
  };

  const dialog: JSX.Element | null =
    showDialog === "y" ? (
      <dialog
        ref={dialogRef}
        className="text-white fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10  backdrop:bg-gray-800/50"
      >
        <div className="bg-[#C29736] w-full p-0.5"></div>
        <div className="w-[500px] max-w-full bg-black flex flex-col">
          <div className="flex flex-row justify-between mb-4 pt-2 px-5">
            <h1 className="font-bold text-xl">{title}</h1>
            <button
              onClick={closeDialog}
              className="mb-2 py-1 px-2 cursor-pointer border-none w-8 h-8 font-bold bg-red-600 text-white"
            >
              x
            </button>
          </div>
          <div className="px-5 pb-6">
            <div className="border p-4"> {children}</div>

            <div className="flex flex-row justify-end mt-2">
              <button
                onClick={clickOk}
                className="bg-gradient-to-r from-[#C29736] to-[#A76D00] py-1 px-2 border-none"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </dialog>
    ) : null;

  return dialog;
}
