
/**
 * Get a list of invalid credit cards from a list of credit cards
 * @param creditCardNumbers A list of credit card numbers
 * @return A list of invalid credit card numbers
 */
function findInvalidCards(creditCardNumbers: Array<Array<number>>): Array<Array<number>> {
  const invalidCards = creditCardNumbers.filter(
    (creditCard) => !validateCred(creditCard)
  );
  return invalidCards;
}

/**
 * Validate a credit card number using Luhn algorithm/formula
 * @param creditCard A credit card number
 * @return true if the credit card is valid 
 */
function validateCred(creditCard: Array<number>): Boolean {
  const digits = creditCard.length;
  let doubleEveryOther = [];

  // Step 1: Starting from the farthest digit to the right, iterate to the left
  for (let i = 0; i < digits; i++) {
    const digitFromRight = creditCard[digits - 1 - i];
    // console.log(digitFromRight); // for testing

    // Step 2: As you iterate to the left, every other digit is doubled
    if (i % 2 === 0) {
      doubleEveryOther.push(digitFromRight);
    } else {
      // If the number is greater than 9 after doubling, subtract 9 from its value.
      const doubleDigit = digitFromRight * 2;
      doubleEveryOther.push(doubleDigit > 9 ? doubleDigit - 9 : doubleDigit);
    }
  }
  // console.log(doubleEveryOther); // for testing

  // Step 3: Sum up all the digits in the credit card number.
  const sumDigits = doubleEveryOther.reduce((acc, curr) => acc + curr);

  // Step 4: If the sum modulo 10 is 0 then the number is valid, otherwise, it's invalid
  return sumDigits % 10 === 0;
}

/**
 * Given invalid credit card numbers, return a list of the credit card's corresponding companies 
 * @param invalidNumbers A list of invalid credit card numbers
 * @return A list of unique credit card companies
 */
function idInvalidCardCompanies(invalidNumbers: Array<Array<number>>): Array<String>{
  const cardCompanies = {
    3: "Amex (American Express)",
    4: "Visa",
    5: "Mastercard",
    6: "Discover",
  };

  let invalidCardCompanies: Array<String>;
  invalidCardCompanies = invalidNumbers.map((number) => {
    const firstDigit = number[0].toString();
    return firstDigit in cardCompanies
      ? cardCompanies[firstDigit]
      : `Company not found`;
  });
  //console.log(invalidCardCompanies) // for testing

  invalidCardCompanies = Array.from(new Set(invalidCardCompanies));
  return invalidCardCompanies;
}

