import clsx from "clsx";
import styles from "./Button.module.css";

interface ButtonProps {
	variant?: "primary" | "secondary";
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
	type?: "button" | "submit" | "reset";
}

export default function Button({
	variant = "primary",
	children,
	onClick,
	className,
	type = "button",
}: ButtonProps) {
	return (
		<button
			type={type}
			className={clsx(
				styles.button,
				variant === "primary" ? styles.primary : styles.secondary,
				className,
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
