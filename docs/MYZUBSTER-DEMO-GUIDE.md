# MyZubster — Demo Guide

Questa guida prepara una demo breve e verificabile del progetto MyZubster per academy, mentor e tester.

## Link principali

- Repository pubblico: https://github.com/nicolaususnicola-lgtm/myzubster
- Sito pubblico dichiarato dal progetto: https://www.myzubster.com/
- Profilo metaverso nell'app: `/profile` (alias `/profilo` e `/zubster`)
- Marker di deploy: `/release.json`

## Demo consigliata — 3 minuti

1. **Problema** — presentare MyZubster come ecosistema open source che collega identità digitale, esperienze immersive, dati/evidenze e collaborazione.
2. **Profilo** — aprire `/profile` e mostrare il profilo digitale Zubster, il link GitHub e l'artwork.
3. **Metaverso** — tornare alla home e usare `Entra` per mostrare MyZubster World / Neon Plaza.
4. **Codice** — aprire il repository GitHub e mostrare che il progetto è pubblico e tracciabile.
5. **Stato corretto** — descrivere il progetto come **MVP / demo in validazione**, non come piattaforma completamente certificata o adottata.

## Verifiche tecniche prima di una presentazione

- [x] Pagina profilo integrata nel codice React.
- [x] Smoke test dedicato a `ProfilePage` presente nel repository.
- [x] Layout responsive previsto per schermi sotto 900 px.
- [x] Repository pubblico accessibile.
- [x] Marker `/release.json` incluso nel frontend.
- [ ] Verificare che `/release.json` risponda sul dominio di produzione.
- [ ] Verificare che `/profile` sia raggiungibile sul dominio di produzione.
- [ ] Verificare una GitHub Actions run verde sull'ultimo commit.
- [ ] Test manuale su smartphone reale: profilo, link e ingresso nel metaverso.

## Pitch breve

> MyZubster è un ecosistema digitale open source in cui identità, esperienze immersive, collaborazione e dati verificabili possono convivere in un unico ambiente. Questa demo mostra il profilo digitale Zubster integrato nel frontend e collegato al codice pubblico del progetto.

## Regola di presentazione

Mostrare solo ciò che è verificabile. Funzioni in demo, sviluppo, simulazione o attesa di deploy devono essere indicate come tali.
