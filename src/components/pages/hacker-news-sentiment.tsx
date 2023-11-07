import { Layout } from "antd";
import useHackerNewsPosts from "../../features/ingress/hacker-news/hooks";
import SentimentOnMany from "../../features/board/components/sentiment-on-many";

const HackerNewsSentiment = (): React.JSX.Element => {
	const { posts } = useHackerNewsPosts({ prefetch: true });


	return (
		<SentimentOnMany values={posts.map(p => p.title)} />
	);
};

export default HackerNewsSentiment;
