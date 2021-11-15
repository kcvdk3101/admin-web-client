import { Category, ChilrenCategory } from "../../models";

export class Utilities {
  static convertDateString(date: string | Date) {
    return `${new Date(date).toLocaleDateString()}`;
  }

  static convertToCurrency(number: number) {
    return number.toLocaleString("it-IT");
  }

  static disablePastDay() {
    var dtToday = new Date();

    var month = (dtToday.getMonth() + 1) as any;
    var day = dtToday.getDate() as any;
    var year = dtToday.getFullYear();
    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();

    return year + "-" + month + "-" + day;
  }

  static sortByAlphabet(array: Array<Category>) {
    return [...array].sort(function compare(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  static fillCouponInformation(
    data: any,
    couponAttribute: any,
    isUnlimited: boolean,
    image: File | undefined
  ) {
    const amount = data.amount === undefined ? 0 : data.amount;
    const limit = data.limit === undefined ? 0 : data.limit;

    const formData = new FormData();
    formData.append("couponName", data.couponName);
    formData.append("couponType", couponAttribute.couponType);
    formData.append("description", data.description);
    formData.append("isUnlimited", JSON.stringify(isUnlimited));
    formData.append("modifier", data.modifier);
    formData.append("amount", amount);
    formData.append("unit", couponAttribute.unit);
    formData.append("limit", limit);
    formData.append("pointToAchieve", data.pointToAchieve);
    formData.append("startTime", data.startTime);
    formData.append("endTime", data.endTime);
    formData.append("files", image as Blob);

    return formData;
  }
}
