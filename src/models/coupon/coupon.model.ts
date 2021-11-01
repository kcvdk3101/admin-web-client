import { Image } from "..";

export interface Coupon {
  id: string;
  couponName: string;
  couponType: string;
  description?: string;
  isUnlimited: boolean;
  modifier: number;
  amount: number;
  unit: string;
  usage: number;
  limit: number;
  pointToAchieve: number;
  startTime: Date | string;
  endTime: Date | string;
  image: Image[];
}
