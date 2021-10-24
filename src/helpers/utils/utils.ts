export class Utilities {
  static convertDateString(date: string | Date) {
    return `${new Date(date).toLocaleDateString()}`;
  }
}
