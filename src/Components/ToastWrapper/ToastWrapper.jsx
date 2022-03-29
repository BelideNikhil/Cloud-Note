import { Toaster } from "react-hot-toast";
export function ToastWrapper() {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
                success: {
                    duration: 2000,
                },
                error: {
                    duration: 2000,
                },
            }}
            containerStyle={{
                top: 85,
                right: 15,
            }}
        />
    );
}
