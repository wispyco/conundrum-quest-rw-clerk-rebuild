export const jsonPretty = (obj) => {
  return <pre>{JSON.stringify(obj, null, 2)}</pre>
}
