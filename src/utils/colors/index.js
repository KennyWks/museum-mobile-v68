const mainColors = {
  dark1: '#030303',
  dark2: '#3d3c3c',
  dark3: 'rgba(0, 0, 0, 0.5)',
  dark4: '#bdbbbb',
  white1: '#F5E8E4',
  white2: '#F5E8E4',
  white3: '#262626',
  border1: '#F5E8E4',
  border2: '#F5C7A9',
  primary1: '#0B5ED8',
  success1: '#198754',
};

export const colors = {
  successOne: mainColors.success1,
  primaryOne: mainColors.primary1,
  dark: mainColors.dark1,
  midDark: mainColors.dark4,
  light: mainColors.white1,
  middleLight: mainColors.white3,
  secondary: mainColors.dark2,
  page: {
    background: mainColors.white2,
  },
  text: {
    default: mainColors.white1,
    secondary: mainColors.white3,
  },
  border: {
    default: mainColors.border1,
    secondary: mainColors.border2,
  },
  button: {
    primary: {
      background: '#D1512D',
      text: '#F5E8E4',
    },
    secondary: {
      background: 'black',
      text: 'white',
    },
  },
  loading: {
    background: mainColors.dark3,
    logo: mainColors.primary1,
  },
};
