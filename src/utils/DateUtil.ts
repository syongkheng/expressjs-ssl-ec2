export namespace DateUtil {


  export function getCurrentDateObjectGmt8(): Date {
    const currentDate = new Date();
    const offsetInHours = 8;
    const offsetInMilliseconds = offsetInHours * 60 * 60 * 1000;
    const gmt8Date = new Date(currentDate.getTime() + offsetInMilliseconds);
    return gmt8Date;
  }

  export function formatDateToYYYYMMDDHHMMSS(dateToFormat: Date): string {
    const year = dateToFormat.getFullYear();
    const month = ('0' + (dateToFormat.getMonth() + 1)).slice(-2);
    const day = ('0' + dateToFormat.getDate()).slice(-2);
    const hours = ('0' + dateToFormat.getHours()).slice(-2);
    const minutes = ('0' + dateToFormat.getMinutes()).slice(-2);
    const seconds = ('0' + dateToFormat.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}