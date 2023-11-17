import { useEffect, useState } from "react";
import { Result, ResultWithValue, Value } from "../types";
import { useBoardContext } from "../context";
import { Card, Spin } from "antd";
import ResultCard from "./result-card";

type SentimentOnManyProps = {
	values: Value[];
	handlePostClick?: (id: string) => void;
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

	const handleClick = (id: string) => () => {
		if (handlePostClick) handlePostClick(id);
	}

	return (
		<Card title="Hacker News Posts Sentiment" data-cy="SentimentOnMany">
			{results.length > 0 ? (
				<>
					{results.map((r) => (
						<ResultCard key={`${r.value.value}${r.result.text[0].score}`} value={r.value} result={r.result} onPostClick={handleClick(r.value.id)} />
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
