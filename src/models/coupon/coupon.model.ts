export interface Coupon {
  name: string;
  type: "percentage" | "cash" | string;
  description?: string;
  modifier: number;
  amount: number;
  unit: string;
  usage: number;
  limit: number;
  pointAchieve: number;
  startTime: Date | string;
  endTime: Date | string;
  image: string;
}
