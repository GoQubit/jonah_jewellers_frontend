export function truncateId(id: string, length: number = 8): string {
  if (!id) return ""
  if (id.length <= length) return id
  return `${id.substring(0, length)}...${id.substring(id.length - 4)}`
}
