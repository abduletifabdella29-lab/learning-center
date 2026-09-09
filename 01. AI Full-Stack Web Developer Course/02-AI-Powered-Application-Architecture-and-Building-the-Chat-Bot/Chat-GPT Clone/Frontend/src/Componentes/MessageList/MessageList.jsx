import styles from './MessageList.module.css';

function MessageList({ conversations = [1], isLoading, messagesEndRef }) {
  return (
    <div className={styles.MessageList}>
      {conversations.length === 0 ? (
        <div className={styles.empty}>What are you working on?</div>
      ) : (
        conversations.map((msg) => (
          <div 
            key={msg.id} 
            className={`${styles.messageItem} ${msg.role === 'user' ? styles.userMessage : styles.assistantMessage}`}
          >
            <div className={styles.content}>{msg.content}</div>
          </div>
        ))
      )}
      {isLoading && <div className={styles.loading}>Thinking...</div>}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;