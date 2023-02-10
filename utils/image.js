export const getUserAvatar = (user) => {
  if (user?.avatar) return user.avatar;

  return 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png';
};
