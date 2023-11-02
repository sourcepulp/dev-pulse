import { Header } from "antd/es/layout/layout";
import styles from "./app-header.module.scss";

const AppHeader = (): React.JSX.Element => {
	return <Header className={styles.header}>
		DevPulse
	</Header>;
};

export default AppHeader;
