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
    // birthDate.setDate(dayOfYear);

    if (dayOfYear > 400) {
      dayOfYear = dayOfYear - 500;
    }
    dayOfYear += 1;

    if (dayOfYear <= 31) {
      birthDate.setMonth(0);
      birthDate.setDate(dayOfYear);
    } else if (dayOfYear <= 60) {
      birthDate.setMonth(1);
      birthDate.setDate(dayOfYear - 31);
    } else if (dayOfYear <= 91) {
      birthDate.setMonth(2);
      birthDate.setDate(dayOfYear - 60);
    }
    else if (dayOfYear <= 121) {
      birthDate.setMonth(3);
      birthDate.setDate(dayOfYear - 91);
    }
    else if (dayOfYear <= 152) {
      birthDate.setMonth(4);
      birthDate.setDate(dayOfYear - 121);
    }
    else if (dayOfYear <= 182) {
      birthDate.setMonth(5);
      birthDate.setDate(dayOfYear - 152);
    }
    else if (dayOfYear <= 213) {
      birthDate.setMonth(6);
      birthDate.setDate(dayOfYear - 182);
    }
    else if (dayOfYear <= 244) {
      birthDate.setMonth(7);
      birthDate.setDate(dayOfYear - 213);
    }
    else if (dayOfYear <= 274) {
      birthDate.setMonth(8);
      birthDate.setDate(dayOfYear - 244);
    }
    else if (dayOfYear <= 305) {
      birthDate.setMonth(9);
      birthDate.setDate(dayOfYear - 274);
    }
    else if (dayOfYear <= 335) {
      birthDate.setMonth(10);
      birthDate.setDate(dayOfYear - 305);
    }
    else if (dayOfYear <= 366) {
      birthDate.setMonth(11);
      birthDate.setDate(dayOfYear - 335);
    }
  
    // Format as YYYY-MM-DD
    return birthDate.toISOString().slice(0, 10);
  }
  