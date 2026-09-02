# MyZubster release readiness — 2 settembre 2026

## Stato verificato

- Profilo Zubster integrato nel frontend React.
- Rotte `/profile`, `/profilo` e `/zubster` collegate dall'app principale.
- Layout profilo responsive con breakpoint mobile/tablet a 900px.
- Link pubblico al repository GitHub presente nel profilo.
- Artwork profilo collegato al file conservato in Google Drive.
- Smoke test automatico aggiunto per verificare rendering, link GitHub, CTA metaverso e artwork.
- Configurazione Vercel SPA presente (`frontend/vercel.json`).
- Workflow CI presente e configurato per install, test e build di backend/frontend.
- Workflow deploy Vercel presente e dipendente dal secret `VERCEL_TOKEN`.

## Gate ancora da provare in ambiente pubblico

Questi punti richiedono evidenza runtime esterna e non vanno dichiarati completati senza una run o un test reale:

- GitHub Actions deve produrre una run verde sul commit corrente.
- Vercel deve confermare il deploy dell'ultimo commit su `main`.
- `https://www.myzubster.com/profile` deve essere aperto e verificato su browser reale.
- Verifica visuale su smartphone reale: nessun overflow, CTA cliccabili, artwork caricato correttamente.
- Verifica login + ingresso nel metaverso su ambiente pubblico.

## Criterio "pronto da mostrare"

Il progetto può essere presentato come MVP/demo quando il codice è pubblico e il profilo è integrato. Per dichiararlo "deploy verificato" servono invece evidenze delle run CI/deploy e un controllo runtime della pagina pubblica.
