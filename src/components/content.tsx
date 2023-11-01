import { Button, Form, Input, Layout } from 'antd';

type FieldType = {
	phrase: string;
};

const onSubmit = (values: FieldType) => {
	console.log(values.phrase);
};

const Content = (): React.JSX.Element => {
	const { Content: ContentLayout } = Layout;


	return (
		<ContentLayout>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				initialValues={{ remember: true }}
				autoComplete="off"
				onFinish={onSubmit}
			>
				<Form.Item<FieldType>
					label="Phrase"
					name="phrase"
					rules={[{ required: true, message: "Please input your username!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</ContentLayout>
	);
};

export default Content;
