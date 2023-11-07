import { useEffect, useState } from "react";
import { Result, ResultWithValue } from "../types";
import { useBoardContext } from "../context";
import { Card, Spin } from "antd";
import ResultCard from "./result-card";

type SentimentOnManyProps = {
	values: string[];
	handlePostClick: () => void;
};
const SentimentOnMany = ({
	values,
	handlePostClick
}: SentimentOnManyProps): React.JSX.Element => {
	const [results, setResults] = useState<ResultWithValue[]>([]);

	const { runOnceOnMany } = useBoardContext();

	useEffect(() => {
		const run = async () => {
			const res = await runOnceOnMany(
				"Xenova/distilbert-base-uncased-finetuned-sst-2-english",
				values
			);
			setResults(res);
		};
		run();
	}, [values]);

	return (
		<Card title="Hacker News Posts Sentiment" data-cy="SentimentOnMany">
			{results.length > 0 ? (
				<>
					{results.map((r) => (
						<ResultCard key={`${r.value}${r.result.text[0].score}`} value={r.value} result={r.result} onPostClick={handlePostClick} />
					))}
				</>
			) : (
				<Spin tip="Loading" size="small">
					<div className="content" />
				</Spin>
			)}
		</Card>
	);
};

export default SentimentOnMany;
