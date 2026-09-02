import React from 'react';
import './ProfilePage.css';

const PROFILE_IMAGE = 'https://drive.google.com/uc?export=view&id=1WWko8pFKr4DItHNSzFJ06QgqW_CqbOC3';
const PROFILE_DRIVE = 'https://drive.google.com/file/d/1WWko8pFKr4DItHNSzFJ06QgqW_CqbOC3/view';
const PROJECT_GITHUB = 'https://github.com/nicolaususnicola-lgtm/myzubster';

const interests = ['🎵 Musica', '🎨 Arte Digitale', '👕 Moda', '⬡ Web3', '✈️ Viaggi', '🏋️ Fitness', '📷 Fotografia'];

export default function ProfilePage() {
  return (
    <main className="profile-page">
      <section className="profile-hero" aria-labelledby="profile-title">
        <div className="profile-copy">
          <div className="profile-kicker">MYZUBSTER · IDENTITÀ DIGITALE · DEMO</div>
          <h1 id="profile-title">Zubster <span aria-label="profilo digitale">✦</span></h1>
          <p className="profile-handle">@zubster · Profilo metaverso MyZubster</p>
          <p className="profile-tagline">Creo. Connetto. Vivo il Metaverso. ✨</p>

          <div className="profile-stats" aria-label="Stato del profilo demo">
            <div><span>Concept</span><strong>Pronto</strong></div>
            <div><span>UI</span><strong>Integrata</strong></div>
            <div><span>Metaverso</span><strong>Attivo</strong></div>
            <div><span>Codice</span><strong>Pubblico</strong></div>
          </div>

          <section className="profile-about">
            <h2>Su di me</h2>
            <p>
              Creativo, visionario e sempre alla ricerca di nuove vibrazioni. Costruisco esperienze,
              connessioni e progetti che uniscono persone, creatività e tecnologia.
            </p>
          </section>

          <div className="profile-interests">
            {interests.map((interest) => <span key={interest}>{interest}</span>)}
          </div>

          <blockquote>“Non seguo il futuro. Lo creo.” <cite>— Zubster</cite></blockquote>

          <div className="profile-actions">
            <a className="profile-primary" href="/">Entra nel metaverso</a>
            <a className="profile-secondary" href={PROJECT_GITHUB} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a className="profile-secondary" href={PROFILE_DRIVE} target="_blank" rel="noreferrer">Apri artwork ↗</a>
          </div>
        </div>

        <div className="profile-art-wrap">
          <div className="profile-orbit" aria-hidden="true" />
          <img
            className="profile-art"
            src={PROFILE_IMAGE}
            alt="Artwork del profilo metaverso Zubster"
          />
          <div className="profile-art-badge">MYZUBSTER PROFILE · INTEGRATO</div>
        </div>
      </section>
    </main>
  );
}
