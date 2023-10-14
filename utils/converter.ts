const formatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
});

export const getCurrentTime = () => {
  return formatter.format(new Date());
}
