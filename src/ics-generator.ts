import ICAL from 'ical.js'

export const generateIcsResponse = async (
  url: string,
  startNeedle: string,
): Promise<Response> => {
  const response = await (await fetch(url)).text()

  const jcalData = ICAL.parse(response)
  const vCalendar = new ICAL.Component(jcalData)

  const events = vCalendar.getAllSubcomponents('vevent')
  const eventsToRemove = events.filter(
    (event: any) =>
      !event
        .getFirstPropertyValue('summary')
        .toLowerCase()
        .startsWith(startNeedle),
  )

  for (const eventToRemove of eventsToRemove) {
    vCalendar.removeSubcomponent(eventToRemove)
  }

  const result = ICAL.stringify(jcalData)

  return new Response(result, { headers: { 'Content-Type': 'text/calendar' } })
}
