export const UPDATE_THEME = 'UPDATE_THEME'

export const changeNavColor = (theme: any) => {
  return ({
    type: UPDATE_THEME,
    payload: {
      normal: theme.normal,
      active: theme.active,
    }
  })
}
