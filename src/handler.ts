import { generateHomepageResponse } from './homepage'
import { generateIcsResponse } from './ics-generator'

export const handleRequest = async (request: Request): Promise<Response> => {
  const requestUrl = new URL(request.url)

  switch (requestUrl.pathname) {
    case '/':
      return generateHomepageResponse()
    case '/ics':
      const opsgenieUrl = new URL(requestUrl.searchParams.get('opsgenieUrl')!)
      opsgenieUrl.protocol = 'https'
      if (!isOpsgenieUrlValid(opsgenieUrl)) {
        return new Response('Invalid opsgenie URL', { status: 404 })
      }

      const startNeedle = requestUrl.searchParams
        .get('summaryFilter')!
        .toLowerCase()

      return generateIcsResponse(opsgenieUrl.toString(), startNeedle)
    default:
      return new Response(null, { status: 404 })
  }
}

const isOpsgenieUrlValid = (url: URL) => {
  return (
    url.hostname.match('^[a-z0-9]+.app.opsgenie.com') &&
    url.pathname === '/webapi/webcal/getRecentSchedule' &&
    !!url.searchParams.get('webcalToken') &&
    url.searchParams.get('scheduleId')
  )
}
