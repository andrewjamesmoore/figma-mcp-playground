import clsx from "clsx";
import Button from "../Button";
import styles from "./Card.module.css";

interface CardAction {
	label: string;
	onClick: () => void;
}

interface CardProps {
	title?: string;
	description?: string;
	primaryAction?: CardAction;
	secondaryAction?: CardAction;
	className?: string;
}

export default function Card({
	title = "I am a card.",
	description = "I usually have something important to say.",
	primaryAction,
	secondaryAction,
	className,
}: CardProps) {
	return (
		<div className={clsx(styles.card, className)} data-node-id="2:76">
			<div className={styles.content}>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.description}>{description}</p>
			</div>

			{(primaryAction || secondaryAction) && (
				<div className={styles.actions}>
					{secondaryAction && (
						<Button variant="secondary" onClick={secondaryAction.onClick}>
							{secondaryAction.label}
						</Button>
					)}
					{primaryAction && (
						<Button variant="primary" onClick={primaryAction.onClick}>
							{primaryAction.label}
						</Button>
					)}
				</div>
			)}
		</div>
	);
}
