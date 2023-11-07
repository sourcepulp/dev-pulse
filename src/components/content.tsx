import { Layout } from "antd";
import { useEffect } from "react";
import useHackerNewsPosts from "../features/ingress/hacker-news/hooks";
import BasicForm from "../features/board/components/basic-form";
import SentimentOnMany from "../features/board/components/sentiment-on-many";

const Content = (): React.JSX.Element => {
	const { Content: ContentLayout } = Layout;
	const { posts } = useHackerNewsPosts({ prefetch: true });
	

	return (
		<ContentLayout>
			<BasicForm />
			<SentimentOnMany values={posts.map(p => p.title)} />
		</ContentLayout>
	);
};

export default Content;
