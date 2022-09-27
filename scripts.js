/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {}
const engine = "brave"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
  brave: "https://search.brave.com/search?q="
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"Kvx4CWbEiVlNmoQY","label":"anime","bookmarks":[{"id":"OfCq8JBeSf7b1daF","label":"zoro","url":"https://zoro.to/home"},{"id":"WRmE4peZKkBLvTZP","label":"shiro","url":"https://shiro.is/home"},{"id":"CSm4UAPC91SOGrWH","label":"9anime","url":"https://9anime.id/home"},{"id":"UucB37rrRzfcVrYf","label":"yugen","url":"https://yugen.to"}]},{"id":"kwoEBuxsSd6TZ9rl","label":"manga","bookmarks":[{"id":"4pn8TXmPSGAU0HAU","label":"mangareader","url":"https://mangareader.to/home"},{"id":"cdUKYPeVMT3txPXv","label":"mangadex","url":"https://mangadex.org"},{"id":"LXPtWnW6In3wq3ny","label":"manga4life","url":"https://manga4life.com"},{"id":"mPKVuRrxvW1ExZdl","label":"manhuaplus","url":"https://manhuaplus.com"}]},{"id":"oEoKZHPSINPdVVZv","label":"tracking","bookmarks":[{"id":"XCtMcUfVAwX5s3Oj","label":"anilist","url":"https://anilist.co/home"},{"id":"Wpm0r7tI84A6zFWB","label":"mal","url":"https://myanimelist.net"},{"id":"dRfcolSZ4OMLM9Y7","label":"simkl","url":"https://simkl.com/anime"},{"id":"SV3gWESlIJneMUyX","label":"kitsu","url":"https://kitsu.io"}]},{"id":"qSGC5i58LZYkUxCo","label":"socials","bookmarks":[{"id":"XGoWyNtQIXDnhgUM","label":"yt","url":"https://youtube.com"},{"id":"DUkSMDFU2wV4e6Ka","label":"dc","url":"https://discord.com/channels/@me"},{"id":"3aycfnFEJMEpZ9NS","label":"rd","url":"https://reddit.com"},{"id":"3kh9Q4FS7WkJZDJ3","label":"ig","url":"https://instagram.com"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
