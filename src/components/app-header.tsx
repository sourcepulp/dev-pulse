import { Header } from "antd/es/layout/layout";
import styles from "./app-header.module.scss";

type HeaderProps = {
	className?: string;
};
const AppHeader = ({ className = "header" }: HeaderProps): React.JSX.Element => {
	return <Header className={styles.header}>
		DevPulse
	</Header>;
};

export default AppHeader;
