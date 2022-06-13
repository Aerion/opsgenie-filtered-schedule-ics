export const generateHomepageResponse = (): Response =>
  new Response(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Opsgenie ics filterer</title>
        <link rel="stylesheet" href="https://unpkg.com/mvp.css" />
      </head>
      <body>
        <header>
          <h1>Opsgenie ics filterer</h1>
          <p>Filter an opsgenie schedule on yourself</p>
          <p>
            <i
              >Lost? Checkout
              <a href="https://github.com/Aerion/opsgenie-filtered-schedule-ics"
                >README.md</a
              >
              for the detailed instructions</i
            >
          </p>
        </header>

        <main style="padding-top: 0px">
          <section>
            <form>
              <label for="link">Opsgenie schedule link</label>
              <input
                type="text"
                name="link"
                id="link"
                placeholder="webcal://foobar.app.opsgenie.com/webapi/webcal/getRecentSchedule?webcalToken=XXXXXXXX&scheduleId=yyyyyyyy"
                autocomplete="off"
                required
              />
              <label for="user">Opsgenie username</label>
              <input
                type="text"
                name="user"
                id="user"
                placeholder="John"
                autocomplete="off"
                required
              />
              <button>Generate ICS link</button>
            </form>
          </section>
          <section id="result-container" hidden>
            <p>
              Copy this <a id="result-link">ics link</a> to get the following ICS calendar:
              <code id="result-link-code"></code>
            </p>
            <pre><samp id="result-ics-container"></samp></pre>
          </section>
        </main>
        <footer>
          <section>
            <a href="https://github.com/Aerion/opsgenie-filtered-schedule-ics">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="16"
                height="16"
                style="vertical-align: middle; margin-right: 4px"
              >
                <path
                  style="fill: var(--color-link)"
                  fill-rule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                ></path></svg
              >Aerion/opsgenie-filtered-schedule-ics</a
            >
          </section>
        </footer>
      </body>
      <script>
        const resultContainer = document.querySelector("#result-container");
        const resultLink = document.querySelector("#result-link");
        const resultLinkCode = document.querySelector("#result-link-code");
        const resultIcs = document.querySelector("#result-ics-container");
        const submitBtn = document.querySelector("button");
        const form = document.querySelector("form");
        const linkInput = document.querySelector("#link");
        const userInput = document.querySelector("#user");
        const handleSubmit = async (evt) => {
          evt.preventDefault();
          resultContainer.setAttribute("hidden", "true");
          submitBtn.setAttribute("disabled", "true");

          const url = \`https://opsgenie-filtered-schedule-ics.aerion.workers.dev/ics?opsgenieUrl=\${encodeURIComponent(
            linkInput.value
          )}&summaryFilter=\${encodeURIComponent(userInput.value)}\`;
          const response = await fetch(url);
          const icsResult = await response.text();

          resultIcs.innerText = icsResult;
          resultLink.href = url;
          resultLinkCode.innerText = url;

          resultContainer.removeAttribute("hidden");
          submitBtn.removeAttribute("disabled");
        };
        form.addEventListener("submit", handleSubmit);
      </script>
    </html>
`,
    { headers: { 'Content-Type': 'text/html' } },
  )
