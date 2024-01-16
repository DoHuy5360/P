import { MouseEventHandler } from "react";

type CenterProps = {
	text?: string;
	Icon?: JSX.Element;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

function Center({ text, Icon, onClick }: CenterProps) {
	return (
		<button onClick={onClick} className='grid place-items-center w-full h-full'>
			{text || Icon}
		</button>
	);
}

export default Center;
