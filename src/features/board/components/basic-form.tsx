import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useBoardContext } from "../context";
import { Result } from "../types";
import { v4 as uuid } from "uuid";

type FieldType = {
	phrase: string;
};


const BasicForm = (): React.JSX.Element => {
	const [result, setResult] = useState<Result | null>(null);

	const { runOnce } = useBoardContext();

	const onSubmit = async (values: FieldType) => {
		const res = await runOnce(
			"Xenova/distilbert-base-uncased-finetuned-sst-2-english",
			values.phrase
		);
		setResult(res);
	};
	return (
		<div data-cy="BasicForm">
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
			{result &&
				result.text.map((r) => <p key={uuid()}>{`${r.label} (${r.score})`}</p>)}
		</div>
	);
};

export default BasicForm;
