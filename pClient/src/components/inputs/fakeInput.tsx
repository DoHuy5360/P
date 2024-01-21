import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";

type FakeInputType = {
	value: string;
	onInput: (value: string) => void;
};
function FakeInput({ value, onInput }: FakeInputType) {
	const sendText = useCallback((e: ChangeEvent<HTMLDivElement>) => {
		onInput(e.target.innerText);
	}, []);

	return (
		<div
			onInput={sendText}
			className='text-justify cursor-text bg-white py-1 px-2 w-fit border-inputBorder border-[1px]'
			contentEditable
			dangerouslySetInnerHTML={{ __html: value }}
			draggable={false}
		></div>
	);
}
export default FakeInput;
