import { Dispatch, SetStateAction, createContext, useState } from "react";

type Alert = {
	type: "success" | "fail";
	message: string;
};

type Setup = {
	alertData: Alert | null;
	setAlertData: Dispatch<SetStateAction<Alert | null>>;
};

export const AlertContext = createContext<Setup>({
	alertData: null,
	setAlertData: () => {},
});

function AlertProvider({ children }: { children: JSX.Element }) {
	const [alertData, setAlertData] = useState<Alert | null>(null);
	return (
		<AlertContext.Provider
			value={{
				alertData,
				setAlertData,
			}}
		>
			{children}
		</AlertContext.Provider>
	);
}

export default AlertProvider;
