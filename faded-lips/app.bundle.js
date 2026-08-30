(() => {
  var p = "/api/v1/user", c = class {
    constructor() {
      this.endpoint = p + "/me"
    }

    async fetch() {
      let e = await fetch(this.endpoint, {credentials: "same-origin"});
      if (!e.ok) throw location.href = "/", new Error("not authenticated");
      return e.json()
    }

    render(e, t) {
      e.innerHTML = "";
      let n = document.createElement("dl");
      [["Name", t.name], ["Title", t.title], ["Email", t.email], ["Username", t.username]].forEach(([l, u]) => {
        let s = document.createElement("dt");
        s.textContent = l;
        let a = document.createElement("dd");
        a.textContent = u || "\u2014", n.append(s, a)
      }), e.appendChild(n)
    }
  };
  var E = "/api/v1/admin", h = "principal", r = class {
    constructor() {
      this.endpoint = E + "/profile"
    }

    async fetch(e) {
      let t = this.endpoint + "?" + h + "=" + encodeURIComponent(e), n = await fetch(t, {credentials: "same-origin"});
      if (!n.ok) throw new Error("admin profile lookup failed: " + n.status);
      return n.json()
    }

    render(e, t) {
      e.innerHTML = "";
      let n = document.createElement("dl");
      [["Name", t.name], ["Title", t.title], ["Email", t.email], ["Username", t.username], ["Notes", t.secret]].forEach(([l, u]) => {
        let s = document.createElement("dt");
        s.textContent = l;
        let a = document.createElement("dd");
        a.textContent = u || "\u2014", n.append(s, a)
      }), e.appendChild(n)
    }
  };
  var f = "/api/v1/user/notifications", i = class {
    async list() {
      let e = await fetch(f, {credentials: "same-origin"});
      return e.ok ? (await e.json()).items : []
    }
  };
  var I = "/api/v1/audit/log", m = class {
    async tail(e) {
      let t = I + "?since=" + encodeURIComponent(e), n = await fetch(t, {credentials: "same-origin"});
      return n.ok ? (await n.json()).entries : []
    }
  };
  var g = "/api/v1/user/preferences", d = class {
    async load() {
      let e = await fetch(g, {credentials: "same-origin"});
      return e.ok ? e.json() : {}
    }
  };
  var w = [c, r, i, m, d];
  console.debug("[acme] modules registered:", w.length);
  (async () => {
    let e = await new c().fetch();
    document.getElementById("me-name").textContent = e.name, document.getElementById("me-title").textContent = e.title, document.getElementById("me-email").textContent = e.email, document.getElementById("me-username").textContent = e.username
  })();
  document.getElementById("logout")?.addEventListener("click", async () => {
    await fetch("/api/logout", {method: "POST", credentials: "same-origin"}), location.href = "/"
  });
})();
