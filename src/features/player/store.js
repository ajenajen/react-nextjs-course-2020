import { observable, action } from 'mobx'
import { convertSecondsToMinutes } from '@features/player/utilities'

export default class PlayerStore {
  @observable
  nowPlaying = {
    playing: false,
    title: 'Mean It',
    subTitle: 'Lauv,LANY',
    image: 'https://i.scdn.co/image/cf9073efe211bedef7a447fad6d50566f81287b5',
    url:
      'https://p.scdn.co/mp3-preview/03c8dc4ff8254b9ef20949f6562d5e37941bdb06?cid=f73e4bb6a4bc469e8731b79fbbe5eafd',
    order: 0,
  }

  @observable
  progressBar = {
    timeElapsed: '0:00',
    progress: 0.0,
    duration: '0:30',
  }

  @observable
  playerInst = null

  @observable
  volume = {
    muted: false,
    level: 0.8,
    prelevel: 0.8,
  }

  @observable
  queueList = []

  @observable
  currentTrack = 0

  @observable
  isRepeat = false

  @action
  play(track) {
    const { previewUrl, name, artist, image, order } = track

    this.nowPlaying.playing = true
    this.nowPlaying.title = name
    this.nowPlaying.subTitle = artist
    this.nowPlaying.image = image
    this.nowPlaying.url = previewUrl
    this.nowPlaying.order = order

    // console.log('Now Playing order: ', this.nowPlaying.order)
  }

  @action
  togglePlay() {
    this.nowPlaying.playing = !this.nowPlaying.playing
  }

  @action
  addtoQueue(item) {
    this.queueList.push(item)
    // console.log('Queue: ', this.queueList)
  }

  @action
  addListToQueue(playlist) {
    playlist.map((track, i) => this.queueList.push(track))
    this.play(this.queueList[0])
    // console.log('addListToQueue')
  }

  @action
  nextTrack(currentQueue) {
    const nextQueue = currentQueue + 1
    const nextTrack = this.queueList.filter(track => track.order === nextQueue)
    this.play(nextTrack[0])
    // this.play(this.queueList[nextQueue])
    // console.log('next > now playing track :', this.queueList[nextQueue])
  }

  @action
  updateProgressBar(song) {
    const { playedSeconds, played, loadedSeconds } = song

    this.progressBar.timeElapsed = convertSecondsToMinutes(playedSeconds)
    this.progressBar.progress = played
    this.progressBar.duration = convertSecondsToMinutes(loadedSeconds)

    // console.log('onProgress', song)
  }

  @action
  handleClickBar(progresstime) {
    this.progressBar.progress = progresstime
    this.playerInst.seekTo(progresstime)
    // console.log('handleClickBar', progresstime)
  }

  @action
  setPlayerInst(playerInst) {
    this.playerInst = playerInst
  }

  @action
  handleSoundBar(level) {
    this.volume = {
      muted: false,
      level: parseFloat(level.target.value),
      prelevel: parseFloat(level.target.value),
    }
    // console.log('handleSoundBar', level)
  }
  @action
  toggleMuted() {
    this.volume.muted = !this.volume.muted
  }

  @action
  setRepeat() {
    this.isRepeat = !this.isRepeat
    console.log('toggle repeat')
  }
}
