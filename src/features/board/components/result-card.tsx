import { Card } from "antd";
import { Result, Value } from "../types";

type ResultCardProps = {
	value: Value;
	result: Result;
	onPostClick?: () => void;
};
const ResultCard = ({ value, result, onPostClick }: ResultCardProps): React.JSX.Element => {
	const handlePostClick = () => {
		if (onPostClick) onPostClick();
	}

	return (
		<Card title={value.value} type="inner" onClick={handlePostClick}>
			{result.text.map((r) => (
				<p key={`${r.label}${r.score}`}>
					Sentiment: {r.label} (confidence: {Math.round(r.score * 100)}%)
				</p>
			))}
		</Card>
	);
};

export default ResultCard;
