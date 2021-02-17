export const ratingText = (rating) => {
  if (rating < 1) {
    return "Very Bad";
  } else if (rating < 2) {
    return "Okay";
  } else if (rating < 3) {
    return "Good";
  } else if (rating < 4) {
    return "Very Good";
  } else {
    return "Excellent";
  }
};
