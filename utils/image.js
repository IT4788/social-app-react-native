export const getUserAvatar = (user) => {
  if (user?.avatar) return user.avatar;

  if (typeof user === 'string' && user) return user;
  return 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png';
};

export const getCoverImage = (user) => {
  // if (typeof user === 'object') {
  if (user?.cover_image) return user.cover_image;
  // }
  if (typeof user === 'string' && user) return user;
  return 'https://tokystorage.s3.amazonaws.com/images/default-cover.png';
};
