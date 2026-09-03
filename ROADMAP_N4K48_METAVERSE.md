# Roadmap N4K48 - MyZubster Metaverse

Stato: proposta operativa  
Responsabile del profilo: N4K48 (`nicolaususnicola-lgtm`)  
Mondo iniziale: Neon Plaza  
Ultimo aggiornamento: 3 settembre 2026

## Obiettivo

Portare N4K48 da una sessione guest a un profilo Metaverse persistente e verificabile, collegato volontariamente all'account GitHub e riconosciuto dal backend MyZubster.

La fotografia personale non blocca l'MVP: fino alla consegna del file originale viene usato un fallback grafico neutro.

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
| Documento di progetto | DONE | Documento Word pubblicato nel repository |
| Profilo persistente N4K48 | DONE | Creazione e recupero idempotente verificati dai test locali |
| Login GitHub nel frontend | NEXT | Collegamento OAuth e ritorno all'applicazione |
| Join autenticato in Neon Plaza | DONE | Identità server-side e rifiuto del downgrade a guest verificati |
| Test automatici autenticati | DONE | 4 suite e 22 test superati localmente il 3 settembre 2026 |
| Presenza condivisa multiutente | PLANNED | Da verificare con almeno due sessioni contemporanee |
| Fotografia personale | BLOCKED | In attesa del file originale dal telefono; non blocca l'MVP |

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
- [ ] Aggiungere la fotografia solo dopo approvazione esplicita del file originale.

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

## Fase 4 - Presenza e interazioni

Priorità: P1  
Stato: PLANNED

- [ ] Verificare conteggio `online` con presenze attive e scadenza.
- [ ] Sincronizzare movimento e orientamento.
- [ ] Verificare emote, chat e uscita dal mondo.
- [ ] Gestire riconnessioni senza duplicare la presenza.
- [ ] Eseguire un test con almeno due sessioni contemporanee.

Criterio di completamento: entrambe le sessioni vedono uno stato coerente e il conteggio online torna corretto dopo l'uscita.

## Fase 5 - Sicurezza, privacy e qualità

Priorità: P0 prima del rilascio  
Stato: IN PROGRESS

- [x] Non pubblicare `JWT_SECRET`, token completi o file `.env`.
- [x] Mantenere la fotografia personale fuori dal repository finché non è approvata.
- [x] Aggiungere test automatici per autenticazione, world e join.
- [x] Eseguire la suite mirata: 4 suite e 22 test superati.
- [ ] Verificare che log e risposte siano sanitizzati.
- [ ] Documentare revoca del collegamento GitHub.
- [ ] Definire moderazione e rimozione delle immagini pubbliche.
- [ ] Eseguire smoke test nell'ambiente scelto.

Criterio di completamento: test verdi, nessun segreto nei log o nel repository e procedura di rollback documentata.

## Fase 6 - Demo e rilascio controllato

Priorità: P1  
Stato: PLANNED

- [ ] Scegliere ambiente demo o staging.
- [ ] Configurare variabili segrete soltanto nel provider di deployment.
- [ ] Attivare health check e monitoraggio essenziale.
- [ ] Pubblicare una demo riproducibile.
- [ ] Raccogliere feedback senza dichiarare adozione o partnership non dimostrate.

Criterio di completamento: la demo è raggiungibile, monitorata e riproducibile; eventuali limiti sono dichiarati chiaramente.

## Sequenza consigliata

1. Pubblicare e integrare le correzioni locali che rendono pulita la suite autenticata.
2. Collegare il login GitHub nel frontend.
3. Eseguire test con due sessioni e verificare `online`.
4. Chiudere i controlli di sicurezza e privacy.
5. Preparare una demo controllata.
6. Inserire la fotografia originale quando sarà disponibile.

## Ultima verifica automatica

Eseguita localmente il 3 settembre 2026 sul ramo `main`:

- `backend/src/routes/metaverse-auth.test.js`
- `backend/src/routes/metaverse.test.js`
- `tests/socialIdentityService.test.js`
- `test/metaverseAuthenticatedUi.test.js`

Risultato: **4 suite superate, 22 test superati, 0 test falliti**.

La verifica copre snapshot autenticato del mondo, distinzione guest/account, riutilizzo del personaggio collegato, rifiuto dei token non validi e collegamento dell'interfaccia. Il test multiutente reale e lo smoke test in staging restano attività separate prima del rilascio pubblico dell'MVP.

## Definition of Done dell'MVP

L'MVP è completato quando:

- N4K48 accede con un account verificato;
- il backend restituisce il profilo persistente corretto;
- `identityMode` distingue chiaramente account e guest;
- Neon Plaza mostra una presenza condivisa coerente;
- token, segreti e dati privati non compaiono nei log o nel repository;
- i test automatici e lo smoke test principale risultano superati;
- in assenza della fotografia viene mostrato un fallback neutro.

## Decisioni aperte

- Ambiente iniziale: demo locale, staging o produzione.
- Provider e configurazione OAuth GitHub.
- Modello definitivo del personaggio e URL pubblico degli asset.
- Durata della presenza online e strategia di heartbeat.
- Politica di revoca, moderazione e sostituzione dell'immagine personale.

