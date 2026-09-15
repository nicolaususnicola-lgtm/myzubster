# Roadmap N4K48 - MyZubster Metaverse

Stato: proposta operativa  
Responsabile del profilo: N4K48 (`nicolaususnicola-lgtm`)  
Mondo iniziale: Neon Plaza  
Ultimo aggiornamento: 15 settembre 2026

## Obiettivo

Portare N4K48 da un profilo Metaverse persistente a una presenza pubblica verificabile nell'ecosistema MyZubster, collegando progressivamente **Neon Plaza, Zorgax e il pilot Nicola Comics**.

Il principio resta evidence-first: documentazione, test e demo non devono essere confusi con deployment di produzione, diritti verificati o mint on-chain.

## Legenda

- `DONE`: completato e verificato.
- `IN PROGRESS`: implementazione o verifica in corso.
- `NEXT`: prossimo lavoro prioritario.
- `PLANNED`: previsto dopo le attività prioritarie.
- `BLOCKED`: richiede una decisione o una risorsa esterna.

## Stato sintetico

| Area | Stato | Evidenza o prossimo controllo |
| --- | --- | --- |
| Endpoint di autenticazione | DONE | Flusso registrazione/login individuato e verificato localmente |
| JWT Metaverse | DONE | Middleware e chiamata autenticata implementati nel fork |
| Repository personale | DONE | Modifiche pubblicate su `nicolaususnicola-lgtm/myzubster` |
| Profilo persistente N4K48 | DONE | Creazione e recupero idempotente verificati dai test locali |
| Login GitHub nel frontend | NEXT | Collegamento OAuth e ritorno all'applicazione |
| Join autenticato in Neon Plaza | DONE | Identità server-side e rifiuto del downgrade a guest verificati |
| Test automatici Metaverse | DONE | 4 suite e 22 test superati localmente il 3 settembre 2026 |
| Nicola Comics catalog | DONE | Tre comic entry disponibili nel pilot |
| Zorgax read-only adapter | DONE | `gallery`, `detail`, `candidate`, `next_steps` verificati manualmente nel happy path locale |
| Base URL pubblica configurabile | DONE | `NICOLA_COMICS_BASE_URL` propagata via Docker e verificata con URL di test |
| Deployment HTTPS Nicola Comics | NEXT | Serve endpoint pubblico separato dal PC locale |
| Zorgax pubblico → pilot | IN PROGRESS | Coordinamento tramite issue MyZubster #1176 |
| Rights comic 001 | BLOCKED | Stato `TO_VERIFY` finché non esiste verifica dei diritti |
| Mint/on-chain comic 001 | PLANNED | Nessuna dichiarazione di mint senza contract/token/transaction verificabili |
| Presenza condivisa multiutente | PLANNED | Da verificare con almeno due sessioni contemporanee |

## Fase 1 - Identità e accesso

Priorità: P0  
Stato: IN PROGRESS

- [x] Individuare gli endpoint effettivi di registrazione e login.
- [x] Verificare il formato JSON richiesto.
- [x] Estrarre e utilizzare il JWT senza mostrare token completi o segreti.
- [x] Proteggere la verifica JWT con algoritmo esplicito.
- [ ] Collegare il pulsante di accesso GitHub nel frontend.
- [x] Rifiutare token non validi senza degradazione silenziosa a guest.
- [ ] Completare logout e gestione della scadenza nel frontend.

Criterio di completamento: un utente autenticato viene riconosciuto dal backend; una richiesta anonima resta `guest-unverified`; un token non valido riceve `401`.

## Fase 2 - Profilo persistente N4K48

Priorità: P0  
Stato: DONE

- [x] Creare il modello del profilo Metaverse collegato all'utente.
- [x] Salvare `displayName`, `characterName`, `archetype` e `worldId`.
- [x] Creare N4K48 una sola volta e recuperarlo nei login successivi.
- [x] Esporre solo i campi pubblici necessari.
- [x] Usare un fallback neutro per `avatarUrl`.

