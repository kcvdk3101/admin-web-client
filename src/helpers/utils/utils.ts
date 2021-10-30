export class Utilities {
  static convertDateString(date: string | Date) {
    return `${new Date(date).toLocaleDateString()}`;
  }

  static convertToCurrency(number: number) {
    return number.toLocaleString("it-IT");
  }

  static fillCouponInformation(
    data: any,
    couponAttribute: any,
    isUnlimited: boolean,
    image: File | undefined
  ) {
    const formData = new FormData();
    formData.append("couponName", data.couponName);
    formData.append("couponType", couponAttribute.couponType);
    formData.append("description", data.description);
    formData.append("isUnlimited", JSON.stringify(isUnlimited));
    formData.append("modifier", data.modifier);
    formData.append("amount", data.amount);
    formData.append("unit", couponAttribute.unit);
    formData.append("limit", data.limit);
    formData.append("pointToAchieve", data.pointToAchieve);
    formData.append("startTime", data.startTime);
    formData.append("endTime", data.endTime);
    formData.append("files", image as Blob);

    return formData;
  }
}
