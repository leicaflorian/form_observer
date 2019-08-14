export default function(condition, ...messages) {
  if (condition) {
    console.log(...messages);
  }
}