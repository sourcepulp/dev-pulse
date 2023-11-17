import { Card, Divider, Spin } from "antd";
import { HackerNewsPost } from "../../ingress/hacker-news/domain";
import { useEffect, useState } from "react";
import { ResultWithValue, Value } from "../types";
import { useBoardContext } from "../context";
import { useHackerNewsPost } from "../../ingress/hacker-news/hooks";
import ResultCard from "./result-card";

type HackerNewsPostViewProps = {
	hackerNewsPost: HackerNewsPost | undefined;
};

const HackerNewsPostView = ({ hackerNewsPost }: HackerNewsPostViewProps): React.JSX.Element => {
	const [results, setResults] = useState<ResultWithValue[]>([]);
	const { runOnceOnMany } = useBoardContext();

	const getCommentsArray = (): Value[] => {
		const comments = hackerNewsPost?.children;
		let commentsArray: Value[] = [];
		comments?.map((comment) => commentsArray.push({ value: comment?.text, id: comment.id }));
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
					{results.map((r) => <ResultCard key={`${r.value.value}${r.result.text[0].score}`} value={r.value} result={r.result} />)}
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
