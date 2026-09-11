const TYPES = {
  image: "img",
  video: "video",
  audio: "audio",
  script: "script",
}

const params = new URLSearchParams(location.search)
const url = params.get("url") || ""
const type = params.get("type") || "image"

document.getElementById("url-input").value = url

const radio = document.getElementById("t-" + type)
if (radio) radio.checked = true

if (url) {
  const el = document.createElement(TYPES[type])
  el.src = url
  el.controls = true
  document.getElementById("stage-empty").remove()
  document.getElementById("stage").appendChild(el)
}

document.getElementById("report").onsubmit = async (e) => {
  e.preventDefault()
  const msg = document.getElementById("report-msg")
  msg.textContent = "Sendingâ€¦"
  const res = await fetch("/report", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ url: document.getElementById("report-url").value }),
  })
  msg.textContent = res.ok ? "Moderation will open it shortly." : await res.text()
}
