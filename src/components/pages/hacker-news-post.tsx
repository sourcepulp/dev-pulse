import { Divider } from "antd";
import { HackerNewsPost } from "../../features/ingress/hacker-news/domain";

type HackerNewsPostViewProps = {
	hackerNewsPost: HackerNewsPost | undefined;
};

const HackerNewsPostView = ({ hackerNewsPost }: HackerNewsPostViewProps): React.JSX.Element => {
	const comments = hackerNewsPost?.children;
	console.log(hackerNewsPost);

	return (
		<div>
			{comments?.map((comment) => <>
				<p>{comment?.text}</p><Divider /></>)}
		</div >
	);
};

export default HackerNewsPostView;
