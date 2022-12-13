import styles from "./ErrorMessages.module.scss";

interface ErrorMessagesProps {
  messages: string[];
}

function ErrorMessages({ messages }: ErrorMessagesProps) {
  if (messages.length === 0) return null;

  const errorMessages = messages.map((message) => (
    <div key={message}>{message}</div>
  ));
  return <div className={styles.errorBox}>{errorMessages}</div>;
}

export default ErrorMessages;
