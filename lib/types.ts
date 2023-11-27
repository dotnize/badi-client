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
  userId: number;
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
  userId: number;
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
  user1Id: number | null;
  user2Id: number;
  contractId: number | null;
  status: string;
}

export interface TradeInventory {
  id: number;
  tradeGroupId: number;
  senderId: number;
  receiverId: number;
  inventoryId: number;
  totalQuantity: number;
  completedQuantity: number;
  isCompleted: boolean;
}

export interface TradeTransaction {
  id: number;
  description: string | null;
  tradeInventoryId: number;
  proofUrls: unknown;
  quantity: number;
  timestamp: Date;
}

export interface ChatRoom {
  id: number;
  member1Id: number;
  member2Id: number;
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
