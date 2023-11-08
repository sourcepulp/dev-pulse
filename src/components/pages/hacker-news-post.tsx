import { Card, Divider, Spin } from "antd";
import { HackerNewsPost } from "../../features/ingress/hacker-news/domain";
import { useEffect, useState } from "react";
import { ResultWithValue } from "../../features/board/types";
import { useBoardContext } from "../../features/board/context";
import { useHackerNewsPost } from "../../features/ingress/hacker-news/hooks";
import ResultCard from "../../features/board/components/result-card";

type HackerNewsPostViewProps = {
	hackerNewsPost: HackerNewsPost | undefined;
};

const HackerNewsPostView = ({ hackerNewsPost }: HackerNewsPostViewProps): React.JSX.Element => {
	const [results, setResults] = useState<ResultWithValue[]>([]);
	const { runOnceOnMany } = useBoardContext();

	const postId = hackerNewsPost?.id;

	const getCommentsArray = (): string[] => {
		const comments = hackerNewsPost?.children;
		let commentsArray: string[] = [];
		comments?.map((comment) => commentsArray.push(comment?.text));
		commentsArray = commentsArray.slice(0, 10);
		return commentsArray;
	}

	const commentsArray = getCommentsArray();


	useEffect(() => {
		const run = async () => {
			const res = await runOnceOnMany(
				"Xenova/distilbert-base-uncased-finetuned-sst-2-english",
				commentsArray
			);
			setResults(res);
		};
		run();
	}, [commentsArray]);

	return (
		<Card title="Hacker News Comments Sentiment" data-cy="SentimentOnMany">
			{results.length > 0 ? (
				<>
					{results.map((r) => <ResultCard key={`${r.value}${r.result.text[0].score}`} value={r.value} result={r.result} />)}
				</>
			) : (
				<Spin tip="Loading" size="small">
					<div className="content" />
				</Spin>
			)}
		</Card >
	);
};

export default HackerNewsPostView;
