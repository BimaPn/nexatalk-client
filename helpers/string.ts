export function isChatPath(path:string) {
  const regexPattern = /^\/chat(\/.*)+$/;
  return regexPattern.test(path);
}

