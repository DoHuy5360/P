import FakeInput from "@/components/inputs/fakeInput";
import LabelWrap from "./title";
import useUpdateDataSource from "@/components/hooks/useUpdateDataSource";
import { DataImage } from "@/context/dataSourceProvider";

function Knowledge() {
	const { dataSource, actions } = useUpdateDataSource({});
	return (
		<LabelWrap
			title={<FakeInput value={dataSource.knowledge.title} onInput={actions.updateKnowledgeTitle} />}
			body={
				<div className='flex flex-wrap gap-2'>
					{dataSource.knowledge.skills.map((skill, i) => {
						return (
							<div key={i}>
								<Skill skill={skill} index={i} />
							</div>
						);
					})}
				</div>
			}
		/>
	);
}

type SkillProps = {
	index: number;
	skill: DataImage;
};
function Skill({ index, skill }: SkillProps) {
	const { actions } = useUpdateDataSource({ index });
	return (
		<div className='flex gap-2'>
			<img src={skill.source} className='w-8' alt={skill.name} draggable={false} />
			<FakeInput value={skill.name} onInput={actions.updateKnowledgeSkill} />
		</div>
	);
}

export default Knowledge;
