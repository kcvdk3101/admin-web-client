export class Utilities {
  static convertDateString(date: string | Date) {
    return `${new Date(date).toLocaleDateString()}`;
  }

  static convertToCurrency(number: number) {
    return number.toLocaleString("it-IT");
  }

  static disablePastDate() {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  }
}
