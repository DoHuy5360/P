type LabelWrapProps = {
	title: JSX.Element;
	body: JSX.Element;
};
function LabelWrap({ title, body }: LabelWrapProps) {
	return (
		<div className='flex flex-col gap-2 p-4'>
			<div className='flex items-center gap-0 text-nowrap'>
				{title}
				<div className='w-full h-[1px] bg-inputBorder'></div>
			</div>
			{body}
		</div>
	);
}

export default LabelWrap;