Criterio di completamento: dopo un nuovo login il backend restituisce lo stesso personaggio N4K48 senza duplicati.

## Fase 3 - Ingresso in Neon Plaza

Priorità: P0  
Stato: DONE

- [x] Collegare il profilo persistente a `/api/metaverse/join`.
- [x] Ignorare identità dichiarate dal client quando esiste una sessione autenticata.
- [x] Restituire `identityMode: account-authenticated` o `account-linked`.
- [x] Mostrare nome pubblico e stato verificato nel mondo.
- [x] Mantenere separati guest e account autenticati.

Criterio di completamento: N4K48 entra in Neon Plaza con identità derivata dal server e non modificabile tramite payload client.

## Fase 4 - Nicola Comics pilot

Priorità: P0  
Stato: DONE per il pilot locale / NEXT per il deployment pubblico

- [x] Pubblicare tre comic entry nel catalogo del pilot.
- [x] Identificare `n4k48-comic-001` come `NFT_CANDIDATE` e `PROPOSED_FOR_REVIEW`.
- [x] Mantenere `rights_status: TO_VERIFY` finché i diritti non sono verificati.
- [x] Mantenere contract address, token ID e transaction hash vuoti finché non esiste un mint verificato.
- [x] Esporre `GET /api/comics`.
- [x] Esporre `GET /api/comics/{comic_id}`.
- [x] Esporre il bridge read-only `POST /api/zorgax/ask`.
- [x] Supportare `gallery`, `detail`, `candidate`, `next_steps`.
- [x] Verificare manualmente il happy path locale con API Docker healthy.
- [ ] Rerun della suite automatica comics nell'ambiente corrente: `pytest` non è installato nel container attuale.

Criterio di completamento locale: catalogo, dettaglio, candidate e next steps restituiscono dati coerenti senza mutazioni o false dichiarazioni di mint.

## Fase 5 - Zorgax pubblico e deployment HTTPS

Priorità: P0  
Stato: IN PROGRESS

- [x] Rendere la base URL configurabile con `NICOLA_COMICS_BASE_URL`.
- [x] Evitare localhost hardcoded come destinazione pubblica.
- [x] Propagare `NICOLA_COMICS_BASE_URL` nel servizio API tramite Docker Compose.
- [x] Verificare la generazione di URL assoluti usando una URL di test.
- [x] Documentare adapter, endpoint, action, parametri, risposte e configurazione in `docs/nicola-comics/ZORGAX.md`.
- [x] Aprire il coordinamento nel repository pubblico MyZubster: issue #1176.
- [ ] Scegliere/attivare hosting pubblico HTTPS per il pilot Nicola Comics.
- [ ] Configurare eventuale autenticazione soltanto nell'ambiente di hosting.
- [ ] Configurare nel servizio pubblico Zorgax la URL reale del pilot.
- [ ] Mappare gli intent pubblici Zorgax alle action `gallery`, `detail`, `candidate`, `next_steps`.
- [ ] Eseguire il test end-to-end pubblico.

Criterio di completamento: Zorgax pubblico raggiunge un endpoint HTTPS del pilot ospitato separatamente dal PC locale e completa il percorso senza segreti nel repository.

## Fase 6 - Test end-to-end Nicola Comics

Priorità: P0 prima della pubblicazione dell'integrazione  
Stato: NEXT

Percorso da verificare:

```text
richiesta comics
  → gallery
  → detail/card
  → image
  → candidate
  → rights status
  → dati on-chain solo se verificati
```

- [ ] Richiesta pubblica a Zorgax.
- [ ] Recupero gallery dal pilot HTTPS.
- [ ] Apertura detail/card del comic.
- [ ] Verifica URL/asset immagine.
- [ ] Identificazione corretta del candidate.
- [ ] Visualizzazione `TO_VERIFY` quando i diritti non sono ancora verificati.
- [ ] Nessun `MINTED` senza transaction hash, contract e token verificabili.

## Fase 7 - Presenza e interazioni Metaverse

Priorità: P1  
Stato: PLANNED

