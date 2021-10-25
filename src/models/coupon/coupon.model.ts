export interface Coupon {
  couponName: string;
  couponType: string;
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
