export const generateIcsResponse = async (
  url: string,
  startNeedle: string,
): Promise<Response> => {
  const response = await (await fetch(url)).text()

  let pendingBuffer = ''
  let result = ''
  const lines = response.split('\n')

  const flushPendingBuffer = () => {
    result += pendingBuffer
    pendingBuffer = ''
  }

  const discardPendingBuffer = () => (pendingBuffer = '')

  const pushLineToBuffer = (line: string) => (pendingBuffer += line + '\n')

  let keepEvent = false
  for (const line of lines) {
    if (line === 'END:VEVENT') {
      if (keepEvent) {
        pushLineToBuffer(line)
        flushPendingBuffer()
      } else {
        discardPendingBuffer()
      }
      continue
    } else if (line === 'BEGIN:VEVENT') {
      flushPendingBuffer()
    } else if (line.startsWith('SUMMARY:')) {
      keepEvent = line.toLowerCase().startsWith(`summary:${startNeedle}`)
    }

    pushLineToBuffer(line)
  }
  flushPendingBuffer()

  return new Response(result, { headers: { 'Content-Type': 'text/calendar' } })
}
