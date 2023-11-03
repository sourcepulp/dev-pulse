import { Card } from "antd";
import { Result } from "../types";

type ResultCardProps = {
	value: string;
	result: Result;
};
const ResultCard = ({ value, result}: ResultCardProps): React.JSX.Element => {
	return (
		<Card title={value} type="inner">
			{result.text.map((r) => (
				<p key={`${r.label}${r.score}`}>
					Sentiment: {r.label} (confidence: {Math.round(r.score * 100)}%)
				</p>
			))}
		</Card>
	);
};

export default ResultCard;
