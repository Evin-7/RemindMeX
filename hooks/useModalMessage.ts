import { useState } from "react";

interface Message {
  visible: boolean;
  title: string;
  message: string;
  type?: "success" | "error";
}

export function useModalMessage() {
  const [message, setMessage] = useState<Message>({
    visible: false,
    title: "",
    message: "",
    type: "success",
  });

  const showMessage = (
    title: string,
    msg: string,
    type: "success" | "error",
  ) => {
    setMessage({ visible: true, title, message: msg, type });
  };

  const hideMessage = () => {
    setMessage((prev) => ({ ...prev, visible: false }));
  };

  return { message, showMessage, hideMessage };
}
