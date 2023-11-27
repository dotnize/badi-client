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
  user?: User;
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
  user?: User;
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
  user1Id: number;
  user2Id: number;
  user1?: User;
  user2?: User;
  contractId: number | null;
  status: "pending" | "rejected" | "active" | "cancelled";
}

export interface TradeInventory {
  id: number;
  tradeGroupId: number;
  tradeGroup?: TradeGroup;
  senderId: number;
  sender?: User;
  receiverId: number;
  receiver?: User;
  inventoryId: number;
  inventory?: Inventory;
  totalQuantity: number;
  completedQuantity: number;
  isCompleted: boolean;
}

export interface TradeTransaction {
  id: number;
  description: string | null;
  tradeInventoryId: number;
  proofUrls: string[];
  quantity: number;
  timestamp: Date;
}

export interface ChatRoom {
  id: number;
  member1Id: number;
  member1?: User;
  member2Id: number;
  member2?: User;
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
