export const getUserAvatar = (user) => {
  if (user?.avatar || user) return user.avatar || user;

  return 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png';
};

export const getCoverImage = (user) => {
  if (user?.cover_image || user) return user.cover_image || user;

  return 'https://tokystorage.s3.amazonaws.com/images/default-cover.png';
};
