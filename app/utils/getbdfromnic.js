// utils/nicUtils.js

export function getBirthdayFromNIC(nic) {
    const currentYearLastTwoDigits = parseInt(new Date().getFullYear().toString().slice(-2), 10);
  
    let year, dayOfYear;
  
    if (nic.length === 10) {
      // Old NIC format
      const yearPart = parseInt(nic.slice(0, 2), 10);
      if (yearPart > currentYearLastTwoDigits) {
        year = 1900 + yearPart;
      } else {
        year = 2000 + yearPart;
      }
      dayOfYear = parseInt(nic.slice(2, 5), 10);
  
    } else if (nic.length === 12) {
      // New NIC format
      year = parseInt(nic.slice(0, 4), 10);
      dayOfYear = parseInt(nic.slice(4, 7), 10);
  
    } else {
      throw new Error("Invalid NIC format");
    }
  
    // Adjust for females (day of year greater than 500)
    if (dayOfYear > 500) {
      dayOfYear -= 500;
    }
  
    // Calculate the birth date from the year and day of year
    const birthDate = new Date(year, 0); // January 1st of the year
    birthDate.setDate(dayOfYear);
  
    // Format as YYYY-MM-DD
    return birthDate.toISOString().slice(0, 10);
  }
  