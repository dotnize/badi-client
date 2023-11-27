export interface User {
  id: number;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string | null;
  avatarUrl: string | null;
  location: string;
  verified: number;
}

export interface Inventory {
  id: number;
  name: string;
  user: User | number;
  type: "item" | "service";
  keywords: string[];
  location: string | null;
  description: string;
  imageUrls: string[];
  preferredOffer: string | null;
}

export interface Wish {
  id: number;
  name: string;
  user: User | number;
  type: "item" | "service";
  keywords: string[];
  description: string;
  imageUrls: string[];
}

export interface Contract {
  id: number;
  description: string;
  documentUrls: string[];
}

export interface TradeGroup {
  id: number;
  user1: User | number;
  user2: User | number;
  contractId: number | null;
  status: "pending" | "rejected" | "active" | "cancelled";
}

export interface TradeInventory {
  id: number;
  tradeGroup: TradeGroup | number;
  sender: User | number;
  receiver: User | number;
  inventory: Inventory | number;
  totalQuantity: number;
  completedQuantity: number;
  isCompleted: boolean;
}

export interface TradeTransaction {
  id: number;
  description: string | null;
  tradeInventory: number;
  proofUrls: string[];
  quantity: number;
  timestamp: Date;
}

export interface ChatRoom {
  id: number;
  member1: User | number;
  member2: User | number;
}

export interface ChatMessage {
  id: number;
  senderId: number;
  timestamp: Date;
  chatRoomId: number;
  content: string;
}

export interface Notification {
  id: number;
  userId: number;
  type: string;
  timestamp: Date;
  content: any; // temporary, klarohon pa tani
  isRead: boolean;
}
