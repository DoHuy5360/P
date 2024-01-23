import { useCallback, useContext } from "react";
import LabelWrap from "./title";
import { DataSourceContext, SchoolType } from "@/context/dataSourceProvider";
import FakeInput from "@/components/inputs/fakeInput";
import useUpdateDataSource from "@/components/hooks/useUpdateDataSource";

function Education() {
	const { dataSource, actions } = useUpdateDataSource({});

	return (
		<LabelWrap
			title={<FakeInput value={dataSource.education.title} onInput={actions.updateEducationTitle} />}
			body={
				<div className='flex flex-col gap-2'>
					{dataSource.education.schools.map((school, i) => {
						return (
							<div key={i}>
								<School school={school} index={i} />
							</div>
						);
					})}
				</div>
			}
		/>
	);
}
type SchoolProps = {
	index: number;
	school: SchoolType;
};
function School({ index, school }: SchoolProps) {
	const { actions } = useUpdateDataSource({ index });

	return (
		<div className='flex flex-col gap-2'>
			<div className='flex gap-2'>
				<div className='font-bold'>
					<FakeInput value={school.name} onInput={actions.updateEducationType} />
				</div>
				<FakeInput value={school.type} onInput={actions.updateEducationType} />
			</div>
			<div className='flex flex-col gap-3'>
				{school.scores.map((score, i) => {
					return (
						<div key={i}>
							<Score score={score} parentIndex={index} index={i} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

type ScoreProps = {
	parentIndex: number;
	index: number;
	score: string;
};
function Score({ index, parentIndex, score }: ScoreProps) {
	const { actions } = useUpdateDataSource({ index, parentIndex });

	return <FakeInput value={score} onInput={actions.updateEducationScore} />;
}

export default Education;