- [ ] Verificare conteggio `online` con presenze attive e scadenza.
- [ ] Sincronizzare movimento e orientamento.
- [ ] Verificare emote, chat e uscita dal mondo.
- [ ] Gestire riconnessioni senza duplicare la presenza.
- [ ] Eseguire un test con almeno due sessioni contemporanee.

## Fase 8 - Sicurezza, privacy e qualità

Priorità: P0 prima del rilascio  
Stato: IN PROGRESS

- [x] Non pubblicare `JWT_SECRET`, token completi o file `.env`.
- [x] Non inserire token/segreti del pilot nel repository.
- [x] Aggiungere test automatici per autenticazione, world e join.
- [x] Eseguire la suite Metaverse mirata: 4 suite e 22 test superati.
- [ ] Rendere nuovamente disponibile `pytest` nell'ambiente comics e rieseguire la suite automatica.
- [ ] Verificare che log e risposte siano sanitizzati.
- [ ] Documentare revoca del collegamento GitHub.
- [ ] Eseguire smoke test nell'ambiente pubblico scelto.

## Sequenza consigliata aggiornata

1. Pubblicare il pilot Nicola Comics su un endpoint HTTPS separato dal PC locale.
2. Configurare la URL reale tramite `NICOLA_COMICS_BASE_URL` nell'hosting.
3. Concordare/configurare auth e mapping nel Zorgax pubblico tramite issue #1176.
4. Eseguire l'end-to-end Zorgax → gallery → detail → candidate → rights/on-chain.
5. Ripristinare `pytest` nell'ambiente comics e rieseguire la suite automatica.
6. Proseguire con GitHub OAuth e test multiutente Neon Plaza.
7. Chiudere controlli di sicurezza/privacy e preparare una demo controllata.

## Verifiche registrate

### Metaverse — 3 settembre 2026

Eseguita localmente sul ramo `main`:

- `backend/src/routes/metaverse-auth.test.js`
- `backend/src/routes/metaverse.test.js`
- `tests/socialIdentityService.test.js`
- `test/metaverseAuthenticatedUi.test.js`

Risultato: **4 suite superate, 22 test superati, 0 test falliti**.

### Nicola Comics — 15 settembre 2026

Verifica manuale locale con Docker:

- API healthy.
- Gallery: PASS.
- Detail comic 001: PASS.
- Candidate: PASS.
- Next steps: PASS.
- `n4k48-comic-001`: `NFT_CANDIDATE`, `PROPOSED_FOR_REVIEW`, rights `TO_VERIFY`.
- Nessun token ID o transaction hash dichiarato.
- Base URL configurabile verificata tramite Docker con una URL di test; `detail_url` diventa assoluta correttamente.

La suite `pytest` comics **non è stata rieseguita nell'ambiente corrente** perché il modulo/comando pytest non è disponibile. Questo limite resta esplicitamente separato dalla verifica manuale happy-path.

## Definition of Done aggiornata

L'integrazione N4K48/MyZubster raggiunge il prossimo livello quando:

- N4K48 mantiene identità persistente e autenticata;
- Neon Plaza distingue chiaramente account e guest;
- Nicola Comics è raggiungibile tramite HTTPS pubblico;
- Zorgax pubblico può leggere gallery, detail, candidate e next steps;
- i diritti sono mostrati come verificati solo quando esiste evidenza;
- lo stato NFT/on-chain è mostrato solo con prove verificabili;
- token, segreti e dati privati non compaiono nei log o nel repository;
- test automatici e smoke test dell'ambiente pubblico risultano superati.

## Decisioni aperte

- Provider/URL HTTPS per il pilot Nicola Comics.
- Autenticazione richiesta tra Zorgax pubblico e pilot.
- Mapping definitivo degli intent Zorgax.
- Data e ambiente del test end-to-end pubblico.
- Provider e configurazione OAuth GitHub.
- Strategia di presenza multiutente e heartbeat in Neon Plaza.
- Processo di verifica dei diritti del comic 001.
- Eventuale processo di mint solo dopo verifica dei diritti e disponibilità di prove on-chain.
