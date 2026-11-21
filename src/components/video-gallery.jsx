import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { useInView } from 'motion/react'
import { ScrollControls } from './scroll-controls'

const videos = [
  {
    title: '4-function edge bander and 3200 mm panel saw',
    url: 'https://www.facebook.com/reel/697343733414076/',
    aspectRatio: 9 / 16,
    poster: '/images/products/sliding-table-panel-saw-3200/sliding-table-panel-saw-3200-800w.webp',
  },
  {
    title: 'Olimpia machinery launch teaser',
    url: 'https://www.facebook.com/reel/1469711490903605/',
    aspectRatio: 16 / 9,
    poster: '/images/banners/02-machinery-banner-768w.webp',
  },
  {
    title: '4-in-1 edge banding machine',
    url: 'https://www.facebook.com/SRIKANTHAENTERPRISES/videos/1767072017280289/',
    aspectRatio: 3 / 4,
    poster: '/images/products/four-function-edge-bander/four-function-edge-bander-800w.webp',
  },
]

let facebookSdkRequest

function loadFacebookSdk() {
  if (!facebookSdkRequest) {
    facebookSdkRequest = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=0&version=v27.0'
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => {
        script.remove()
        facebookSdkRequest = undefined
        reject(new Error('Facebook video SDK failed to load'))
      }
      document.head.append(script)
    })
  }
  return facebookSdkRequest.then(() => window.FB)
}

function VideoCard({ id, title, url, aspectRatio, poster, player }) {
  const preview = useRef(null)
  const hasEnteredView = useInView(preview, { once: true, amount: 0.35 })
  const [directPlayer, setDirectPlayer] = useState(false)
  const [directLoaded, setDirectLoaded] = useState(false)
  const showPoster = directPlayer ? !directLoaded : !player

  useEffect(() => {
    if (!player || !hasEnteredView || directPlayer) return
    player.mute()
    player.play()
  }, [directPlayer, hasEnteredView, player])

  return (
    <article className="video-card">
      <div className="video-player" ref={preview} style={{ '--video-aspect-ratio': aspectRatio }}>
        <div className="video-embed" role="group" aria-label={title}>
          {directPlayer ? (
            <iframe
              title={title}
              src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=true`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              onLoad={() => setDirectLoaded(true)}
            />
          ) : (
            <div id={id} className="fb-video" data-href={url} data-show-text="false" data-allowfullscreen="true" data-lazy="true" />
          )}
          {showPoster && (
            <div className="video-poster">
              <img src={poster} alt="" loading="lazy" />
              {directPlayer ? (
                <span className="video-loading" role="status">Loading video…</span>
              ) : (
                <button type="button" className="button button-primary" aria-label={`Load video, ${title}`} onClick={() => setDirectPlayer(true)}>
                  <Play size={18} aria-hidden="true" /> Load video
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="video-card-copy"><h3 id={`${id}-title`}>{title}</h3></div>
    </article>
  )
}

export function VideoGallery() {
  const row = useRef(null)
  const shouldPreparePlayers = useInView(row, { once: true, margin: '400px 0px' })
  const [players, setPlayers] = useState({})

  useEffect(() => {
    if (!shouldPreparePlayers) return
    const element = row.current
    let sdk
    let mounted = true

    function registerPlayer({ type, id, instance }) {
      if (!mounted || type !== 'video') return
      const playerElement = document.getElementById(id)
      if (!element.contains(playerElement)) return
      const title = document.getElementById(`${id}-title`)
      playerElement.querySelector('iframe')?.setAttribute('title', title.textContent)
      setPlayers(previous => ({ ...previous, [id]: instance }))
    }

    loadFacebookSdk().then(facebook => {
      if (!mounted) return
      facebook.Event.subscribe('xfbml.ready', registerPlayer)
      sdk = facebook
      sdk.XFBML.parse(element)
    }).catch(() => { /* The preview can open the direct player while the SDK is unavailable. */ })

    return () => {
      mounted = false
      if (sdk) window.FB?.Event.unsubscribe('xfbml.ready', registerPlayer)
    }
  }, [shouldPreparePlayers])

  return (
    <section className="home-videos" aria-labelledby="videos-heading">
      <div className="scroll-rail-heading">
        <h2 id="videos-heading">Videos</h2>
        <ScrollControls viewport={row} controls="video-rail" label="videos" />
      </div>
      <div id="video-rail" className="scroll-rail video-row" ref={row} role="group" aria-label="Scrollable videos" tabIndex={0}>
        {videos.map((video, index) => {
          const id = `homepage-video-${index + 1}`
          return <VideoCard key={video.url} id={id} {...video} player={players[id]} />
        })}
      </div>
    </section>
  )
}
