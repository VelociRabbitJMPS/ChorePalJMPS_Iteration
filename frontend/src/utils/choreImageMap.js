const choreImageMap = {
  dishes: 'dishwashing.png',
  laundry: 'laundry.png',
  trash: 'take-out-trash.jpeg',
  vacuum: 'vacuum.jpeg',
  homework: 'do-homework.jpeg',
  sweeping: 'sweep-floor.png',
  bed: 'make-bed.jpeg',
  cleaning: 'clean-room.jpeg',
  dog: 'walk-dog.jpeg',
  groceries: 'groceries.png',
  shopping: 'groceries.png',
  carwash: 'car-wash.jpeg',
};

export const DEFAULT_IMAGE = 'clean-room.jpeg';

/**
 * Normalizes chore names to match keywords.
 * Tries partial keyword match from the map.
 */
export const getImageFilenameForChore = (choreName) => {
  const normalized = choreName.toLowerCase();

  for (const keyword in choreImageMap) {
    if (normalized.includes(keyword)) {
      return choreImageMap[keyword];
    }
  }

  // Optional: match using synonyms or common patterns
  if (normalized.includes('table')) return 'clean-room.png';
  if (normalized.includes('floor')) return 'sweep-floor.png';
  if (normalized.includes('bed')) return 'make-bed.png';
  if (normalized.includes('car')) return 'car-wash.jpeg';
  if (normalized.includes('poop')) return 'clean-room.jpeg';
  if (normalized.includes('toilet')) return 'clean-room.jpeg';

  return DEFAULT_IMAGE;
};

// // src/utils/choreImageMap.js

// const choreImageMap = {
//   dishes: 'dishwasing.png',
//   laundry: 'laundry.png',
//   trash: 'trash.jpeg',
//   vacuum: 'vacuum.jpeg',
//   homework: 'homework.jpeg',
//   sweeping: 'sweeping.png',
//   bed: 'bedmaking.jpeg',
//   cleaning: 'cleaning.jpeg',
//   dog: 'dogwalking.jpeg',
//   walk: 'dogwalking.jpeg',
//   car: 'carwash.jpeg',
//   carwash: 'carwash.jpeg',
// };

// export const DEFAULT_IMAGE = 'cleaning.jpeg';

// export const getImageFilenameForChore = (choreName) => {
//   const lower = choreName.toLowerCase();
//   for (const keyword in choreImageMap) {
//     if (lower.includes(keyword)) {
//       return choreImageMap[keyword];
//     }
//   }
//   return DEFAULT_IMAGE;
// };
