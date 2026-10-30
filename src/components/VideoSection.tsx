/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { TranslationDictionary } from '../utils/i18n.ts';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  FastForward,
  Rewind,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets.ts';

interface VideoSectionProps {
  t: TranslationDictionary;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ t }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.85);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(82);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [hasEnded, setHasEnded] = useState(false);

  const chapters = [
    { seconds: 0, timeStr: '0:00', label: 'Everyday household & garden needs' },
    { seconds: 15, timeStr: '0:15', label: '“What do you need? Describe it.”' },
    { seconds: 24, timeStr: '0:24', label: '2-minute posting with photos & dates' },
    { seconds: 29, timeStr: '0:29', label: 'Loqelo radar matches rated local pros' },
    { seconds: 39, timeStr: '0:39', label: 'Transparent price spread & quote comparison' },
    { seconds: 56, timeStr: '0:56', label: 'Contractor dashboard & 1-min bidding' },
    { seconds: 75, timeStr: '1:15', label: 'Everything your place needs (Feb 2027)' },
  ];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (hasEnded) {
      videoRef.current.currentTime = 0;
      setHasEnded(false);
    }
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasEnded(false);
      }).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && videoRef.current.volume === 0) {
      videoRef.current.volume = volume || 0.85;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    setCurrentTime(curr);

    // Update active chapter
    let activeIdx = 0;
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (curr >= chapters[i].seconds) {
        activeIdx = i;
        break;
      }
    }
    setActiveChapterIndex(activeIdx);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && Number.isFinite(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setHasEnded(true);
  };

  const seekToSeconds = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    setHasEnded(false);
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const skipSeconds = (delta: number) => {
    if (!videoRef.current) return;
    const target = Math.min(Math.max(0, videoRef.current.currentTime + delta), duration);
    videoRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const cyclePlaybackRate = () => {
    if (!videoRef.current) return;
    const rates = [1, 1.25, 1.5];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    const nextRate = rates[nextIdx];
    videoRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
      setCurrentTime(val);
      setHasEnded(false);
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="video-demo" className="py-16 sm:py-24 bg-white border-y border-[#E4EAE9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F3F3] text-[#077E88] text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.videoSection.kicker || 'PROMOTIONAL PREVIEW'}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0C2229]">
            {t.videoSection.title}
          </h2>
          <p className="text-sm sm:text-base text-[#3D5259] leading-relaxed">
            {t.videoSection.subtitle}
          </p>
        </div>

        {/* Video Player Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-black shadow-2xl border border-slate-800 group">
            
            {/* The Video Element */}
            <video
              ref={videoRef}
              src={getAssetUrl('/assets/aistudio/Loqelo_final_video_compressed_fafd7b79.mp4')}
              poster={getAssetUrl('/assets/aistudio/loqelo_video_poster.jpg')}
              className="w-full aspect-16/9 object-cover cursor-pointer block"
              preload="metadata"
              playsInline
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnded}
              onClick={togglePlay}
            >
              <source
                src={getAssetUrl('/assets/aistudio/Loqelo_final_video_compressed_fafd7b79.mp4')}
                type="video/mp4"
              />
              Your browser does not support HTML5 video.
            </video>

            {/* Play Button Overlay when Paused */}
            {!isPlaying && !hasEnded && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-opacity group-hover:bg-black/30"
              >
                <div className="w-20 h-20 rounded-full bg-[#077E88] text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-[#06676f] transition-all active:scale-95 pl-1 ring-4 ring-white/30">
                  <Play className="w-9 h-9 fill-white" />
                </div>
                <p className="mt-4 text-xs font-bold text-white tracking-wide uppercase bg-black/60 px-3.5 py-1 rounded-full backdrop-blur-sm">
                  Click to play preview
                </p>
              </div>
            )}

            {/* Replay Overlay when Video Ends */}
            {hasEnded && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-opacity"
              >
                <div className="w-20 h-20 rounded-full bg-[#2E9A77] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-95 ring-4 ring-white/30">
                  <RotateCcw className="w-9 h-9" />
                </div>
                <p className="mt-4 text-sm font-semibold text-white tracking-wide">
                  Watch again · Replay from beginning
                </p>
              </div>
            )}

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 sm:p-5 space-y-2 opacity-95 group-hover:opacity-100 transition-opacity">
              
              {/* Progress Slider */}
              <div className="relative w-full flex items-center">
                <input
                  type="range"
                  min="0"
                  max={duration || 82}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeekChange}
                  className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#65C8A6]"
                  aria-label="Video scrubber"
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-white text-xs pt-1">
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="p-1.5 hover:text-[#65C8A6] transition-colors rounded hover:bg-white/10"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  {/* Skip backward 10s */}
                  <button
                    onClick={() => skipSeconds(-10)}
                    className="p-1.5 hover:text-[#65C8A6] transition-colors rounded hover:bg-white/10 hidden sm:inline-flex"
                    aria-label="Rewind 10 seconds"
                    title="-10s"
                  >
                    <Rewind className="w-4 h-4" />
                  </button>

                  {/* Skip forward 10s */}
                  <button
                    onClick={() => skipSeconds(10)}
                    className="p-1.5 hover:text-[#65C8A6] transition-colors rounded hover:bg-white/10 hidden sm:inline-flex"
                    aria-label="Skip forward 10 seconds"
                    title="+10s"
                  >
                    <FastForward className="w-4 h-4" />
                  </button>

                  {/* Volume / Mute */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={toggleMute}
                      className="p-1.5 hover:text-[#65C8A6] transition-colors rounded hover:bg-white/10"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-red-300" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-12 sm:w-16 h-1 bg-white/30 rounded appearance-none cursor-pointer accent-[#65C8A6] hidden sm:inline-block"
                      aria-label="Volume slider"
                    />
                  </div>

                  {/* Time Counter */}
                  <span className="font-mono text-[11px] text-slate-300 tabular-nums">
                    {formatTime(currentTime)} / {formatTime(duration || 82)}
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Playback rate */}
                  <button
                    onClick={cyclePlaybackRate}
                    className="px-2 py-0.5 rounded bg-white/15 hover:bg-white/25 text-[11px] font-mono font-semibold transition-colors"
                    title="Playback speed"
                  >
                    {playbackRate}x
                  </button>

                  <span className="hidden md:inline-block px-2 py-0.5 rounded bg-[#077E88]/40 border border-[#077E88]/60 text-[10px] font-semibold tracking-wider uppercase text-teal-200">
                    Loqelo 1080p
                  </span>

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 hover:text-[#65C8A6] transition-colors rounded hover:bg-white/10"
                    aria-label="Toggle Fullscreen"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chapter Navigator */}
          <div className="mt-8 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-xs font-bold text-[#0C2229] uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#077E88]" />
                Video Highlights & Key Moments
              </span>
              <span className="text-xs text-[#76898E]">
                Click any milestone to jump directly to that scene
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {chapters.map((ch, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => seekToSeconds(ch.seconds)}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#E7F3F3] border-[#077E88] shadow-sm ring-1 ring-[#077E88]'
                        : 'bg-white hover:bg-[#F4F7F6] border-[#E4EAE9]'
                    }`}
                  >
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded shrink-0 ${
                        isActive
                          ? 'bg-[#077E88] text-white'
                          : 'bg-[#F4F7F6] text-[#3D5259]'
                      }`}
                    >
                      {ch.timeStr}
                    </span>
                    <span className="text-xs font-medium text-[#0C2229] leading-tight">
                      {ch.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
