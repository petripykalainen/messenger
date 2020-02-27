export interface ConversationData {
  start_date: string,
  end_date: string,
  total_conversation_count: number,
  total_user_message_count: number,
  total_visitor_message_count: number
  by_date: Conversation[]
}

export interface Conversation {
  date: string,
  conversation_count: number,
  missed_chat_count: number,
  visitors_with_conversation_count: number
}
