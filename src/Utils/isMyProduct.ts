export default function isMyProduct(writerId: number, myId: number) {
  if (writerId === myId) {
    return true;
  }
  return false;
}
