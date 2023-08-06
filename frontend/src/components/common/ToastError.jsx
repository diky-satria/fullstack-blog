import { toast } from "react-hot-toast";

export default function ToastError(notification, position) {
  toast.error(notification, {
    position: position,
    iconTheme: {
      primary: "#ff5959",
      secondary: "#fff",
    },
    style: {
      borderRadius: "10px",
      background: "#ff3131",
      color: "#fff",
    },
  });
}
